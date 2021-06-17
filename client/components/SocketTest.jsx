import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketTest = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.removeAllListeners('message');
      socket.on('message', (message) => {
        console.log(message);
        setMessages([...messages, message]);
      });
    }
  }, [messages, socket]);

  const connectSocket = () => {
    const socket = io('/', { path: '/socket' });
    socket.on('connect', () => {
      console.log(socket.id);
      setSocket(socket);
    });
  };

  const sendMessage = () => {
    socket.send(`message from ${socket.id}`);
  };
  return (
    <div>
      <h1>Socket Test</h1>
      {socket ? (
        <div>
          <p>{socket.id}</p>
          <button onClick={sendMessage}>Send Message</button>
          {messages.map((message, index) => {
            return <div key={index}>{message}</div>;
          })}
        </div>
      ) : (
        <div>
          <label>Socket: </label>
          <button onClick={connectSocket}>Connect</button>
        </div>
      )}
    </div>
  );
};

export default SocketTest;
