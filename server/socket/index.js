const socket = require('socket.io');

const socketServer = (server) => {
  const io = socket(server, { path: '/socket' });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });
};

module.exports = socketServer;
