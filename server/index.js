const { db } = require('./db');
const app = require('./app.js');

db.sync().then(() => {
  app.listen(port, () => console.log('listening on port', port));
});
