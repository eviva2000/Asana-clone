import React, { useEffect, useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Checkbox, Typography, Alert, AlertTitle } from '@mui/material';
import styles from './Login.module.css';

import {
  getAuth,
  signInWithEmailAndPassword,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  browserSessionPersistence,
} from 'firebase/auth';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

type FormData = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginPage: React.FC = () => {
  const [rememberMe] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const logo = '/assets/icons/managment.png';
  const image = '/assets/images/login-intro.jpg';
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = useForm<FormData>();
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        navigate('/project');
      }
    });
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const auth = getAuth();
      await setPersistence(auth, rememberMe ? browserLocalPersistence : browserSessionPersistence);
      await signInWithEmailAndPassword(auth, data.email, data.password);
      setErrorMessage('');
    } catch (e: any) {
      if (e.code === 'auth/invalid-login-credentials') {
        setErrorMessage('Invalid email or password');
      } else if (e.message) {
        setErrorMessage(e.message);
      } else {
        setErrorMessage('Something went wrong. Please try again');
      }
    }
  };

  return (
    <div className={styles.main}>
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
        <img className={styles.image} src={image} alt='Image' />
        <div className={styles.login_content}>
          <h1>Log in</h1>

          <Typography
            style={{
              fontFamily: 'Poppins',
              textAlign: 'left',
              color: '#89899C',
            }}
          >
            Easy steps to enter the platform
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
              name='email'
              control={control}
              defaultValue=''
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field }) => (
                <>
                  <label className={styles.style_label}>Email</label>
                  <TextField
                    fullWidth
                    {...field}
                    placeholder='Input text here'
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                    className={styles.input_styles}
                  />
                </>
              )}
            />

            <Controller
              name='password'
              control={control}
              defaultValue=''
              rules={{ required: 'Password is required' }}
              render={({ field }) => (
                <>
                  <label className={styles.style2_label}>Password</label>
                  <TextField
                    fullWidth
                    type='password'
                    {...field}
                    placeholder='Input text here'
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                    className={styles.input_styles}
                  />
                </>
              )}
            />
            <div className={styles.rememberMe}>
              <div>
                <Checkbox /> Remeber me
              </div>

              <Link to={'/forgot-password'} className={styles.forgot}>
                Forgot password
              </Link>
            </div>
            <Button
              className={styles.button_style}
              variant='contained'
              type='submit'
              fullWidth
              disabled={!isDirty || !isValid}
              sx={{
                '&:disabled': {
                  color: '#f1f2f4',
                },
              }}
            >
              Log In
            </Button>
          </form>

          <div className={styles.small}>
            Don&apos;t have an account?
            <a onClick={() => navigate('/sign-up')}>Sign Up</a>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
