const { Router } = require('express');
const router = Router();

const {
  userAuth: { requireToken: requireUserToken },
} = require('../auth.js');
const {
  models: { Drink, TabDrink, User },
} = require('../../db');

// This router is mounted at /api/user/split

// GET /api/user/split/incoming
router.get('/incoming', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const requests = await TabDrink.findAll({
      where: { userId: user.id, status: 'REQUESTED-INCOMING' },
      include: [{ model: Drink }, { model: User, as: 'requestedBy' }],
    });
    res.send(requests);
  } catch (err) {
    next(err);
  }
});

// GET /api/user/split/outbound
router.get('/outbound', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const requests = await TabDrink.findAll({
      where: { requestedById: user.id },
      include: [{ model: Drink }, { model: User, as: 'owner' }],
    });
    res.send(requests);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
