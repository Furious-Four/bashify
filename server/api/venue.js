const { Router } = require('express');
const Venue = require('../db/models/Venue');
const router = Router();

// This router is mounted at /api/venue

// Routes

router.get('/', async (req, res, next) => {
  try {
    const venues = await Venue.findAll();
    res.send(venues);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
