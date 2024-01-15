import React, { useEffect, useState } from 'react';
import PageTitle from '../pageTitle/PageTitle';
import { User, getAuth, onAuthStateChanged, signOut } from 'firebase/auth';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';
import api from '../../api';
import { Avatar, useMediaQuery } from '@mui/material';
import MenuLeftBar from '../menuMobile/MenuLeftBar';
import logo from '../../assets/icons/managment.png';
import axios from 'axios';

const handleSignOut = () => signOut(getAuth());
const Header = () => {
  const [userName, setUserName] = useState<string>('');
  const [uid, setUid] = useState<string>('');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const fetchAndSetUserId = () => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user: User | null) => {
      if (user) {
        setUid(user.uid);
      }
    });
  };

  const fetchAndSetUserName = async () => {
    try {
      if (uid) {
        const res = await axios.get(`http://localhost:5000/api/user/${uid}`);
        const name = await res.data;
        setUserName(`${name.user[0].first_name ? name.user[0].first_name : ''}`);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchAndSetUserId();
  }, []);

  useEffect(() => {
    fetchAndSetUserName();
  }, [uid]);

  const getUserInitials = () => {
    return userName
      .split(' ')
      .map((word) => (word ? word[0].toUpperCase() : null))
      .join('');
  };

  return (
    <div className={styles.header}>
      {!isDesktop ? (
        <div className='burger-icon-btn'>
          <MenuLeftBar />
        </div>
      ) : null}
      <PageTitle />

      <div className={styles.header_right}>
        {userName && isDesktop ? (
          <>
            <Avatar>{getUserInitials()}</Avatar>
            <div className='username'>{userName}</div>
          </>
        ) : null}

        <Link className={styles.signOut} to='/login' onClick={handleSignOut}>
          Log out
        </Link>
      </div>
    </div>
  );
};

export default Header;
