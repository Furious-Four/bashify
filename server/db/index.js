const db = require('./db');

//import all models
const Drink = require('./models/Drink');
const Employee = require('./models/Employee');
const Menu = require('./models/Menu');
const OrderDrink = require('./models/Order_Drink');
const Order = require('./models/Order');
// const PickUpLocation = require('./models/PickUpLocation');
// const Tab = require('./models/Tab');
const User = require('./models/User');
const Venue = require('./models/Venue');

//model associations

// OrderDrink is a connection table that connects a Drink to an Order and keeps the quantity and price at the time of order
Order.belongsToMany(Drink, { through: OrderDrink });
Drink.belongsToMany(Order, { through: OrderDrink });
Order.hasMany(OrderDrink);
OrderDrink.belongsTo(Order);
Drink.hasMany(OrderDrink);
OrderDrink.belongsTo(Drink);

Employee.belongsTo(Venue);
Venue.hasMany(Employee);

Menu.belongsTo(Venue);
Venue.hasMany(Menu);

Menu.hasMany(Drink);
Drink.belongsTo(Menu);

module.exports = {
  db,
  models: {
    Drink,
    Employee,
    Menu,
    OrderDrink,
    Order,
    // PickUpLocation,
    // Tab,
    User,
    Venue,
  },
};
