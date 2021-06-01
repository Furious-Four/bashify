const db = require('./db');

//import all models
const Order = require('./models/Order');
const OrderDrink = require('./models/Order_Drink');
const Menu = require('./models/Menu');
const Employee = require('./models/Employee');
const Drink = require('./models/Drink');
const Tab = require('./models/Tab');
const PickUpLocation = require('./models/PickUpLocation');
const Venue = require('./models/Venue');
const User = require('./models/User');

//model associations

// OrderDrink is a connection table that connects a Drink to an Order and keeps the quantity and price at the time of order
// Order.belongsToMany(Drink, { through: OrderDrink });
// Drink.belongsToMany(Order, { through: OrderDrink });
Order.hasMany(OrderDrink);
OrderDrink.belongsTo(Order);
// Drink.hasMany(OrderDrink);
// OrderDrink.belongsTo(Drink);
// Employee.belongsTo(Venue)
// Menu.belongsTo(Venue)
Drink.belongsTo(Menu);
Menu.hasMany(Drink);
Tab.belongsTo(Venue);
Venue.hasMany(Tab);
Tab.belongsTo(User);
User.hasMany(Tab);
PickUpLocation.belongsTo(Venue);
Venue.hasMany(PickUpLocation);

module.exports = {
  db,
  models: {
    Order,
    OrderDrink,
    Menu,
    Employee,
    Drink,
    Tab,
    PickUpLocation,
    User,
  },
};
