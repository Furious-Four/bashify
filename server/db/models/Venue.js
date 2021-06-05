const {
  Model,
  DataTypes: { STRING, TEXT },
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');

class Venue extends Model {
  static authenticate({ email, password }) {
    let id;
    return new Promise((res, rej) => {
      Venue.findOne({
        where: {
          email,
        },
      })
        .then((venue) => {
          if (venue) {
            id = venue.id;
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
      const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      Venue.findByPk(id)
        .then((venue) => {
          if (venue) res(venue);
          throw new Error('bad credentials');
        })
        .catch(() => {
          const error = Error('bad credentials');
          error.status = 401;
          rej(error);
        });
    });
  }
}

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

Venue.addHook('beforeSave', async (venue) => {
  if (venue._changed.has('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

module.exports = Venue;
