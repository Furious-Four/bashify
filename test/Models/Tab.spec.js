const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');

const {
  models: { Tab },
} = require('../../server/db/index.js');
const Venue = require('../../server/db/models/Venue.js');

beforeAll(async () => {
  await Tab.create({ subTotal: 10.0 });
});

describe('Tab Attributes', () => {
  let tab;
  beforeEach(async () => {
    tab = await Tab.findOne();
  });
  describe('Attribute: status', () => {
    test('default status is open', () => {
      expect(tab.status).toEqual('open');
    });
  });
  describe('Attribute: tax', () => {
    test('default value is 9%', () => {
      expect(tab.tax).toEqual(0.09);
    });
  });
  describe('Attribute: tip', () => {
    test('default value is 20%', () => {
      expect(tab.tip).toEqual(0.2);
    });
  });
  describe('Method: getTotal', () => {
    test('calculates total', () => {
      expect(tab.getTotal()).toEqual(12.9);
    });
  });
  describe('Association: User', () => {
    test('Tab is associated with a user', () => {
      expect(tab.userId).toBeTruthy;
    });
  });
  describe('Association: Venue', () => {
    test('Tab is associated with a venue', () => {
      expect(tab.venueId).toBeTruthy;
    });
  });
});
