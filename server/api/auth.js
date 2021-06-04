// possible dynamic route generation for both venues and users
const { Router } = require('express');
const {
  models: { User, Venue },
} = require('../db/index.js');

const userAuth = {
  router: Router(),
  Model: User,
  modelName: 'user',
  requireToken: () => 'test',
};

const venueAuth = {
  router: Router(),
  Model: Venue,
  modelName: 'user',
  requireToken: () => 'test',
};

// map over a two-dimensional array of arrays like [router, Model], creating a post route
[userAuth, venueAuth].forEach((authObject) => {
  const { router, Model, modelName } = authObject;
  router.post('/', async (req, res, next) => {
    try {
      const {
        body: { email, password },
      } = req;
      // use the relevant Model to get a token from the authenticate method
      const token = await Model.authenticate({ email, password });
      // e.g. User.authenticate or Venue.authenticate
      res.send({ token });
    } catch (err) {
      next(err);
    }
  });
  authObject.requireToken = async (req, res, next) => {
    const {
      headers: { authorization: token },
    } = req;
    try {
      const instance = await Model.byToken(token);
      req[modelName] = instance; // either req.user or req.venue
      next();
    } catch (err) {
      err.status = 401;
      next(err);
    }
  };
});

module.exports = { userAuth, venueAuth };
