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
    console.log(tabs);
    res.send(tabs);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/tab/:tabId - returns a particular tab of the user
router.get('/:tabId', requireUserToken, async (req, res, next) => {
  try {
    const {
      user: { id: userId },
      params: { tabId },
    } = req;
    const tab = await Tab.findByPk({ id, include: Drink, TabDrink });
    if (tab.userId === userId) {
      res.send(tab);
    } else {
      res.sendStatus(401);
    }
  } catch (err) {
    console.error(err);
    next(err);
  }
});

// // // GET /api/user/tab/current - returns single open tab without drinks
// router.get('/current', requireUserToken, async (req, res, next) => {
//   try {
//     const {
//       user: { id: userId },
//     } = req;
//     const tab = await Tab.findOne({ where: { userId }, status: 'open' });
//     res.send(tab);
//   } catch (err) {
//     next(err);
//   }
// });

// // GET /api/user/tab/current - returns current open tab with drinks
router.get('/current', requireUserToken, async (req, res, next) => {
  try {
    const {
      user: { id: userId },
    } = req;
    const tab = await Tab.findOne({
      where: userId,
      status: 'open',
      include: TabDrink,
      Drink,
    });
    res.send(tab);
  } catch (err) {
    next(err);
  }
});

// // POST /api/user/tab/current - creates a new tab for the user
router.post('/current', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const tab = await Tab.findByPk(user.tabId);
    // check that the user does not have an open tab
    if (tab.status === 'closed') {
      let newTab = new Tab();
      await newtab.save();
      await user.addTab(newTab);
      res.send(newTab);
    } else {
      res.sendStatus(409);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/user/tab/current/split - changes the tabDrink status to 'pending' on the user's tab who initated the split request
router.put('/current/split', requireUserToken, async (req, res, next) => {
  const {
    user,
    body: { tabDrinkId, quantity },
  } = req;
  try {
    const drink = await TabDrink.findByPk(tabDrinkId);
    drink.status = 'pending';
    drink.save();
    const tab = await Tab.findOne({
      where: userId,
      status: 'open',
      include: TabDrink,
      Drink,
    });
    res.send(tab);
  } catch (err) {
    next(err);
  }
});

//PUT /api/user/tab/current/split/accept - accepting an incoming split request
router.put(
  '/current/split/accept',
  requireUserToken,
  async (req, res, next) => {
    const {
      user,
      body: { tabDrinkId, drinkId, quantity },
    } = req;
    try {
      const tab = await Tab.findByPk(user.tabId);
      const drink = await TabDrink.findByPk(tabDrinkId);
      drink.status = 'accepted';
      drink.save();
      const newDrink = TabDrink.create({
        price: drink.price,
        quantity: drink.quantity,
        drinkId: user.drinkId,
      });
      await tab.addDrink(newDrink, { through: { quantity: quantity } });
      tab = await Tab.findByPk(user.tabId);
      res.send(tab);
    } catch (err) {
      next(err);
    }
  }
);

//PUT /api/user/tab/current/split/remove - after the new owner accepts, the drink status is changed to accepted and no longer shows up on this users tab
router.put('/current/split', requireUserToken, async (req, res, next) => {
  const {
    user,
    body: { tabDrinkId, quantity },
  } = req;
  try {
    const drink = await TabDrink.findByPk(tabDrinkId);
    drink.status = 'accepted';
    drink.save();
    tab = await Tab.findByPk(user.tabId);
    res.send(tab);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
