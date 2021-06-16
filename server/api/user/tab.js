const { Router } = require('express');
const router = Router();

const {
  models: { Drink, Tab, TabDrink },
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

// // GET /api/user/tab/current - returns current open tab with drinks
router.get('/current', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    console.log(user);
    const tab = await user.currentTab();
    console.log('this is the route current tab!!!', tab);
    res.send(tab);
  } catch (err) {
    // console.log(err);
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
    console.log(user.id);
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

// // POST /api/user/tab/current - creates a new tab for the user
router.post('/current', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const tab = await user.currentTab();
    // check that the user does not have an open tab
    if (tab) {
      res.sendStatus(409);
    } else {
      let newTab = new Tab();
      await newtab.save();
      await user.addTab(newTab);
      res.send(newTab);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/user/tab/current/request-split - changes the tabDrink status to 'pending' on the user's tab who initated the split request
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
      const incomingDrink = await TabDrink.create({
        status: 'REQUESTED-INCOMING',
        quantity: outboundDrink.quantity,
        price: outboundDrink.price,
        drinkId: outboundDrink.drinkId,
        userId: requestUserId,
        associatedTabDrinkId: outboundDrink.id,
      });
      res.sendStatus(201);
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
      const incomingDrink = await TabDrink.findByPk(tabDrinkId);
      incomingDrink.status = 'NO REQUEST';
      await incomingDrink.save();
      const { associatedTabDrinkId } = incomingDrink;
      const outboundDrink = await TabDrink.findByPk(associatedTabDrinkId);
      outboundDrink.status = 'ACCEPTED';
      outboundDrink.price = 0;
      await outboundDrink.save();
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

//PUT /api/user/tab/current/reject-split -
router.put(
  '/current/reject-split',
  requireUserToken,
  async (req, res, next) => {
    const {
      user,
      body: { tabDrinkId },
    } = req;
    try {
      const incomingDrink = await TabDrink.findByPk(tabDrinkId);
      const { associatedTabDrinkId } = incomingDrink;
      await incomingDrink.destroy();
      const outboundDrink = await TabDrink.findByPk(associatedTabDrinkId);
      outboundDrink.status = 'REJECTED';
      await outboundDrink.save();
      res.sendStatus(201);
    } catch (err) {
      next(err);
    }
  }
);

module.exports = router;
