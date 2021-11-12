import React, { useState, useCallback } from 'react';
import { Input, InputGroup } from 'rsuite';
import InputGroupButton from 'rsuite/esm/InputGroup/InputGroupButton';
import { RiSendPlaneFill, RiAttachment2 } from 'react-icons/ri';
import { FaMicrophone } from 'react-icons/fa';
import firebase from 'firebase/app';
import { database } from '../../../misc/firebase';
import { useProfile } from '../../../context/profile.context';
import { useParams } from 'react-router';

function assembleMessage(profile, chatId) {
  return {
    roomId: chatId,
    author: {
      displayName: profile.displayName,
      uid: profile.uid,
      createdAt: profile.createdAtUNIX,
      avatarColors: profile.avatarColors,
      ...(profile.avatar ? { avatar: profile.avatar } : {}),
    },
    msgCreatedAt: firebase.database.ServerValue.TIMESTAMP,
  };
}

const BottomChat = () => {
  const [input, setInput] = useState('');
  const [Loading, setLoading] = useState(false);

  const { chatId } = useParams();
  const { profile } = useProfile();

  const onInputChange = useCallback(value => {
    setInput(value);
  }, []);

  const onSendClick = async () => {
    if (input.trim() === '') {
      return;
    }
    const msgData = assembleMessage(profile, chatId);
    msgData.text = input;

    const updates = {};

    const messageId = database.ref('messages').push().key;

    updates[`/messages/${messageId}`] = msgData;
    updates[`/rooms/${chatId}/lastMessage`] = {
      ...msgData,
      msgId: messageId,
      avatarColors: profile.avatarColors,
    };
    try {
      setLoading(true);
      await database.ref().update(updates);
      setInput('');
      setLoading(false);
    } catch (error) {
      setInput('');
      setLoading(false);
      console.log(error);
      alert(error.message);
    }
  };

  const onEnterDown = ev => {
    if (ev.keyCode === 13) {
      ev.preventDefault();
      onSendClick();
    }
  };

  return (
    <div>
      <InputGroup>
        <InputGroupButton>
          <RiAttachment2 style={{ fontSize: 25 }}></RiAttachment2>
        </InputGroupButton>
        <Input
          value={input}
          onChange={onInputChange}
          onKeyDown={onEnterDown}
          placeholder="Write a new message..."
          disabled={Loading}
        ></Input>
        <InputGroupButton>
          <FaMicrophone style={{ fontSize: 20 }}></FaMicrophone>
        </InputGroupButton>
        <InputGroupButton style={{ backgroundColor: '#2196f3' }}>
          <RiSendPlaneFill
            onClick={onSendClick}
            style={{ color: 'white', fontSize: 20 }}
          ></RiSendPlaneFill>
        </InputGroupButton>
      </InputGroup>
    </div>
  );
};

export default BottomChat;
