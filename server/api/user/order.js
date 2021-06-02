const { Router } = require('express');
const router = Router();

const {
  models: { Order },
} = require('../../db/index.js');
const {
  userAuth: { requireToken: requireUserToken },
} = require('../auth.js');

// This router is mounted at /api/user/order

// GET /api/user/order/:id
router.get('/:orderId', requireUserToken, async (req, res, next) => {
  try {
    const {
      user: { id: userId },
      params: { orderId },
    } = req;
    const order = await Order.findByPk(orderId, { where: userId });
    res.send(order);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/currentOrder
router.get('/currentOrder', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const order = await user.currentOrder();
    res.send(order);
  } catch (err) {
    next(err);
  }
});

// POST /api/user/currentOrder
router.post('/currentOrder', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    // check for a current order, then create if none
  } catch (err) {
    next(err);
  }
});

// PUT /api/user/currentOrder
router.put('/currentOrder', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
  } catch (err) {
    next(err);
  }
});
