const { Router } = require('express');
const router = Router();
const {
  models: { Drink, Tab, TabDrink },
} = require('../../db/index.js');
const {
  userAuth: { requireToken: requireUserToken },
} = require('../auth.js');

// This router is mounted at /api/user/tab
//all tabs - for admins only
router.get('/all', async (req, res, next) => {
  try {
    const tabs = await Tab.findAll();
    res.status(200).send(tabs);
  } catch (error) {
    next(error);
  }
});
//all open tabs - for admins only - is this already on venue?
router.get('/open', async (req, res, next) => {
  try {
    const openTabs = await Tab.findAll({
      where: {
        status: 'open',
      },
    });
    res.status(200).send(openTabs);
  } catch (error) {
    next(error);
  }
});

// GET /api/user/tabs (find user with token)
//     verify user with token
//     find tabs associated with user
//     return Tab details (eager load TabDrinks and Drinks)

// GET /api/user/tab/
router.get('/', requireUserToken, async (req, res, next) => {
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

// GET /api/user/order/current
// router.get('/current', requireUserToken, async (req, res, next) => {
//   try {
//     const { user } = req;
//     const order = await user.currentTab();
//     res.send(order);
//   } catch (err) {
//     next(err);
//   }
// });
// GET /api/user/currentTab
//     verify user with token
//     send Tab details (eager load TabDrinks and Drinks)

// GET /api/user/tab/:tabId - can be used more for tab history since users will only ever have 1 'open' tab
router.get('/:tabId', requireUserToken, async (req, res, next) => {
  try {
    const {
      user: { id: userId },
      params: { tabId },
    } = req;
    const tab = await Tab.getWithDrinks(tabId);
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

// POST /api/user/tab/current - creates a new tab for the user
//     verify user with token
//     check that user does not already have an open tab
//     if not, create a new Tab and send back

router.post('/current', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const tab = await user.tabId;
    // check that the user does not have another tab open
    if (tab.status === 'CLOSED') {
      let newTab = new Tab();
      await newTab.save();
      await user.addTab(newTab);
      //^magic method
      newTab = await Tab.getWithDrinks(newTab.id);
      res.send(newTab);
    } else {
      res.sendStatus(409);
    }
  } catch (err) {
    next(err);
  }
});

// PUT /api/user/tab
//     verify user with token
//     update tab somehow?? (many possibilities here, so not sure if we want to separate into further routes)
//         PUT /api/user/tab/addOrder
//
//         PUT /api/user/tab/addDrink

PUT / api / user / tab / moveDrink;
router.put('/current/moveDrink', requireUserToken, async (req, res, next) => {
  const {
    user,
    body: { drinkId, quantity, userId },
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
});

module.exports = router;
