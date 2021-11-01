import React from 'react';
import { Button, Drawer } from 'rsuite';
import { GoDashboard } from 'react-icons/go';
import { useModalState } from '../../misc/CustomHooks';
import DashboardIndex from './DashboardIndex';

const DashboardToggle = () => {
  const { isOpen, close, open } = useModalState();

  return (
    <>
      <Button block color="blue" appearance="primary" onClick={open}>
        <GoDashboard /> Dashboard
      </Button>
      <Drawer open={isOpen} onClose={close} placement="left">
        <DashboardIndex></DashboardIndex>
      </Drawer>
    </>
  );
};

export default DashboardToggle;
