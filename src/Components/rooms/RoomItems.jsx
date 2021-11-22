import React from 'react';
import TimeAgo from 'timeago-react';
import ProfileAvatar from '../ProfileAvatar';

const RoomItems = ({ room }) => {
  const { createdAtUNIX, name, lastMessage } = room;

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center">
        <h3 className="text-disappear">{name}</h3>
        <TimeAgo
          datetime={
            lastMessage
              ? new Date(lastMessage.msgCreatedAt)
              : new Date(createdAtUNIX)
          }
          className="font-normal text-black-45"
        ></TimeAgo>
      </div>
      <div className="d-flex align-items-center text-black-70">
        {lastMessage ? (
          <>
            <div className="d-flex align-items-center">
              <ProfileAvatar
                src={lastMessage.author.avatar}
                name={lastMessage.author.displayName}
                size="sm"
                avatarColors={lastMessage.avatarColors}
              ></ProfileAvatar>
            </div>
            <div className="text-disappear ml-2">
              <b>
                <div className="italic">{lastMessage.author.displayName}</div>
              </b>
              <span>{lastMessage.text}</span>
            </div>
          </>
        ) : (
          <span>No messages yet...</span>
        )}
      </div>
    </div>
  );
};

export default RoomItems;
