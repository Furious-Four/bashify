import { io } from 'socket.io-client';

export const connectUserSocket = (token, venue) => {
  const socket = io('/users', { path: '/socket', auth: { token }, venue });
  socket.on('connect', () => {
    console.log(socket.id);
  });
  socket.on('message', (message) => {
    console.log(message);
  });
  return socket;
};

export const connectVenueSocket = (token) => {
  const socket = io('/venues', { path: 'socket', auth: { token } });
  socket.on('connect', () => {
    console.log(socket.id);
  });
  socket.on('message', (message) => {
    console.log(message);
  });
  return socket;
};
