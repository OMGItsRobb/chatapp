import React from 'react';
import CreateRoomBtnModal from './CreateRoomBtnModal';
// import DashboardIndex from './dashboard/DashboardIndex';
import DashboardToggle from './dashboard/DashboardToggle';

function Slidebar() {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle></DashboardToggle>
        <CreateRoomBtnModal></CreateRoomBtnModal>
      </div>
    </div>
  );
}

export default Slidebar;
