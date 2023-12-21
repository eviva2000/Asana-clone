import React, { useState } from 'react';
import style from './MenuLeftBar.module.css';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import { Box, Button } from '@mui/material';
import { Menu } from '../menuDesktop/MenuDesktop';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const MenuLeftBar = () => {
  const [state, setState] = useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event &&
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : '18rem',
        padding: '1rem',
        height: '100vh',
        backgroundColor: 'var(--purple--80)',
      }}
      role='presentation'
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
      className={style.swipeableDrawer}
    >
      <Menu />
    </Box>
  );

  const anchor: Anchor = 'left'; // Defining the anchor for the Button

  return (
    <div>
      <Button onClick={toggleDrawer(anchor, true)}>
        <img className={style.burger_btn} src='/assets/icons/burger.svg' />
      </Button>
      <SwipeableDrawer
        anchor={anchor}
        open={state[anchor]}
        onClose={toggleDrawer(anchor, false)}
        onOpen={toggleDrawer(anchor, true)}
      >
        {list(anchor)}
      </SwipeableDrawer>
    </div>
  );
};

export default MenuLeftBar;
