const { db } = require('./db/index.js');
const { init } = require('./db/seed.js');
const app = require('./app.js');
const socketServer = require('./socket');

const port = process.env.port || 3000;

init()
  .then(() => {
    const server = app.listen(port, () =>
      console.log('listening on port', port)
    );
    socketServer(server);
  })
  .catch(() => db.close());
