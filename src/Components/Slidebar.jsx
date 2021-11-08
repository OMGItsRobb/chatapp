import React, { useState, useRef, useEffect } from 'react';
import { Divider } from 'rsuite';
import CreateRoomBtnModal from './CreateRoomBtnModal';
// import DashboardIndex from './dashboard/DashboardIndex';
import DashboardToggle from './dashboard/DashboardToggle';
import ChatRoomList from './rooms/ChatRoomList';

function Slidebar({ aboveElementHeight }) {
  const topSidebarRef = useRef();
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (topSidebarRef.current) {
      setHeight(topSidebarRef.current.scrollHeight);
    }
  }, [topSidebarRef]);

  return (
    <div className="h-100 pt-2">
      <div ref={topSidebarRef}>
        <DashboardToggle></DashboardToggle>
        <CreateRoomBtnModal></CreateRoomBtnModal>
        <Divider>Join Conversation</Divider>
      </div>
      <ChatRoomList aboveElementHeight={height}></ChatRoomList>
    </div>
  );
}

export default Slidebar;
