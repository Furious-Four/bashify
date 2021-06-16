import React, { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketTest = () => {
  const [loaded, setLoaded] = useState(false);
  const [socketId, setSocketId] = useState(false);
  useEffect(() => {
    if (!loaded) {
      console.log('loaded');
      console.log(socketId);
      setLoaded(true);
    }
    if (loaded && !socketId) {
      const socket = io('/', { path: '/socket' });
      socket.on('connect', () => {
        console.log(socket.id);
        setSocketId(socket.id);
      });
    }
  });
  return (
    <div>
      <h1>Socket Test</h1>
      {socketId ? `Connected with socket: ${socketId}` : 'Not connected'}
    </div>
  );
};

export default SocketTest;
