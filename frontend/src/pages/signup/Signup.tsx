import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, TextField, InputLabel, Alert, AlertTitle } from '@mui/material';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase_config';
import { AuthErrorCodes } from 'firebase/auth';
import axios from 'axios';
import styles from './signUp.module.css';

interface FormData {
  first_name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, formState, handleSubmit } = useForm<FormData>();
  const { isDirty, isValid } = formState;

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editingPass, setEditingPass] = useState<boolean>(false);

  const navigate = useNavigate();
  const passwordPattern = /^(?=.*[A-Z])(?=.*[!_])[\w!_]+$/;

  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    e?.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      try {
        if (auth.currentUser) {
          await axios.post('http://localhost:5000/api/user', {
            uid: auth.currentUser.uid,
            first_name: data.first_name,
            email: data.email,
          });
          navigate('/project');
        } else {
          throw 'User registration failed, server error';
        }
      } catch (error) {
        setErrorMessage('Server error');
      }
      setErrorMessage('');
    } catch (e: any) {
      if (e.code === AuthErrorCodes.EMAIL_EXISTS) {
        setErrorMessage(`Email address '${data.email}' is already in use `);
      } else if (e.message) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage('Something went wrong. Please try again');
      }
    }
  };

  return (
    <div className={styles.sign_up}>
      <div className={styles.icon}>
        <span>Asana clone</span>
      </div>
      {errorMessage ? (
        <Alert severity='error' onClose={() => setErrorMessage('')}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      ) : null}
      <div className={styles.flex_container}>
        <div className={styles.form}>
          <p className={styles.paragraph}>Make project management a breeze with us!</p>
          <h1>Create an account</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel htmlFor='first-name' style={{ color: '#55555F', fontSize: '12px' }}>
              First name
            </InputLabel>
            <TextField
              className={styles.input_styles}
              {...register('first_name', {
                required: 'First name is required',
              })}
              placeholder='First Name'
            />
            <InputLabel htmlFor='email' style={{ color: '#55555F', fontSize: '12px' }}>
              Your email
            </InputLabel>
            <TextField
              type='email'
              {...register('email', {
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email format',
                },
              })}
              className={styles.input_styles}
              placeholder='Email'
            />
            <InputLabel htmlFor='password' style={{ color: '#55555F', fontSize: '12px' }}>
              Password
            </InputLabel>
            <TextField
              type='password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Password must be at least 6 characters',
                },
                pattern: {
                  value: passwordPattern,
                  message:
                    'Password must contain at least one uppercase letter and at least one symbol (! or _)',
                },
              })}
              onFocus={() => setEditingPass(true)}
              onBlur={() => setEditingPass(false)}
              helperText={
                editingPass
                  ? 'Password must be at least 6 characters, contain an uppercase letter and a symbol'
                  : ''
              }
              placeholder='Password'
              className={styles.input_styles}
            />

            <Button
              className={styles.button_style}
              type='submit'
              variant='contained'
              disabled={!isDirty || !isValid}
              sx={{
                '&:disabled': {
                  color: '#f1f2f4',
                },
              }}
            >
              Sign Up
            </Button>
          </form>
          <div className={styles.small}>
            Already have an account? <a onClick={() => navigate('/login')}>Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
