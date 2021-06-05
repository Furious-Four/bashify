const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Order },
} = require('../../server/db/index.js');

describe('Order properties', () => {
  beforeAll(async () => {
    await Order.create();
  });
  describe('Attributes', () => {
    let order;
    beforeEach(async () => {
      order = await Order.findOne();
    });
    describe('Attribute: status', () => {
      test('is a string', () => {
        expect(order.status).toBeTruthy();
        expect(typeof order.status).toBe('string');
      });
      test('default value is "ORDERING"', () => {
        expect(order.status).toBe('ORDERING');
      });
      test('only allows "ORDERING", "SUBMITTED", "ACCEPTED", "READY", or "COMPLETED"', async () => {
        try {
          await order.update({ status: 'test' });
          expect(false).toBe(true);
        } catch (err) {
          expect(err instanceof DatabaseError).toBe(true);
        }
      });
    });
    describe('Attribute: confirmationId', () => {
      test('is a string', () => {
        expect(order.confirmationId).toBeTruthy();
        expect(typeof order.confirmationId).toBe('string');
      });
      test('is six characters', () => {
        expect(order.confirmationId.length).toBe(6);
      });
    });
  });
});
