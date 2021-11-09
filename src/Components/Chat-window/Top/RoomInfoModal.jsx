import React, { memo } from 'react';
import { Button, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room-context';
import { useModalState } from '../../../misc/CustomHooks';

const RoomInfoModal = () => {
  const { isOpen, close, open } = useModalState();
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);

  return (
    <>
      <Button appearance="link" className="px-0" onClick={open}>
        Room Information
      </Button>
      <Modal open={isOpen} close={close}>
        <Modal.Header>
          <Modal.Title>About — {name}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h5 className="mb-1">Description</h5>
          <p>{description}</p>
          <p>Participants</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={close} block>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default memo(RoomInfoModal);
