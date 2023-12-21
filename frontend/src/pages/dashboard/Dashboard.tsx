import styles from './Dashboard.module.css';
import { Outlet } from 'react-router-dom';
import { Header, MenuDesktop } from '../../IndexForImport';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { User, getAuth, onAuthStateChanged } from '@firebase/auth';
import api from '../../api';
import { CircularProgress } from '@mui/material';

const Dashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const checkToken = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        try {
          setLoading(false);
        } catch (e) {
          console.error(e);
        }
      } else {
        navigate('/login');
      }
    });
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <>
      {loading ? (
        <CircularProgress />
      ) : (
        <div className={styles.pages}>
          <div className={styles.menu_desktop}>
            <MenuDesktop />
          </div>
          <div className={styles.main}>
            <Header />
            <Outlet />
          </div>
        </div>
      )}
    </>
  );
};

export default Dashboard;
