const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const { init } = require('./db/seed');

const port = process.env.port || 3000;

init();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

//routers
app.use('/api/user', require('./api/user'));
app.use('/api/venue', require('./api/venue'));

app.listen(port, () => console.log('listening on port', port));
