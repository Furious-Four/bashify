const {
  Model,
  DataTypes: { ENUM },
} = require('sequelize');
const db = require('../db');

class Friend extends Model {}

Friend.init(
  {
    status: {
      type: ENUM('PENDING', 'ACCEPTED', 'REJECTED'),
    },
  },
  { sequelize: db, modelName: 'friends' }
);
