import React, { useState, useEffect } from 'react';
import ForgotPasswordLayout from '../../components/ForgotPasswordLayout';
import { Button, TextField, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { auth } from '../../firebase_config';
import { confirmPasswordReset } from 'firebase/auth';
import styles from './resetPassword.module.css';
import { useForm, SubmitHandler } from 'react-hook-form';
import { passwordPattern } from '../../passwordPattern';

interface FormData {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  const {
    register,
    handleSubmit,
    formState: { isValid },
    getValues,
  } = useForm<FormData>({ mode: 'all' });

  const [oobCode, setOobCode] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const currentUrl = window.location.href;
    const urlParams: any = new URLSearchParams(new URL(currentUrl).search);
    setOobCode(urlParams.get('oobCode'));
  }, []);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      await confirmPasswordReset(auth, oobCode, data.password);
      navigate('/login');
    } catch (e) {
      console.error(e);
    }
  };

  const passwordPatternValidator = (value: string) => {
    return (
      passwordPattern.test(value) ||
      'Password must contain at least one uppercase letter and at least one symbol (! or _)'
    );
  };

  const passwordMatchValidator = () => {
    const { password, confirmPassword } = getValues();
    return password === confirmPassword || 'Passwords do not match';
  };

  return (
    <ForgotPasswordLayout>
      <p>To change your password, please fill in the fields below</p>
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputLabel htmlFor='pass' style={{ color: '#55555F' }}>
          New Password
        </InputLabel>
        <TextField
          className={styles.input_styles}
          type='password'
          {...register('password', {
            required: 'Password is required',
            validate: {
              pattern: passwordPatternValidator,
            },
          })}
        />
        <InputLabel htmlFor='confirm-pass' style={{ color: '#55555F' }}>
          Confirm New Password
        </InputLabel>
        <TextField
          className={styles.input_styles}
          type='password'
          {...register('confirmPassword', {
            required: 'Please confirm your password',
            validate: {
              pattern: passwordPatternValidator,
              matches: passwordMatchValidator,
            },
          })}
        />
        <Button type='submit' variant='contained' disabled={!isValid}>
          Submit
        </Button>
      </form>
    </ForgotPasswordLayout>
  );
};

export default ResetPassword;
