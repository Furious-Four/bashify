const { db } = require('./db/index');
const app = require('./app.js');

const port = process.env.port || 3000;

init()
  .then(() => {
    app.listen(port, () => console.log('listening on port', port));
  })
  .catch(() => db.close());
