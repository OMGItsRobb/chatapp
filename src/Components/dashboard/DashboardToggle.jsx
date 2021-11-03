import React, { useCallback } from 'react';
import { Button, Drawer } from 'rsuite';
import { RiDashboardFill } from 'react-icons/ri';
import { useMediaQuery, useModalState } from '../../misc/CustomHooks';
import DashboardIndex from './DashboardIndex';
import { auth } from '../../misc/firebase';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();
  const isMobile = useMediaQuery('(max-width: 992px)');
  const onSignOut = useCallback(() => {
    auth.signOut();
    close();
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
      bottom
    </>
  );
};

export default DashboardToggle;
