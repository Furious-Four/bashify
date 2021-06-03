// possible dynamic route generation for both venues and users
const { Router } = require('express');
const {
  models: { User, Venue },
} = require('../db/index.js');

const userAuth = {
  router: Router(),
  Model: User,
  requireToken: () => {},
};

const venueAuth = {
  router: Router(),
  Model: Venue,
  requireToken: () => {},
};

// map over a two-dimensional array of arrays like [router, Model], creating a post route
[userAuth, venueAuth].forEach(({ router, Model, requireToken }) => {
  router.post('/', async (req, res, next) => {
    try {
      const {
        body: { email, password },
      } = req;
      // use the relevant Model to get a token from the authenticate method
      const token = await Model.authenticate({ email, password });
      console.log(token);
      // e.g. User.authenticate or Venue.authenticate
      res.send({ token });
    } catch (err) {
      console.error(err);
      next(err);
    }
  });
  requireToken = async (req, res, next) => {
    const {
      headers: { authorization: token },
    } = req;
    try {
      const instance = Model.byToken(token);
      req[await Model.getTableName()] = instance; // either req.user or req.venue
      next();
    } catch (err) {
      next(err);
    }
  };
});

module.exports = { userAuth, venueAuth };
