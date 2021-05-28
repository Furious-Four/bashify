const {
  Model,
  DataTypes: { STRING, VIRTUAL, NUMBER, TEXT },
} = require('sequelize');

const db = require('../db');
const { sequelize } = require('./Order');

class Venue extends Model {}

Venue.init(
  {
    name: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    type: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      },
    },
    address: {
      type: TEXT,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    state: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [0, 2],
      },
    },
    website: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        contains: 'www',
      },
    },
    rating: {
      type: STRING,
    },
  },
  { sequelize: db, modelName: 'venues' }
);

module.exports = Venue;
