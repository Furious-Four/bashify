const db = require('./db');

//import all models
const Drink = require('./models/Drink');
const Employee = require('./models/Employee');
const Friendship = require('./models/Friendship');
const Menu = require('./models/Menu');
const Order = require('./models/Order');
const OrderDrink = require('./models/OrderDrink');
const PickUpLocation = require('./models/PickUpLocation');
const Tab = require('./models/Tab');
const TabDrink = require('./models/TabDrink');
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

Venue.hasMany(Employee);
Employee.belongsTo(Venue);

Venue.hasMany(Menu);
Menu.belongsTo(Venue);

Tab.belongsToMany(Drink, { through: TabDrink });
Drink.belongsToMany(Tab, { through: TabDrink });
Tab.hasMany(TabDrink);
TabDrink.belongsTo(Tab);
Drink.hasMany(TabDrink);
TabDrink.belongsTo(Drink);

// For the sake of requests:
User.hasMany(TabDrink, { as: 'owner' });
TabDrink.belongsTo(User, { as: 'owner', foreignKey: 'userId' });
User.hasMany(TabDrink, { as: 'requestedBy' });
TabDrink.belongsTo(User, { as: 'requestedBy', foreignKey: 'requestedById' });

User.hasMany(Order);
Order.belongsTo(User);

User.hasMany(Tab);
Tab.belongsTo(User);

Venue.hasMany(Order);
Order.belongsTo(Venue);

Venue.hasMany(Tab);
Tab.belongsTo(Venue);

Venue.hasMany(Employee);
Employee.belongsTo(Venue);

Venue.hasMany(PickUpLocation);
PickUpLocation.belongsTo(Venue);

Venue.hasMany(Menu);
Menu.belongsTo(Venue);

Menu.hasMany(Drink);
Drink.belongsTo(Menu);

User.belongsToMany(User, {
  through: Friendship,
  as: 'user',
  foreignKey: 'userId',
});
User.belongsToMany(User, {
  through: Friendship,
  as: 'friends',
  foreignKey: 'friendId',
});
// User.hasMany(Friendship, { as: 'user' });
Friendship.belongsTo(User, { foreignKey: 'userId' });
// User.hasMany(Friendship, { as: 'friends' });
Friendship.belongsTo(User, { foreignKey: 'friendId' });

module.exports = {
  db,
  models: {
    Drink,
    Employee,
    Friendship,
    Menu,
    Order,
    OrderDrink,
    PickUpLocation,
    Tab,
    TabDrink,
    User,
    Venue,
  },
};
