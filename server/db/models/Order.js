const {
  Model,
  DataTypes: { ENUM, UUID, UUIDV4, VIRTUAL },
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
    id: {
      type: UUID,
      primaryKey: true,
      defaultValue: UUIDV4,
    },
    confirmationId: {
      type: VIRTUAL,
      get() {
        return this.id.slice(-6).toUpperCase();
      },
    },
    status: {
      type: ENUM('ORDERING', 'SUBMITTED', 'ACCEPTED', 'READY', 'COMPLETED'),
      defaultValue: 'ORDERING',
      allowNull: false,
    },
  },
  { sequelize: db, modelName: 'orders' }
);

module.exports = Order;
