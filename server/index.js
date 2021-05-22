const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');

const port = process.env.port || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use('/public', express.static(path.join(__dirname, '..', 'public')));

app.listen(port, () => console.log('listening on port', port));
