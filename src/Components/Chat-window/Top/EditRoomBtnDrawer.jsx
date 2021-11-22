import React, { memo } from 'react';
import { useParams } from 'react-router';
import { Button, Divider, Drawer } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room-context';
import { useMediaQuery, useModalState } from '../../../misc/CustomHooks';
import { database } from '../../../misc/firebase';
import EditInput from '../../dashboard/EditInput';
import { MdAdminPanelSettings } from 'react-icons/md';

const EditRoomBtnDrawer = () => {
  const { isOpen, open, close } = useModalState();
  const { chatId } = useParams();
  const isMobile = useMediaQuery('(max-width: 992px)');

  const name = useCurrentRoom(v => v.name);
  const description = useCurrentRoom(v => v.description);

  const updateData = (key, value) => {
    database
      .ref(`rooms/${chatId}`)
      .child(key)
      .set(value)
      .then(() => {
        alert('Successfully updated');
      })
      .catch(err => {
        alert(err.message);
      });
  };

  const onNameSave = newName => {
    updateData('name', newName);
  };
  const onDescriptionSave = newDescription => {
    updateData('description', newDescription);
  };

  return (
    <div>
      <Button
        appearance="primary"
        size="md"
        color="green"
        onClick={open}
        className="mr-2"
      >
        <MdAdminPanelSettings
          style={{ fontSize: 25, verticalAlign: 'middle', color: 'green' }}
        />
        <b style={{ verticalAlign: 'middle' }}>Admin — Edit Room</b>
      </Button>

      <Drawer full={isMobile} open={isOpen} onClose={close} placement="right">
        <Drawer.Header>
          <Drawer.Title>Edit Room</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body style={{ padding: isMobile && '10px', margin: '10px' }}>
          <EditInput
            titleName="Edit Room Name"
            initialValue={name}
            onSave={onNameSave}
            label={<h6 className="mb-2">Name</h6>}
          />
          <Divider />
          <EditInput
            titleName="Edit Description"
            as="textarea"
            rows={3}
            initialValue={description}
            onSave={onDescriptionSave}
            emptyMessage="Description cannot be empty"
            label={<h6 className="mb-2">Description</h6>}
          />
          <Divider />
          <Button block appearance="primary" color="red" onClick={close}>
            Close
          </Button>
        </Drawer.Body>
      </Drawer>
    </div>
  );
};

export default memo(EditRoomBtnDrawer);
