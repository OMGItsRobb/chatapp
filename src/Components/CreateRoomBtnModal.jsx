import React, { useState, useRef, useCallback } from 'react';
import { Button, Form, Modal, Notification, Schema, toaster } from 'rsuite';
import { BsFillPlusCircleFill } from 'react-icons/bs';
import { useModalState } from '../misc/CustomHooks';
import { auth, database } from '../misc/firebase';
// import firebase from 'firebase';

const { StringType } = Schema.Types;

const model = Schema.Model({
  name: StringType().isRequired('Chat name is required'),
  description: StringType().isRequired('Description is required'),
});

const INITIAL_FORM = {
  name: '',
  description: '',
};

const CreateRoomBtnModal = () => {
  const { isOpen, open, close } = useModalState();

  const [formValue, setFormValue] = useState(INITIAL_FORM);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef();

  const onFormChange = useCallback(value => {
    setFormValue(value);
  }, []);

  const onSubmit = async () => {
    if (!formRef.current.check()) {
      toaster.push(
        <Notification
          style={{ backgroundColor: '#F9FEBA' }}
          closable
          type="error"
          header="error"
          width={320}
          duration={5000}
        >
          Something isn't right here...
        </Notification>,
        {
          placement: 'topCenter',
        }
      );
      return;
    }

    const newRoomData = {
      ...formValue,
      createdAt: `${new Date()}`,
      createdAtUNIX: +new Date(),
      admins: {
        [auth.currentUser.uid]: true,
      },
    };
    try {
      await database.ref('rooms').push(newRoomData);
      setFormValue(INITIAL_FORM);
      setIsLoading(false);
      close();
      toaster.push(
        <Notification
          style={{ backgroundColor: '#C9FFBD' }}
          closable
          type="success"
          header="Success"
          duration={5000}
        >
          Room created
        </Notification>,
        {
          placement: 'topCenter',
        }
      );
    } catch (error) {
      setIsLoading(false);
      alert(`error: ${error}`);
    }
  };

  return (
    <div className="mt-3">
      <Button block color="green" appearance="primary" onClick={open}>
        <BsFillPlusCircleFill
          style={{ verticalAlign: '-2px', fontSize: 15 }}
        ></BsFillPlusCircleFill>{' '}
        <span>Create New Chatroom</span>
      </Button>
      <Modal open={isOpen} onClose={close}>
        <Modal.Header>
          <Modal.Title>New Chat Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            fluid
            onChange={onFormChange}
            formValue={formValue}
            model={model}
            ref={formRef}
          >
            <Form.Group>
              <Form.ControlLabel>Room name</Form.ControlLabel>
              <Form.Control
                name="name"
                placeholder="Enter a name for your new chatroom..."
              ></Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.ControlLabel>Description</Form.ControlLabel>
              <Form.Control
                rows={5}
                name="description"
                placeholder="Describe this room..."
              ></Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            appearance="primary"
            onClick={onSubmit}
            disabled={isLoading}
          >
            Confirm New Chatroom
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default CreateRoomBtnModal;
