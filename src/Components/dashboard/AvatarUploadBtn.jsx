import React, { useState, useRef } from 'react';
import Modal from 'rsuite/Modal';
import Button from 'rsuite/Button';
import AvatarEditor from 'react-avatar-editor';
import { useModalState } from '../../misc/CustomHooks';
import { storage } from '../../misc/firebase';
import { useProfile } from '../../context/profile.context';
import { database } from '../../misc/firebase';
import ProfileAvatar from '../ProfileAvatar';
import { getUserUpdates } from '../../misc/helpers';
import { toaster, Notification } from 'rsuite';

const fileInputTypes = '.png, .jpeg, .jpg';

const acceptedFileTypes = ['image/png', 'image/jpeg', 'image/pjpeg'];
const isValidFile = file => acceptedFileTypes.includes(file.type);

const getBlob = canvas => {
  return new Promise((res, rej) => {
    canvas.toBlob(blob => {
      if (blob) {
        res(blob);
      } else {
        rej(new Error('File Processing Error'));
      }
    });
  });
};

const AvatarUploadBtn = ({ avatarColors }) => {
  const { isOpen, open, close } = useModalState();
  const { profile } = useProfile();
  const [isLoading, setIsLoading] = useState(false);
  const [img, setImg] = useState(null);
  const avatarEditorRef = useRef();

  const onFileInputChange = ev => {
    const currFiles = ev.target.files;

    if (currFiles.length === 1) {
      const file = currFiles[0];

      if (isValidFile(file)) {
        setImg(file);

        open();
      } else {
        alert(`Wrong file type ${file.type}`, 4000);
      }
    }
  };

  const onUploadClick = async () => {
    const canvas = avatarEditorRef.current.getImageScaledToCanvas();
    setIsLoading(true);

    try {
      const blob = await getBlob(canvas);

      const avatarFileRef = storage
        .ref(`/profiles/${profile.uid}`)
        .child('avatar');

      const uploadAvatarResult = await avatarFileRef.put(blob, {
        cacheControl: `public, max-age=${3600 * 24 * 3}`,
      });

      const downloadUrl = await uploadAvatarResult.ref.getDownloadURL();

      const updates = await getUserUpdates(
        profile.uid,
        'avatar',
        downloadUrl,
        database
      );
      await database.ref().update(updates);

      setIsLoading(false);

      toaster.push(
        <Notification
          closable
          type="success"
          header="Success!"
          width={320}
          duration={5000}
        >
          Avatar has been uploaded
        </Notification>,
        {
          placement: 'topCenter',
        }
      );
      close();
    } catch (error) {
      toaster.push(
        <Notification
          closable
          type="error"
          header="Error..."
          width={320}
          duration={5000}
        >
          {error}
        </Notification>,
        {
          placement: 'topCenter',
        }
      );
      setIsLoading(false);
    }
  };

  return (
    <div className="mt-3 text-center">
      <ProfileAvatar
        src={profile.avatar}
        name={profile.displayName}
        avatarColors={profile.avatarColors}
        avatar={profile.avatar}
        className="width-200 height-200 img-fullsize font-huge"
      />
      <div>
        <div>
          <label
            htmlFor="avatar-upload"
            className="d-block cursor-pointer padded"
          >
            Select new avatar
            <input
              disabled={true}
              id="avatar-upload"
              type="file"
              className="d-none"
              accept={fileInputTypes}
              onChange={onFileInputChange}
            />
          </label>
        </div>

        <Modal open={isOpen} onClose={close}>
          <Modal.Header>
            <Modal.Title>Adjust and upload new avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center align-items-center h-100">
              {img && (
                <AvatarEditor
                  ref={avatarEditorRef}
                  image={img}
                  width={200}
                  height={200}
                  border={10}
                  borderRadius={100}
                  rotate={0}
                />
              )}
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              block
              appearance="ghost"
              onClick={onUploadClick}
              disabled={isLoading}
            >
              Upload new avatar
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
};

export default AvatarUploadBtn;
