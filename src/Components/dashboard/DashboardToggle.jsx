import React, { useCallback } from 'react';
import { Button, Drawer } from 'rsuite';
import { RiDashboardFill } from 'react-icons/ri';
import { useMediaQuery, useModalState } from '../../misc/CustomHooks';
import DashboardIndex from './DashboardIndex';
import { auth, database } from '../../misc/firebase';
import { isOfflineForDatabase } from '../../context/profile.context';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const onSignOut = useCallback(() => {
    database
      .ref(`/status/${auth.currentUser.uid}`)
      .set(isOfflineForDatabase)
      .then(() => {
        auth.signOut();
        alert('Signed out');
        close();
      })
      .catch(err => {
        alert(err.message);
      });
  }, [close]);

  return (
    <>
      <Button block color="blue" appearance="primary" onClick={open}>
        <RiDashboardFill style={{ fontSize: 20, verticalAlign: 'bottom' }} />
        {'  '}
        Dashboard
      </Button>
      <Drawer full={isMobile} open={isOpen} onClose={close} placement="left">
        <DashboardIndex onSignOut={onSignOut}></DashboardIndex>
      </Drawer>
    </>
  );
};

export default DashboardToggle;
