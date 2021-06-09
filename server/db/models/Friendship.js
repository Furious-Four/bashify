const {
  Model,
  DataTypes: { ENUM },
} = require('sequelize');
const db = require('../db');

class Friendship extends Model {}

Friendship.init(
  {
    status: {
      type: ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
      defaultValue: 'PENDING',
    },
  },
  { sequelize: db, modelName: 'friendships' }
);

module.exports = Friendship;
