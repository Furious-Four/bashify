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
      console.log(type, requestUserId);
      const receiveSocket = userSockets[requestUserId];
      if (type === 'NEW_SPLIT') {
        receiveSocket.emit('split', type);
      }
      if (type === 'ACCEPT_SPLIT') {
        receiveSocket.emit('split', type);
      }
    });

    socket.on('friend', async (type, requestUser) => {
      console.log(type, requestUser);
      if (type === 'NEW_FRIEND' || type === 'ACCEPT_FRIEND') {
        let receiveSocket;
        if (type === 'NEW_FRIEND') {
          const requestUserId = (
            await User.findOne({
              where: { username: requestUser },
            })
          ).id;
          receiveSocket = userSockets[requestUserId];
        }
        if (type === 'ACCEPT_FRIEND') {
          receiveSocket = userSockets[requestUser];
        }
        receiveSocket.emit('friend', type);
      }
    });
  });

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
