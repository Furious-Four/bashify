const { db } = require('./db');
const app = require('./app.js');

const port = process.env.port || 3000;

db.sync().then(() => {
  app.listen(port, () => console.log('listening on port', port));
});

