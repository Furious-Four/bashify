const { Router } = require('express');
const router = Router();

// This router is mounted at /api/user

// High-level User Routes

// Nested routers for the user api
// const { userAuth } = require('./auth');
// router.use('/auth', userAuth);
// router.use('/order', require('./user/order'));
// router.use('/tab', require('./user/tab'));

module.exports = router;
