import React from 'react';
// import DashboardIndex from './dashboard/DashboardIndex';
import DashboardToggle from './dashboard/DashboardToggle';

function Slidebar() {
  return (
    <div className="h-100 pt-2">
      <div>
        <DashboardToggle></DashboardToggle>
      </div>
    </div>
  );
}

export default Slidebar;
