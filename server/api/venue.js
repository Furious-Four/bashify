const { Router } = require('express');
const Venue = require('../db/models/Venue');
const PickUpLocation = require('../db/models/PickUpLocation');
const Tab = require('../db/models/Tab');
const Menu = require('../db/models/Menu');
const Drink = require('../db/models/Drink');
const Employee = require('../db/models/Employee');
const router = Router();

// This router is mounted at /api/venue

// Routes

//get all venues
router.get('/', async (req, res, next) => {
  try {
    const venues = await Venue.findAll();
    res.status(200).send(venues);
  } catch (error) {
    next(error);
  }
});

//get venue with id
router.get('/:id', async (req, res, next) => {
  //still gotta eager load pickuplocation
  try {
    const { id } = req.params;
    const venue = await Venue.findAll({
      where: {
        id,
      },
      include: { model: Menu, include: [Drink] },
    });
    res.status(200).send(venue);
  } catch (error) {
    next(error);
  }
});

//create new venue with req.body.venue
router.post('/', async (req, res, next) => {
  try {
    const { venue } = req.body;
    const newVenue = await Venue.create({ venue });
    res.status(201).send(newVenue);
  } catch (error) {
    next(error);
  }
});

//update existing venue with id
router.put('/:id', async (req, res, next) => {
  try {
    const { id } = req.params;
    const { venue } = req.body;
    await Venue.update({ venue });
    const updatedVenue = await Venue.findOne(id);
    res.status(201).send(updatedVenue);
  } catch (error) {
    next(error);
  }
});

router.delete('/', async (req, res, next) => {
  //we're not doing this bc it's scary :(
  //leaving structure here just in case we're not scared anymore :)
});

router.get('/:id/tabs', async (req, res, next) => {
  try {
    const { id } = req.params;
    const venueWithTabs = await Venue.findAll({
      where: {
        id,
      },
      include: Tab,
    });
    res.status(200).send(venueWithTabs);
  } catch (error) {
    next(error);
  }
});

router.get('/:id/employees', async (req, res, next) => {
  try {
    const { id } = req.params;
    const venueWithEmployees = await Venue.findAll({
      where: {
        id,
      },
      include: Employee,
    });
    res.status(200).send(venueWithEmployees);
  } catch (error) {
    next(error);
  }
});
module.exports = router;
