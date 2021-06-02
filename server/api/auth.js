// possible dynamic route generation for both venues and users
const { Router } = require('express');
const {
  models: { User, Venue },
} = require('../db/index.js');

const userAuth = {
  modelName: 'user',
  router: Router(),
  Model: User,
  requireToken: () => {},
};

const venueAuth = {
  modelName: 'venue',
  router: Router(),
  Model: Venue,
  requireToken: () => {},
};

// map over a two-dimensional array of arrays like [router, Model], creating a post route
[userAuth, venueAuth].forEach(({ modelName, router, Model, requireToken }) => {
  router.post('/', async (req, res, next) => {
    try {
      const {
        body: { email, password },
      } = req;
      // use the relevant Model to get a token from the authenticate method
      const token = await Model.authenticate({ email, password });
      // e.g. User.authenticate or Venue.authenticate
      res.send(token);
    } catch (err) {
      next(err);
    }
  });
  requireToken = async (req, res, next) => {
    const {
      headers: { authorization: token },
    } = req;
    try {
      const instance = Model.byToken(token);
      req[modelName] = instance; // either req.user or req.venue
      next();
    } catch (err) {
      next(err);
    }
  };
});

module.exports = { userAuth, venueAuth };
