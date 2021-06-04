const {
  Model,
  DataTypes: { INTEGER, FLOAT },
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
  },
  { sequelize: db, modelName: 'tabDrinks' }
);

module.exports = TabDrink;
