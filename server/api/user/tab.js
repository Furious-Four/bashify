const { Router } = require('express');
const router = Router();

const {
  models: { Tab, TabDrink },
} = require('../../db/index.js');
const {
  userAuth: { requireToken: requireUserToken },
} = require('../auth.js');

// GET /api/user/tab/all - returns all open and closed tabs by user
router.get('/all', requireUserToken, async (req, res, next) => {
  try {
    const {
      user: { id: userId },
    } = req;
    const tabs = await Tab.findAll({ where: { userId } });
    res.send(tabs);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/tab/current - returns current open tab with drinks
router.get('/current', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    // console.log(user);
    const tab = await user.currentTab();
    // console.log('this is the route current tab!!!', tab);
    res.send(tab);
  } catch (err) {
    console.log(err);
    next(err);
  }
});

// GET /api/user/tab/:tabId - returns a particular tab of the user
router.get('/:tabId', requireUserToken, async (req, res, next) => {
  try {
    const {
      user,
      params: { tabId },
    } = req;
    // console.log(user.id);
    const tab = await Tab.findByPk(tabId);

    if (tab.userId === user.id) {
      res.send(tab);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// // PUT /api/user/tab/current - creates a new tab for the user
router.put('/current', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const tab = await user.currentTab();
    const order = await user.currentOrder();
    if (!tab) {
      res.sendStatus(409);
    }
    order.orderDrinks.forEach(async (drink) => {
      const tabDrink = await TabDrink.findOne({
        where: {
          tabId: tab.id,
          drinkId: drink.drink.id,
        },
      });
      if (tabDrink) {
        tabDrink.quantity += drink.quantity;
        await tabDrink.save();
      } else {
        await TabDrink.create({
          quantity: drink.quantity,
          price: drink.price,
          tabId: tab.id,
          drinkId: drink.drinkId,
        });
      }
    });
  } catch (err) {
    next(err);
  }
});

// PUT /api/user/tab/current/request-split - changes the tabDrink status to "REQUESTED-OUTBOUND" and creates a new TabDrink to be asssigned to another user.
router.put(
  '/current/request-split',
  requireUserToken,
  async (req, res, next) => {
    const {
      user,
      body: { tabDrinkId, requestUserId },
    } = req;
    try {
      const outboundDrink = await TabDrink.findByPk(tabDrinkId);
      outboundDrink.status = 'REQUESTED-OUTBOUND';
      await outboundDrink.save();
      await TabDrink.create({
        status: 'REQUESTED-INCOMING',
        quantity: outboundDrink.quantity,
        price: outboundDrink.price,
        drinkId: outboundDrink.drinkId,
        userId: requestUserId,
        requestedById: user.id,
        associatedTabDrinkId: outboundDrink.id,
      });
      // console.log('outbound is', outboundDrink);
      // console.log('incoming is', incomingDrink);
      res.status(201).send(outboundDrink);
    } catch (err) {
      next(err);
    }
  }
);

//PUT /api/user/tab/current/split/accept-split - accepting an incoming split request
router.put(
  '/current/accept-split',
  requireUserToken,
  async (req, res, next) => {
    const {
      user,
      body: { tabDrinkId },
    } = req;
    try {
      console.log(tabDrinkId);
      const incomingDrink = await TabDrink.findByPk(tabDrinkId);
      incomingDrink.status = 'NO REQUEST';
      incomingDrink.tabId = user.tabId;
      await incomingDrink.save();
      const { associatedTabDrinkId } = incomingDrink;
      const outboundDrink = await TabDrink.findByPk(associatedTabDrinkId);
      outboundDrink.status = 'ACCEPTED';
      outboundDrink.price = 0;
      await outboundDrink.save();
      res.status(201).send(outboundDrink);
    } catch (err) {
      next(err);
    }
  }
);

//PUT /api/user/tab/current/reject-split - user can reject a drink someone has allocated to them. Destroys the incoming tabDrink and changes outbound tabDrink status to REJECTED
router.put(
  '/current/reject-split',
  requireUserToken,
  async (req, res, next) => {
    const {
      body: { tabDrinkId },
    } = req;
    try {
      const incomingDrink = await TabDrink.findByPk(tabDrinkId);
      const { associatedTabDrinkId } = incomingDrink;
      await incomingDrink.destroy();
      const outboundDrink = await TabDrink.findByPk(associatedTabDrinkId);
      outboundDrink.status = 'REJECTED';
      await outboundDrink.save();
      res.status(201).send(outboundDrink);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
