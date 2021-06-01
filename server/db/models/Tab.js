const { stateTaxTable } = require('./stateTax');
const db = require('../db');
const {
  Model,
  DataTypes: { ENUM, FLOAT },
} = require('sequelize');
const {
  models: { Order },
} = db;

class Tab extends Model {
  getTax() {
    const venue = Venue.findAll({ where: { venueId: id } });
    const stateVal = venue.state;
    return (this.tax = stateTaxTable[stateVal]);
  }
  getSubTotal() {
    const drinks = Order.findAll({ where: { userId: id } });
    let drinksArray = [];
    drinks.forEach(drinksArray.push(Order.getSubTotal()));
    const subTotal = drinksArray.reduce((accum, orderTotal) => {
      accum + orderTotal;
    }, 0);
    return (this.subTotal = subTotal);
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
