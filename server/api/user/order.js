const { Router } = require('express');
const router = Router();

const {
  models: { Drink, Order },
} = require('../../db/index.js');
const {
  userAuth: { requireToken: requireUserToken },
} = require('../auth.js');

// This router is mounted at /api/user/order

// GET /api/user/order/all
router.get('/all', requireUserToken, async (req, res, next) => {
  try {
    const {
      user: { id: userId },
    } = req;
    const orders = await Order.findAll({ where: { userId } });
    res.send(orders);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/order/current
router.get('/current', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const order = await user.currentOrder();
    res.send(order);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/order/:orderId
router.get('/:orderId', requireUserToken, async (req, res, next) => {
  try {
    const {
      user: { id: userId },
      params: { orderId },
    } = req;
    const order = await Order.getWithDrinks(orderId);
    if (order.userId === userId) {
      res.send(order);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// POST /api/user/order/current
router.post('/current', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const order = await user.currentOrder();
    // check that the user's most recent order is completed, otherwise do not create another
    if (order.status === 'COMPLETED') {
      let newOrder = new Order();
      await newOrder.save();
      await user.addOrder(newOrder);
      newOrder = await Order.getWithDrinks(newOrder.id);
      res.send(newOrder);
    } else {
      res.sendStatus(409);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/user/order/current/modify-drink
router.put(
  '/current/modify-drink',
  requireUserToken,
  async (req, res, next) => {
    const {
      user,
      body: { drinkId, quantity },
    } = req;
    try {
      const drink = await Drink.findByPk(drinkId);
      let order = await user.currentOrder();
      await order.removeDrink(drink);
      if (quantity > 0) {
        await order.addDrink(drink, { through: { quantity } });
      }
      order = await Order.getWithDrinks(order.id);
      res.send(order);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
