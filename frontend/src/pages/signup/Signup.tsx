import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Alert, AlertTitle } from '@mui/material';
import logo from '../../assets/icons/managment.png';
import image from '../../assets/images/Hands Show.svg';
import { useNavigate } from 'react-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase_config';
import { AuthErrorCodes } from 'firebase/auth';
import axios from 'axios';
import styles from './signup.module.css';

interface FormData {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}

const SignUp = () => {
  const { register, formState, handleSubmit } = useForm<FormData>();

  const { isValid } = formState;

  const [errorMessage, setErrorMessage] = useState<string>('');

  const navigate = useNavigate();

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
        <img src={logo} alt='logo' className={styles.logo_img} /> <span>Asana clone</span>
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
            <input {...register('first_name')} placeholder='First Name' />
            <input {...register('email')} placeholder='Email' />
            <input {...register('password')} placeholder='Password' type='password' />
            <button type='submit' disabled={!isValid}>
              Signup
            </button>
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
