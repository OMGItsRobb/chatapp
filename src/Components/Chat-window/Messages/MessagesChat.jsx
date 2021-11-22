import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router';
import { Divider } from 'rsuite';
import { database } from '../../../misc/firebase';
import { transformToArrWithId } from '../../../misc/helpers';
import MessageItem from './MessageItem';

const MessagesChat = () => {
  const { chatId } = useParams();
  const [messages, setMessages] = useState(null);
  const bottomScroll = React.useRef();

  const isChatEmpty = messages && messages.length === 0;
  const canShowMessages = messages && messages.length > 0;

  const scrollToBottom = e => {
    bottomScroll.current?.scrollIntoView(e);
  };

  useEffect(() => {
    const messagesRef = database.ref('/messages');

    messagesRef
      .orderByChild('roomId')
      .equalTo(chatId)
      .on('value', snap => {
        const data = transformToArrWithId(snap.val());

        setMessages(data);
        scrollToBottom();
      });

    return () => {
      messagesRef.off('value');
    };
  }, [chatId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ul className="msg-list custom-scroll">
      <Divider />
      {isChatEmpty && <li>No messages yet</li>}
      {canShowMessages &&
        messages.map(msg => <MessageItem key={msg.id} message={msg} />)}
      <div ref={bottomScroll} />
    </ul>
  );
};

export default MessagesChat;
