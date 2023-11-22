import React, { useState } from 'react';
import styles from './forgotPassword.module.css';
import '../../App.css';
import { Button, TextField, InputLabel } from '@mui/material';
import ForgotPasswordLayout from '../../components/ForgotPasswordLayout';
import { auth } from '../../firebase_config';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await sendPasswordResetEmail(auth, email);
      setSubmitted(true);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <ForgotPasswordLayout>
      {!submitted ? (
        <>
          <p>We will send reset password you link on your mail</p>
          <form onSubmit={submit}>
            <InputLabel htmlFor='email' style={{ color: '#55555F' }}>
              Email
            </InputLabel>
            <TextField
              className={styles.input_styles}
              id='email'
              value={email}
              placeholder='Input text here'
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setEmail(e.target.value);
              }}
              type={'email'}
              required
            />
            <Button
              sx={{
                '&:disabled': {
                  color: '#f1f2f4',
                },
              }}
              className={styles.button_style}
              type='submit'
              variant='contained'
              disabled={!/^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/.test(email)}
            >
              Reset Password
            </Button>
          </form>
        </>
      ) : (
        <>
          <p>We sent the reset link to your email. Please check your email and click on link</p>
          <p>
            Didn’t receive email? <a onClick={submit}>Resend</a>
          </p>
        </>
      )}
    </ForgotPasswordLayout>
  );
}

export default ForgotPassword;
