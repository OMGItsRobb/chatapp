import React from 'react';
import TimeAgo from 'timeago-react';
import PresenceDot from '../../PresenceDot';
import ProfileAvatar from '../../ProfileAvatar';
import ProfileInfoBtnModal from './ProfileInfoBtnModal';

const MessageItem = ({ message }) => {
  const { author, msgCreatedAt, text } = message;
  return (
    <li className="padded mb-1" autoFocus>
      <div className="d-flex align-items-center font-bolder">
        <PresenceDot uid={author.uid} />
        <ProfileAvatar
          name={author.displayName}
          avatarColors={author.avatarColors}
          avatar={author.avatar}
          className="ml-1 mb-1"
          size="md"
        />
        <ProfileInfoBtnModal
          profile={author}
          appearance="link"
          className="ml-1 p-0 text-black"
        />
        <TimeAgo
          datetime={msgCreatedAt}
          className="font-normal text-black-45 ml-2"
        />
      </div>
      <div>
        <span className="word-break-all ml-3">{text}</span>
      </div>
    </li>
  );
};

export default MessageItem;
