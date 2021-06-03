const {
  Model,
  DataTypes: { STRING, VIRTUAL },
} = require('sequelize');

const db = require('../db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

class User extends Model {
  static authenticate({ email, password }) {
    let id;
    return new Promise((res, rej) => {
      User.findOne({
        where: {
          email,
        },
      })
        .then((user) => {
          if (user) {
            id = user.id;
            return bcrypt.compare(password, user.password);
          }
          throw new Error('bad credentials');
        })
        .then((comparison) => {
          if (comparison) {
            const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
            res(token);
          }
          throw new Error('bad credentials');
        })
        .catch(() => {
          const error = new Error('bad credentials');
          error.status = 401;
          rej(error);
        });
    });
  }

  static byToken(token) {
    return new Promise((res, rej) => {
      jwt
        .verify(token, process.env.ACCESS_TOKEN_SECRET)
        .then(({ id }) => {
          return User.findByPk(id);
        })
        .then((user) => {
          if (user) res(user);
          throw new Error('bad credentials');
        })
        .catch(() => {
          const error = new Error('bad credentials');
          error.status = 401;
          rej(error);
        });
    });
  }

  currentOrder() {
    const {
      models: { orders },
    } = db;
    return new Promise((res, rej) => {
      orders
        .findOne({
          where: { userId: this.id },
          limit: 1,
          order: ['createdAt'],
          attributes: {
            include: ['id'],
          },
        })
        .then(([mostRecentOrder]) => {
          return order.getWithDrinks(mostRecentOrder.id);
        })
        .then((orderWithDrinks) => res(orderWithDrinks))
        .catch(rej);
    });
  }
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
        return `${this.firstName} ${this.lastName}`;
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      validate: {
        isEmail: true,
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

User.addHook('beforeSave', async (user) => {
  if (user._changed.has('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

module.exports = User;
