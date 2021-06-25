const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

//routers
app.use('/api/user', require('./api/user'));
app.use('/api/venue', require('./api/venue'));
app.use('/api/drink', require('./api/drink'));
app.use('/api/checkout', require('./api/checkout'));

app.get('/public-key', (req, res) => {
  res.send({ publicKey: process.env.STRIPE_PUBLISHABLE_KEY });
});

app.get('/', async (req, res, next) => {
  try {
    res.sendFile(path.join(__dirname, '../public/index.html'));
  } catch (err) {
    next(err);
  }
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.status || 500).send(err);
  next(err);
});

module.exports = app;
