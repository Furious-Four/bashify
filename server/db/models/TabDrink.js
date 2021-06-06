const {
  Model,
  DataTypes: { INTEGER, FLOAT, BOOLEAN },
} = require('sequelize');
const db = require('../db');

class TabDrink extends Model {}
TabDrink.init(
  {
    quantity: {
      type: INTEGER,
    },
    price: {
      type: FLOAT,
    },
    pending: {
      type: BOOLEAN,
      defaultValue: false,
    },
    accepted: {
      type: BOOLEAN,
      defaultValue: false,
    },
  },
  { sequelize: db, modelName: 'tabDrinks' }
);

module.exports = TabDrink;
