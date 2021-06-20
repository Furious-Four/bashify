const { Router } = require('express');
const router = Router();

const {
  userAuth: { requireToken: requireUserToken },
} = require('../auth.js');
const {
  models: { User },
} = require('../../db');

// This router is mounted at /api/user/friend

// GET /api/user/friend/all
router.get('/all', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const friends = await user.getFriends();
    res.send(friends);
  } catch (err) {
    next(err);
  }
});

router.get('/requests', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    const requests = await user.getFriendRequests();
    res.send(requests);
  } catch (err) {
    next(err);
  }
});

router.post('/request', requireUserToken, async (req, res, next) => {
  try {
    const {
      user,
      body: { friendId },
    } = req;
    const friend = await User.findByPk(friendId);
    await user.addFriend(friend);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

router.put('/request', requireUserToken, async (req, res, next) => {
  try {
    const {
      user,
      body: { friendId, mode },
    } = req;
    const requestor = await User.findByPk(friendId);
    if (mode !== 'ACCEPT' && mode !== 'REJECT') {
      const error = new Error('invalid mode');
      error.status = 404;
      throw error;
    }
    if (mode === 'ACCEPT') await user.acceptFriend(requestor);
    if (mode === 'REJECT') await user.rejectFriend(requestor);
    res.sendStatus(201);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
