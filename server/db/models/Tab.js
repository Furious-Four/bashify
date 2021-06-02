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
              acc += quantity * price;
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

//LOGIC: If it is your order, it will go on your tab. I think assigning drinks to others will happen at the order level.
// If you create an order, and choose to pay right away (aka not keep a running tab), your order still goes to a tab, the tab is closed and reset to 0 upon payment.
