const {
  Model,
  DataTypes: { ENUM },
} = require('sequelize');
const db = require('../db');

class Order extends Model {
  getSubtotal() {
    const {
      models: { orderDrinks },
    } = db;
    return new Promise((res, rej) => {
      orderDrinks
        .findAll({ where: { orderId: this.id } })
        .then((drinks) => {
          res(
            drinks.reduce((acc, { quantity, price }) => {
              acc += quantity * price;
            }, 0)
          );
        })
        .catch(rej);
    });
  }
}

Order.init(
  {
    status: {
      type: ENUM('ORDERING', 'SUBMITTED', 'ACCEPTED', 'READY', 'COMPLETED'),
      defaultValue: 'ORDERING',
    },
  },
  { sequelize: db, modelName: 'orders' }
);

module.exports = Order;
