const db = require('./db');

//import all models
const Order = require('./models/Order');
const OrderDrink = require('./models/Order_Drink');

//model associations

// OrderDrink is a connection table that connects a Drink to an Order and keeps the quantity and price at the time of order
// Order.belongsToMany(Drink, { through: OrderDrink });
// Drink.belongsToMany(Order, { through: OrderDrink });
Order.hasMany(OrderDrink);
OrderDrink.belongsTo(Order);
// Drink.hasMany(OrderDrink);
// OrderDrink.belongsTo(Drink);

module.exports = { db, models: { Order, OrderDrink } };
