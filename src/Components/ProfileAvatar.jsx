import React from 'react';
import { Avatar } from 'rsuite';
import { getNameInitials } from '../misc/helpers';

const ProfileAvatar = ({ name, avatarColors, avatar, ...avatarProps }) => {
  const styledAvatar = {
    backgroundImage: `linear-gradient(to right, ${avatarColors}`,
    fontWeight: `bold`,
  };

  return (
    <Avatar
      {...avatarProps}
      style={!avatar ? styledAvatar : { ...avatarProps }}
      circle
    >
      {getNameInitials(name)}
    </Avatar>
  );
};

export default ProfileAvatar;
