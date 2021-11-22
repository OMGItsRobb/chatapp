import React, { memo } from 'react';
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useCurrentRoom } from '../../../context/current-room-context';
import { useMediaQuery } from '../../../misc/CustomHooks';
import EditRoomBtnDrawer from './EditRoomBtnDrawer';
import RoomInfoModal from './RoomInfoModal';

const TopChat = () => {
  const name = useCurrentRoom(v => v.name);
  const isAdmin = useCurrentRoom(v => v.isAdmin);
  const isDesktop = useMediaQuery('(max-width: 992px)');

  return (
    <>
      <div className="d-flex flex-wrap link-unstyled text-disappear align-items-center justify-content-between">
        {isDesktop && (
          <Link to="/">
            <BsFillArrowLeftCircleFill
              style={{ fontSize: 35, marginRight: '25px', marginTop: '10px' }}
            />
          </Link>
        )}
        <h3 className="align-self-center">{name.toUpperCase()}</h3>
        <div className="d-flex">
          {isAdmin && (
            <span>
              <EditRoomBtnDrawer />
            </span>
          )}

          <RoomInfoModal />
        </div>
      </div>
    </>
  );
};

export default memo(TopChat);
