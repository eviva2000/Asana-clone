import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import styles from './signUp.module.css';
import { Button, TextField, InputLabel, Checkbox, Alert, AlertTitle } from '@mui/material';
import logo from '../../assets/icons/mangement.png';
import image from '../../assets/images/Hands Show.svg';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase_config';
import { passwordPattern } from '../../passwordPattern';
import { AuthErrorCodes } from 'firebase/auth';
import api from '../../api';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, formState, handleSubmit } = useForm<FormData>();

  const { isDirty, isValid } = formState;

  const [errorMessage, setErrorMessage] = useState<string>('');
  const [editingPass, setEditingPass] = useState<boolean>(false);

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<FormData> = async (data, e) => {
    e?.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, data.email, data.password);
      const response = await api();
      try {
        if (auth.currentUser) {
          await response.post('/user', {
            uid: auth.currentUser.uid,
            first_name: data.first_name,
            last_name: data.last_name,
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
        <img src={logo} alt='logo' className={styles.logo_img} /> <span>Lothbrok</span>
      </div>
      {errorMessage ? (
        <Alert severity='error' onClose={() => setErrorMessage('')}>
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      ) : null}
      <div className={styles.flex_container}>
        <img className={styles.image} src={image} alt='hand holding globe' />
        <div className={styles.form}>
          <h1>Sign up</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.row}>
              <div>
                <InputLabel
                  htmlFor='first-name'
                  style={{ color: '#55555F', marginBottom: '0.5rem', width: '100%' }}
                >
                  First Name
                </InputLabel>
                <TextField
                  className={styles.input_styles}
                  {...register('first_name', {
                    required: 'First name is required',
                  })}
                  placeholder='First Name'
                />
              </div>
              <div>
                <InputLabel
                  htmlFor='last-name'
                  style={{ color: '#55555F', marginBottom: '0.5rem' }}
                >
                  Last Name
                </InputLabel>
                <TextField
                  {...register('last_name', {
                    required: 'Last name is required',
                  })}
                  className={styles.input_styles}
                  placeholder='Last Name'
                />
              </div>
            </div>
            <InputLabel htmlFor='email' style={{ color: '#55555F' }}>
              Email
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

            <InputLabel htmlFor='password' style={{ color: '#55555F' }}>
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
            <div>
              <Checkbox /> Remeber me
            </div>
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
