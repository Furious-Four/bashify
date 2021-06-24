const { db } = require('./index');
const Drink = require('./models/Drink');
const Employee = require('./models/Employee');
const Menu = require('./models/Menu');
const User = require('./models/User');
const Venue = require('./models/Venue');
const PickUpLocation = require('./models/PickUpLocation');

const Order = require('./models/Order');
const OrderDrink = require('./models/OrderDrink')

const Tab = require('./models/Tab');
const TabDrink = require('./models/TabDrink');


const seed = async () => {
  try {
    //venue data
    const furiousFourPub = await Venue.create({
      name: 'Furious Four Pub',
      type: 'Pub',
      email: 'furiousfourpub@email.com',
      address: '4 Furious Ave, NY, 00000',
      state: 'NY',
      website: 'www.furiousfourpub.com',
      rating: 5,
    });
    const fullstack = await Venue.create({
      name: 'Fullstack Academy of Alcohol',
      type: 'Bar',
      email: 'erickats@alsoknownasprof.com',
      address: '100 Code Ave, NY, 00001',
      state: 'NY',
      website: 'www.fullstackalcohol.com',
      rating: 3,
    });
    const crocodilebar = await Venue.create({
      name: 'Crocodile Bar',
      type: 'Bar',
      email: 'crocodilebar@NYU.com',
      address: '999 Crocodile Ave, NY, 10293',
      state: 'NY',
      website: 'www.crocodilebar.com',
      rating: 4,
    });
    const alligatorbar = await Venue.create({
      name: 'Alligator Bar',
      type: 'Bar',
      email: 'alligatorbar@grr.com',
      address: '198 Alligator Pkwy, NY, 03993',
      state: 'NY',
      website: 'www.alligatorbar.com',
      rating: 3,
    });

    //pickuplocation data
    const pickupA = await PickUpLocation.create({
      name: 'Main Bar',
      venueId: furiousFourPub.id,
    });

    //employee data
    const prof = await Employee.create({
      firstName: 'Eric P.',
      lastName: 'Katz',
      role: 'Manager',
      pin: 0,
      venueId: furiousFourPub.id,
    });
    const stanley = await Employee.create({
      firstName: 'Stanley',
      lastName: 'Lim',
      role: 'Bartender',
      pin: 1,
      venueId: furiousFourPub.id,
    });
    const zaina = await Employee.create({
      firstName: 'Zaina',
      lastName: 'Rodney',
      role: 'Bartender',
      pin: 2,
      venueId: furiousFourPub.id,
    });
    const thompson = await Employee.create({
      firstName: 'Thompson',
      lastName: 'Harris',
      role: 'Bartender',
      pin: 3,
      venueId: furiousFourPub.id,
    });

    //user data
    const arjan = await User.create({
      firstName: 'Arjan',
      lastName: 'Mitra',
      email: 'arjanmitra@email.com',
      username: 'arjanmitra',
      password: 'test',
      phone: '647-999-9999',
    });

    const justin = await User.create({
      firstName: 'Justin',
      lastName: 'Mattos',
      email: 'justinmattos@email.com',
      username: 'justinmattos',
      password: 'test',
      phone: '000-000-0000',
    });

    const dominique = await User.create({
      firstName: 'Dominique',
      lastName: 'Sobieski',
      email: 'domisobi@email.com',
      username: 'domisobi',
      password: 'test',
      phone: '201-203-0000',
    });

    const michelle = await User.create({
      firstName: 'Michelle',
      lastName: 'Martin',
      email: 'michellemartin@email.com',
      username: 'michellemartin',
      password: 'test',
      phone: '907-039-1111',
    });

    await justin.addFriend(arjan);
    await justin.addFriend(dominique);
    await michelle.addFriend(justin);
    await arjan.acceptFriend(justin);

    //menu data
    const nightMenu = await Menu.create({
      name: 'Night Menu',
      venueId: furiousFourPub.id,
    });

    //whiskey data
    const glenlivetShot = await Drink.create({
      name: "The Glenlivet Founder's Reserve Scotch Whisky - Single Shot",
      brand: 'Glenlivet',
      type: 'Whiskey',
      price: 7,
      amount: 25,
      image: "../../public/assets/glenlivetfoundersreserve.png",
      menuId: nightMenu.id,
    });
    const glenlivetDoubleShot = await Drink.create({
      name: "The Glenlivet Founder's Reserve Scotch Whisky - Double Shot",
      brand: 'Glenlivet',
      type: 'Whiskey',
      price: 14,
      amount: 50,
      image: "../../public/assets/glenlivetfoundersreserve.png",
      menuId: nightMenu.id,
    });
    const redLabelShot = await Drink.create({
      name: 'Johnnie Walker Red Label Scotch Whisky - Single Shot',
      brand: 'Johnnie Walker',
      type: 'Whiskey',
      price: 10,
      amount: 25,
      image: "../../public/assets/johnniewalker.png",
      menuId: nightMenu.id,
    });
    const redLabelDoubleShot = await Drink.create({
      name: 'Johnnie Walker Red Label Scotch Whisky - Double Shot',
      brand: 'Johnnie Walker',
      type: 'Whiskey',
      price: 15,
      amount: 50,
      image: "../../public/assets/johnniewalker.png",
      menuId: nightMenu.id,
    });

    //rum data
    const bacardiShot = await Drink.create({
      name: 'Bacardi Superior White Rum - Single Shot',
      brand: 'Bacardi',
      type: 'Rum',
      price: 9,
      amount: 25,
      image: "../../public/assets/bacardirum.png",
      menuId: nightMenu.id,
    });
    const captainMorganShot = await Drink.create({
      name: 'Captain Morgan White Rum - Single Shot',
      brand: 'Captain Morgan',
      type: 'Rum',
      price: 10,
      amount: 25,
      image: "../../public/assets/captainmorgan.png",
      menuId: nightMenu.id,
    });

    //cognac data
    const hennessyShot = await Drink.create({
      name: 'Hennessy VS Cognac - Single Shot',
      brand: 'Hennessy',
      type: 'Cognac',
      price: 15,
      amount: 25,
      image: "../../public/assets/hennessy.png",
      menuId: nightMenu.id,
    });

    //tequila data
    const patronShot = await Drink.create({
      name: 'Patron Silver Tequila - Single Shot',
      brand: 'Patron',
      type: 'Tequila',
      price: 15,
      amount: 25,
      image: "../../public/assets/patron.png",
      menuId: nightMenu.id,
    });
    const donJulioShot = await Drink.create({
      name: 'Don Julio Blanco Tequila - Single Shot',
      brand: 'Don Julio',
      type: 'Tequila',
      price: 15,
      amount: 25,
      image: "../../public/assets/donjulio.png",
      menuId: nightMenu.id,
    });
    // added test order
const testOrder = await Order.create({
  status: 'ORDERING',
  userId: 3,
  venueId: 1
})

const testOrderDrink1 = await OrderDrink.create({
  quantity: 1,
  price: donJulioShot.price,
  orderId: testOrder.id,
  drinkId: donJulioShot.id
})

const testOrderDrink2 = await OrderDrink.create({
  quantity: 1,
  price: patronShot.price,
  orderId: testOrder.id,
  drinkId: patronShot.id
})


    //tab data
    const michelleTab = await Tab.create({ userId: michelle.id });

    //tabDrink data
    const michelleTabDrink = await TabDrink.create({
      userId: michelle.id,
      tabId: michelleTab.id,
      drinkId: donJulioShot.id,
    });

    //tab data
    const domisobiTab = await Tab.create({ userId: dominique.id });

    //tabDrink data
    const domisobiTabDrink = await TabDrink.create({
      userId: dominique.id,
      tabId: domisobiTab.id,
      drinkId: donJulioShot.id,
    });

  } catch (error) {
    console.log(error);
  }
};


const init = async () => {
  try {
    await db.sync({ force: true });
    await seed();
    console.log('connected');
    //await db.close();
    //commented out the above as it connects to the db, seeds, then closes it.
    //results in connection issues when serving data
  } catch (error) {
    console.log(error);
    // db.close();
  }
};

module.exports = { init, seed };
