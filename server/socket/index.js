const socket = require('socket.io');
const {
  models: { User, Venue },
} = require('../db/index.js');

const socketServer = (server) => {
  const io = socket(server, { path: '/socket' });
  const userSockets = {};

  const usersNamespace = io.of('/users');

  usersNamespace.use(async (socket, next) => {
    const {
      venue,
      auth: { token },
    } = socket.handshake;
    const user = await User.byToken(token);
    socket.user = user;
    socket.venue = venue;
    next();
  });

  usersNamespace.on('connection', (socket) => {
    const { user, venue } = socket;
    userSockets[user.id] = socket;
    //console.log('User', user.id, 'connected');

    socket.join(venue);
    usersNamespace.to(venue).emit('message', `User ${user.id} connected`);

    socket.on('disconnect', () => {
      //console.log('User', user.id, 'disconnected');
      usersNamespace.to(venue).emit('message', `User ${user.id} disconnected`);
    });

    socket.on('split', async (type, requestUserId) => {
      const receiveSocket = userSockets[requestUserId];
      if (type === 'NEW_SPLIT') {
        receiveSocket.emit('split', 'NEW_SPLIT');
      }
    });
  });

  // usersNamespace.on('split', (type, requestUserId) => {
  //   if (type === 'NEW_SPLIT') {
  //     console.log('New split for user: ', requestUserId);
  //   }
  // });

  const venuesNamespace = io.of('/venues');

  venuesNamespace.use(async (socket, next) => {
    const {
      handshake: {
        auth: { token },
      },
    } = socket;
    const venue = await Venue.byToken(token);
    socket.venue = venue;
    next();
  });

  venuesNamespace.on('connection', (socket) => {
    const { venue } = socket;
    //console.log('Venue', venue.id, 'connected');

    usersNamespace.to(venue.id).emit('message', `Venue ${venue.id} connected`);

    socket.on('disconnect', () => {
      //console.log('Venue disconnected');
      usersNamespace.to(venue.id).emit('message', `Venue disconnected`);
    });
  });
};

module.exports = socketServer;
