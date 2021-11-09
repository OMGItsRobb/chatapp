import React, { memo } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { ButtonToolbar } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room-context';
import { useMediaQuery } from '../../../misc/CustomHooks';
import RoomInfoModal from './RoomInfoModal';

const TopChat = () => {
  const name = useCurrentRoom(v => v.name);
  const isDesktop = useMediaQuery('(max-width: 992px');

  return (
    <>
      <div className="d-flex link-unstyled text-disappear align-items-center">
        {isDesktop && (
          <Link to="/">
            <BsFillArrowLeftCircleFill
              style={{ fontSize: 35, marginRight: '25px', marginTop: '10px' }}
            />
          </Link>
        )}
        <h3>{name.toUpperCase()}</h3>
      </div>
      <ButtonToolbar className="ws-nowrap"></ButtonToolbar>
      <div className="d-flex justify-content-between align-items-center">
        <span>Todo</span>
        <RoomInfoModal />
      </div>
    </>
  );
};

export default memo(TopChat);
