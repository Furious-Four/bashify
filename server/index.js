const { db } = require('./db/index');
const { init } = require('./db/seed');
const app = require('./app.js');
const { init } = require('./db/seed');

const port = process.env.port || 3000;

init()
  .then(() => {
    app.listen(port, () => console.log('listening on port', port));
  })
  .catch(() => db.close());
