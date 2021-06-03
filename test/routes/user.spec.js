const jwt = require('jsonwebtoken');
const {
  models: { User },
} = require('../../server/db/index.js');
const app = require('supertest')(require('../../server/app.js'));

let newUser;

beforeEach(async () => {
  newUser = new User({
    firstName: 'John',
    lastName: 'Doe',
    email: 'jdoe@test.com',
    password: '1234',
    phone: '1234567890',
  });
  await newUser.save();
});
afterEach(async () => {
  await newUser.destroy();
});
describe('user routes', () => {
  describe('POST /api/users/auth', () => {
    test('with valid credentials, it returns a token', async () => {
      const response = await app
        .post('/api/user/auth')
        .send({ email: 'jdoe@test.com', password: '1234' });
      const { id } = await User.findOne({
        where: { lastName: 'Doe', firstName: 'John' },
      });
      const token = await jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
      expect(response.status).toBe(200);
      expect(response.body.token).toBe(token);
    });
    test('with invalid credentials, it throws an error', async () => {
      const response = await app
        .post('/api/user/auth')
        .send({ email: 'notRight', password: 'alsoWrong' });
      expect(response.status).toBe(401);
    });
  });
});
