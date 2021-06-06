const { stateTaxTable } = require('./stateTax');
const db = require('../db');
const {
  Model,
  DataTypes: { ENUM, FLOAT },
} = require('sequelize');

class Tab extends Model {
  getTax() {
    const venue = Venue.findOne({ where: { id: this.venueId } });
    const stateVal = venue.state;
    return (this.tax = stateTaxTable[stateVal]);
  }

  getSubTotal() {
    const {
      models: { tabDrinks },
    } = db;
    return new Promise((res, rej) => {
      tabDrinks
        .findAll({ where: { tabId: this.id } })
        .then((drinks) => {
          res(
            drinks.reduce((acc, { quantity, price }) => {
              return (this.subTotal = acc += quantity * price);
            }, 0)
          );
        })
        .catch(rej);
    });
  }

  getTotal() {
    const subTotal = this.subTotal;
    const tabTotal = subTotal * this.tax + subTotal * this.tip + this.subTotal;
    return (this.total = tabTotal);
  }

  static getWithDrinks(tabId) {
    const {
      models: { drink, orderDrinks },
    } = db;
    return new Promise((res, rej) => {
      this.findByPk(tabId, {
        include: {
          model: orderDrinks,
          include: { model: drink },
          separate: true,
          order: [[drink, 'name', 'ASC']],
        },
      })
        .then((tab) => res(tab))
        .catch(rej);
    });
  }
}

Tab.init(
  {
    status: {
      type: ENUM('open', 'closed'),
      defaultValue: 'open',
    },
    tip: { type: FLOAT(2), defaultValue: 0.2 },
    tax: { type: FLOAT(2), defaultValue: 0.09 },
    subTotal: {
      type: FLOAT(2),
      defaultValue: 0.0,
    },
    total: {
      type: FLOAT(2),
      defaultValue: 0.0,
    },
  },
  { sequelize: db, modelName: 'tabs' }
);

module.exports = Tab;
