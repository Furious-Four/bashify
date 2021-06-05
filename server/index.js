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

