import React, { memo } from 'react';
import { Button, Col, Divider, Grid, Modal } from 'rsuite';
import { useCurrentRoom } from '../../../context/current-room-context';
import { useModalState } from '../../../misc/CustomHooks';
import { AiFillInfoCircle } from 'react-icons/ai';

const RoomInfoModal = () => {
  const { isOpen, close, open } = useModalState();
  const description = useCurrentRoom(v => v.description);
  const name = useCurrentRoom(v => v.name);

  return (
    <>
      <Button appearance="primary" className="" onClick={open}>
        <AiFillInfoCircle
          style={{
            fontSize: 25,
            verticalAlign: 'middle',
            marginRight: 5,
            color: '#0b6ccb',
          }}
        />
        <b style={{ verticalAlign: 'middle' }}>Room Info</b>
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>About — {name}</Modal.Title>
        </Modal.Header>
        <Divider />
        <Modal.Body>
          <h5 className="mb-1">Description</h5>
          <p>{description}</p>
          <Divider className="mb-1" />
          <h6>Participants</h6>
          <Grid>
            <Col xs={6}></Col>
            <Col xs={6}></Col>
          </Grid>
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
