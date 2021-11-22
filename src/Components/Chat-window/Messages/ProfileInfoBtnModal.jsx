import React from 'react';
import Button from 'rsuite/Button';
import Modal from 'rsuite/Modal';
import TimeAgo from 'timeago-react';
import { useModalState } from '../../../misc/CustomHooks';
import ProfileAvatar from '../../ProfileAvatar';

const ProfileInfoBtnModal = ({ profile, ...btnProps }) => {
  const { isOpen, open, close } = useModalState();
  const shortName = profile.displayName;
  return (
    <>
      <Button {...btnProps} onClick={open}>
        <b>{shortName}</b>
      </Button>

      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <ProfileAvatar
            src={profile.avatar}
            name={profile.displayName}
            avatarColors={profile.avatarColors}
            className="width-200 height-200 img-fullsize font-huge"
          ></ProfileAvatar>
          <h4 className="mt-2">{profile.displayName}</h4>
          <h6>
            Account created: <TimeAgo datetime={profile.createdAt}></TimeAgo>
          </h6>
        </Modal.Body>
        <Modal.Footer>
          <Button block onClick={close} appearance="primary" color="red">
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ProfileInfoBtnModal;
