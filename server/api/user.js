const { Router } = require('express');
const router = Router();

const {
  userAuth: { router: userRouter, requireToken: requireUserToken },
} = require('./auth');
const {
  models: { User },
} = require('../db/index');

// This router is mounted at /api/user

// GET /api/user
router.get('/', requireUserToken, async (req, res, next) => {
  try {
    const { user } = req;
    user.friends = await user.getFriends();
    console.log(user.friends);
    res.send(user);
  } catch (err) {
    next();
  }
});

// POST /api/user
router.post('/', async (req, res, next) => {
  try {
    const { firstName, lastName, username, email, password, phone } = req.body;
    let newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password,
      phone,
    });
    await newUser.save();
    // newUser = await User.findByPk(newUser.id, {
    //   attributes: { exclude: ['password'] },
    // });
    const token = await User.authenticate({ email, password });
    res.status(201).send({ token });
  } catch (err) {
    err.status = 401;
    next(err);
  }
});

// PUT /api/user
router.put('/', requireUserToken, async (req, res, next) => {
  try {
    let { user } = req;
    const { firstName, lastName, username, email, password, phone } = req.body;
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.email = email || user.email;
    user.username = username || user.username;
    user.password = password || user.password;
    user.phone = phone || user.phone;
    await user.save();
    user = await User.findByPk(user.id, {
      attributes: { exclude: ['password'] },
    });
    user = res.send(user);
  } catch (err) {
    next(err);
  }
});

// DELETE /api/user LATER

// Nested routers for the user api
router.use('/auth', userRouter);
router.use('/order', require('./user/order'));
// router.use('/tab', require('./user/tab'));

module.exports = router;
