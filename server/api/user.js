const { Router } = require('express');
const router = Router();

// This router is mounted at /api/user

// High-level User Routes

// Nested routers for the user api
const {
  userAuth: { router: userRouter },
} = require('./auth');
router.use('/auth', userRouter);
router.use('/order', require('./user/order'));
router.use('/tab', require('./user/tab'));

module.exports = router;
