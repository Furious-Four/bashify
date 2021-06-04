const { test, expect, beforeAll, afterAll } = require('@jest/globals');
const { db } = require('../server/db/index.js');

beforeAll(async () => {
  await db.sync();
});
afterAll(async () => {
  await db.close();
});
test('init test', () => {
  expect(1 + 1).toBe(2);
});
describe('Model Tests', () => {
  require('./Models/Order.spec');
  require('./Models/Menu.spec');
  require('./Models/Employee.spec');
  require('./Models/Drink.spec');
  require('./Models/Tab.spec');
  require('./Models/PickUpLocation.spec');
});
