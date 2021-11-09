import React from 'react';
import { useParams } from 'react-router';
import { Divider, Loader } from 'rsuite';
import BottomChat from '../../Components/Chat-window/Bottom/BottomChat';
import MessagesChat from '../../Components/Chat-window/Messages/MessagesChat';
import TopChat from '../../Components/Chat-window/Top/TopChat';
import { CurrentRoomProvider } from '../../context/current-room-context';
import { useRooms } from '../../context/rooms.Context';

const Chat = () => {
  const { chatId } = useParams();

  const rooms = useRooms();

  if (!rooms) {
    return (
      <Loader center vertical size="lg" content="Loading..." speed="slow" />
    );
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return (
      <h3 className="text-center mt-page">
        hmm... I didn't find that chatroom
      </h3>
    );
  }

  const { name, description } = currentRoom;

  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <TopChat />
      </div>
      <div className="chat-middle">
        <MessagesChat />
      </div>
      <div className="chat-bottom">
        <BottomChat />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;