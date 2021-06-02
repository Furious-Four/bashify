const {
  Model,
  DataTypes: { STRING, VIRTUAL, NUMBER, TEXT },
} = require('sequelize');

const db = require('../db');
const { sequelize } = require('./Order');

class Venue extends Model {
  authenticate = async function ({ email, password }) {
    const venue = await Venue.findOne({
      where: {
        email,
      },
    });
    if (venue && (await bcrypt.compare(password, venue.password))) {
      const token = jwt.sign({ id: venue.id }, process.env.ACCESS_TOKEN_SECRET);
      return token;
    }
    const error = Error('bad credentials');
    error.status = 401;
    throw error;
  };
  byToken = async function (token) {
    try {
      const { id } = await jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      const venue = await Venue.findByPk(id);
      if (venue) return venue;
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
