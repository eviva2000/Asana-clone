import React from 'react';
import styles from '../pages/forgotPassword/forgotPassword.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  return (
    <div className={styles.forgot_pass}>
      <div className={styles.logo}>
        <span>Asana clone</span>
      </div>
      <div className={styles.flex_container}>
        {' '}
        <div className={styles.form}>
          <div className={styles.icon} onClick={() => navigate('/login')}>
            <ArrowBackIcon style={{ color: '#E3E4E8' }} />
          </div>
          <h1>Forgot password</h1>
          {children}
        </div>
      </div>
    </div>
  );
}

export default ForgotPasswordLayout;
