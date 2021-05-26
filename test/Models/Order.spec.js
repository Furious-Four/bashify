const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const {
  models: { Order },
} = require('../../server/db/index.js');

beforeAll(async () => {
  await Order.create();
});
describe('Attributes', () => {
  let order;
  beforeEach(async () => {
    order = await Order.findOne();
  });
  describe('status', () => {
    test('is a string', () => {
      expect(order.status).toBeTruthy();
    });
    test('default value is "ORDERING"', () => {
      expect(order.status).toBe('ORDERING');
    });
    test('only allows ');
  });
});
