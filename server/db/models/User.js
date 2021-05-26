const {
  Model,
  DataTypes: { STRING, VIRTUAL, NUMBER },
} = require('sequelize');

const db = require('../db');

class User extends Model {}

User.init({
  firstName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lastName: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  fullName: {
    type: VIRTUAL,
    get() {
      return `${firstName} ${lastName}`;
    },
  },
  email: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  phone: {
    type: STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});
