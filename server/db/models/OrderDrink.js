const {
  Model,
  DataTypes: { INTEGER, FLOAT },
} = require('sequelize');
const db = require('../db');

class OrderDrink extends Model {}
OrderDrink.init(
  {
    quantity: {
      type: INTEGER,
    },
    price: {
      type: FLOAT,
    },
  },
  { sequelize: db, modelName: 'orderDrinks' }
);

module.exports = OrderDrink;
