const {
  Model,
  DataTypes: { STRING, VIRTUAL, NUMBER },
} = require('sequelize');

const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class User extends Model {
  authenticate = async function ({ email, password }) {
    const user = await User.findOne({
      where: {
        email,
      },
    });
    if (user && (await bcrypt.compare(password, user.password))) {
      const token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET);
      return token;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  };
  byToken = async function (token) {
    try {
      const { id } = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const user = await User.findByPk(id);
      if (user) return user;
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    } catch (ex) {
      const error = Error('bad credentials');
      error.status = 401;
      throw error;
    }
  };
}

//add beforeCreate hook to hash password when a user signs up using bcrypt.hash

User.init(
  {
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
    password: {
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
  },
  { sequelize: db, modelName: 'users' }
);

module.exports = User;
