// possible dynamic route generation for both venues and users
const { Router } = require('express');
const {
  models: { User, Venue },
} = require('../db/index');

const router = Router();

// create two routers, one for user authentication and another for venue authentication
const [userAuth, venueAuth] = Array(2)
  .fill('')
  .map(() => Router());

// map over a two-dimensional array of arrays like [router, Model], creating a post route
[
  [userAuth, User],
  [venueAuth, Venue],
].map(([router, Model]) => {
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
});

module.exports = { venueAuth, userAuth };
