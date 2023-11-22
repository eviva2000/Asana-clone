import React from 'react';
import styles from '../pages/forgotPassword/forgotPassword.module.css';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import logo from '../assets/icons/mangement.png';
import image from '../assets/images/Stuck at Home Sitting On Floor.svg';
import { useNavigate } from 'react-router-dom';

function ForgotPasswordLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <div className={styles.forgot_pass}>
      <div className={styles.icon}>
        <img src={logo} alt='logo' className={styles.logo_img} /> <span>Lothbrok</span>
      </div>
      <div className={styles.flex_container}>
        <img className={styles.image} src={image} alt='girl sitting' />
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
