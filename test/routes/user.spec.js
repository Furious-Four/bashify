const {
  describe,
  test,
  expect,
  beforeAll,
  afterAll,
} = require('@jest/globals');
const jwt = require('jsonwebtoken');
const {
  models: { Drink, Order, OrderDrink, User, Tab, TabDrink },
} = require('../../server/db/index.js');
const app = require('supertest')(require('../../server/app.js'));

let newUser;
let drink;

beforeAll(async () => {
  newUser = new User({
    firstName: 'John',
    lastName: 'Doe',
    username: 'jdoe',
    email: 'jdoe@test.com',
    password: '1234',
    phone: '1234567890',
  });
  await newUser.save();
  newDrink = await Drink.findOne();
  await newDrink.save();
});
afterAll(async () => {
  await newUser.destroy();
});
describe('user routes', () => {
  describe('/api/user', () => {
    let token;
    beforeAll(() => {
      const { id } = newUser;
      token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
    });
    describe('GET /api/user', () => {
      test('with a valid token, it returns a user', async () => {
        const user = await User.findByPk(newUser.id);
        const response = await app.get('/api/user').set('authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.fullName).toBe(user.fullName);
      });
      test('without a valid token, it returns a 401', async () => {
        const response = await app.get('/api/user');
        expect(response.status).toBe(401);
      });
    });
    describe('POST /api/user', () => {
      test('with all required fields, creates and returns a user', async () => {
        const response = await app.post('/api/user').send({
          firstName: 'Jane',
          lastName: 'Shepard',
          username: 'CommanderShepard',
          email: 'jshep@alliance.net',
          password: 'spectre123',
          phone: '9876543210',
        });
        expect(response.status).toBe(201);
        const user = await User.findOne({ where: { firstName: 'Jane' } });
        expect(response.body.fullName).toBe(user.fullName);
      });
      test('requires a unique email not already in the database', async () => {
        const response = await app.post('/api/user').send({
          firstName: 'Jane',
          lastName: 'Shepard',
          email: 'jshep@alliance.net',
          password: 'spectre123',
          phone: '9876543210',
        });
        const user = await User.findOne({ where: { firstName: 'Jane' } });
        await user.destroy();
        expect(response.status).toBe(401);
      });
    });
    describe('PUT /api/user', () => {
      test('with a valid token, updates the current user', async () => {
        const response = await app
          .put('/api/user')
          .set('authorization', token)
          .send({ firstName: 'Jane' });
        const user = await User.findByPk(newUser.id);
        expect(response.status).toBe(200);
        expect(response.body.fullName).toBe(user.fullName);
      });
      test('without a valid token, does nothing to the user', async () => {
        const userBefore = await User.findByPk(newUser.id);
        const response = await app.put('/api/user').send({ firstName: 'John' });
        const userAfter = await User.findByPk(newUser.id);
        expect(response.status).toBe(401);
        expect(Date.parse(userAfter.updatedAt)).toBe(
          Date.parse(userBefore.updatedAt)
        );
      });
    });
  });
  describe('/api/user/auth', () => {
    describe('POST /api/users/auth', () => {
      test('with valid credentials, it returns a token', async () => {
        const response = await app
          .post('/api/user/auth')
          .send({ email: 'jdoe@test.com', password: '1234' });
        const { id } = await User.findOne({
          where: { lastName: 'Doe' },
        });
        const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
        expect(response.status).toBe(200);
        expect(response.body.token).toBe(token);
      });
      test('with invalid credentials, it throws an error', async () => {
        const response = await app
          .post('/api/user/auth')
          .send({ email: 'notRight', password: 'alsoWrong' });
        expect(response.status).toBe(401);
      });
    });
  });
  describe('/api/user/order', () => {
    let token, firstOrder;
    beforeAll(async () => {
      const { id } = newUser;
      token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
      firstOrder = new Order();
      firstOrder.userId = id;
      await firstOrder.save();
    });
    describe('GET /api/user/order/all', () => {
      test('with a valid token for a user, returns their orders', async () => {
        const orders = await Order.findAll({ where: { userId: newUser.id } });
        const response = await app
          .get('/api/user/order/all')
          .set('authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.length).toBe(orders.length);
      });
      test('without a valid token for a user, returns nothing', async () => {
        const orders = await Order.findAll({ where: { userId: newUser.id } });
        const response = await app.get('/api/user/order/all');
        expect(response.status).toBe(401);
      });
    });
    describe('GET /api/user/order/currentOrder', () => {
      test('with a valid token for associated user, returns the most recent order', async () => {
        const secondOrder = new Order();
        secondOrder.userId = newUser.id;
        await secondOrder.save();
        const orders = await Order.findAll({
          where: { userId: newUser.id },
          order: [['createdAt', 'DESC']],
        });
        const response = await app
          .get('/api/user/order/current')
          .set('authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(orders[0].id);
      });
    });
    describe('GET /api/user/order/:orderId', () => {
      test('with a valid token for associated user, returns the order', async () => {
        const { id } = firstOrder;
        const order = await Order.getWithDrinks(id);
        const response = await app
          .get(`/api/user/order/${id}`)
          .set('authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.confirmationId).toBe(order.confirmationId);
      });
      test('without a valid token for associated user, returns nothing', async () => {
        const secondOrder = new Order();
        await secondOrder.save();
        const { id } = secondOrder;
        const response = await app
          .get(`/api/user/order/${id}`)
          .set('authorization', token);
        expect(response.status).toBe(401);
      });
    });
    describe('POST /api/user/order/current', () => {
      test('with a valid token and no open order, creates a new order', async () => {
        const orders = await Order.findAll({
          where: { userId: newUser.id },
          order: [['createdAt', 'DESC']],
        });
        const order = orders[0];
        order.status = 'COMPLETED';
        await order.save();
        const response = await app
          .post('/api/user/order/current')
          .set('authorization', token);
        expect(response.status).toBe(200);
        expect(Date.parse(response.body.createdAt)).toBeGreaterThan(
          Date.parse(order.createdAt)
        );
      });
      test('with a valid token but a still open order, does not create a new one', async () => {
        const response = await app
          .post('/api/user/order/current')
          .set('authorization', token);
        expect(response.status).toBe(409);
      });
    });
    describe('PUT /api/user/order/current/modify-drink', () => {
      let newOrder;
      beforeAll(async () => {
        newOrder = new Order();
        newOrder.userId = newUser.id;
        await newOrder.save();
        const drinks = await Drink.findAll({ limit: 3 });
        await Promise.all(
          drinks.map((drink) => {
            newOrder.addDrink(drink, {
              through: {
                quantity: Math.floor(Math.random() * 5) + 1,
                price: drink.price,
              },
            });
          })
        );
      });
      test('with a valid token for associated user, updates the quantity of a drink', async () => {
        const { orderDrinks } = await Order.getWithDrinks(newOrder.id);
        const orderDrink = orderDrinks[0];
        const response = await app
          .put('/api/user/order/current/modify-drink')
          .set('authorization', token)
          .send({
            drinkId: orderDrink.drink.id,
            quantity: orderDrink.quantity + 1,
          });
        expect(response.status).toBe(200);
        const newOrderDrink = await OrderDrink.findOne({
          where: { drinkId: orderDrink.drinkId, orderId: orderDrink.orderId },
        });
        expect(newOrderDrink.quantity).toBe(orderDrink.quantity + 1);
      });
      test('passing a quantity of 0 removes a drink from the order', async () => {
        const { orderDrinks } = await Order.getWithDrinks(newOrder.id);
        const orderDrink = orderDrinks[0];
        const response = await app
          .put('/api/user/order/current/modify-drink')
          .set('authorization', token)
          .send({
            drinkId: orderDrink.drink.id,
            quantity: 0,
          });
        expect(response.status).toBe(200);
        const { orderDrinks: newOrderDrinks } = response.body;
        expect(newOrderDrinks.length).toBe(orderDrinks.length - 1);
      });
    });
  });

  describe('/api/user/tab', () => {
    let token, newTab, newTabDrink;
    beforeAll(async () => {
      const { id } = newUser;
      token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
      newTab = new Tab();
      newTab.userId = id;
      await newTab.save();
      newTabDrink = new TabDrink({
        quantity: 100,
        price: 1.0,
        drinkId: newDrink.id,
        userId: newUser.id,
      });
      await newTabDrink.save();
    });
    describe('GET /api/user/tab/all', () => {
      test('with a valid token for a user, returns their tabs', async () => {
        const tabs = await Tab.findAll({ where: { userId: newUser.id } });
        const response = await app
          .get('/api/user/tab/all')
          .set('authorization', token);
        expect(response.body.length).toBe(tabs.length);
      });
      test('without a valid token for a user, returns nothing', async () => {
        const tabs = await Tab.findAll({ where: { userId: newUser.id } });
        const response = await app.get('/api/user/tab/all');
        expect(response.status).toBe(401);
      });
    });

    describe('GET /api/user/tab/:tabId', () => {
      test('with a valid token for associated user, returns the tab by Id', async () => {
        const { id } = newTab;
        const tab = await Tab.findByPk(id);
        const response = await app
          .get(`/api/user/tab/${id}`)
          .set('authorization', token);
        expect(response.status).toBe(200);
        expect(response.body.id).toBe(tab.id);
      });
      test('without a valid token for associated user, returns nothing', async () => {
        const anotherTab = new Tab();
        await anotherTab.save();
        const { id } = anotherTab;
        const response = await app
          .get(`/api/user/tab/${id}`)
          .set('authorization', token);
        expect(response.status).toBe(401);
      });
    });

    describe('GET /api/user/tab/current', () => {
      test('with a valid token for associated user, return the users open tab', async () => {
        const tab = await Tab.findOne({
          where: { userId: newUser.id, status: 'open' },
        });

        const response = await app
          .get('/api/user/tab/current')
          .set('authorization', token);
        console.log(response.body);
        expect(response.body.id).toBe(tab.id);
        expect(response.body.status).toEqual(tab.status);
      });
    });

    describe('PUT /api/user/tab/request-split', () => {
      test('with a valid token for associated user, allow the user send a request to allocate a TabDrink to another user', async () => {
        const response = await app
          .put('/api/user/tab/current/request-split')
          .set('authorization', token)
          .send({
            tabDrinkId: newTabDrink.id,
            requestUserId: newUser.id,
          });
        const incomingCreated = await TabDrink.findOne({
          where: {
            associatedTabDrinkId: newTabDrink.id,
          },
        });

        expect(response.status).toBe(201);
        expect(incomingCreated.status).toBe('REQUESTED-INCOMING');
        expect(response.body.status).toBe('REQUESTED-OUTBOUND');
      });
    });

    describe('PUT /api/user/tab/accept-split', () => {
      test('with a valid token for associated user, allow the user send a request to allocate a TabDrink to another user', async () => {
        const incomingCreated = await TabDrink.findOne({
          where: {
            associatedTabDrinkId: newTabDrink.id,
          },
        });
        const response = await app
          .put('/api/user/tab/current/accept-split')
          .set('authorization', token)
          .send({
            tabDrinkId: incomingCreated.id,
          });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe('ACCEPTED');
      });
    });

    describe('PUT /api/user/tab/reject-split', () => {
      test('with a valid token for associated user, allow the user send a request to allocate a TabDrink to another user', async () => {
        const incomingCreated = await TabDrink.findOne({
          where: {
            associatedTabDrinkId: newTabDrink.id,
          },
        });
        const response = await app
          .put('/api/user/tab/current/reject-split')
          .set('authorization', token)
          .send({
            tabDrinkId: incomingCreated.id,
          });

        expect(response.status).toBe(201);
        expect(response.body.status).toBe('REJECTED');
      });
    });
    // describe('POST /api/user/tab/current', () => {
    //   test('with a valid token for associated user and no open tab, create a new tab for the user', async () => {
    //     newTab.status = 'closed';
    //     await newTab.save();
    //     const response = await app
    //       .post('/api/user/tab/current/')
    //       .set('authorization', token);

    //     expect(response.status).toBe(200);
    //     expect(response.body.status).toBe('open');
    //   });

    //   test('with a valid token but a still open tab, does not create a new tab', async () => {
    //     const response = await app
    //       .post('/api/user/tab/current')
    //       .set('authorization', token);
    //     expect(response.status).toBe(409);
    //   });
    // });
  });
});
