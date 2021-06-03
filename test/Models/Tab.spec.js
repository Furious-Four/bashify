const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');

const {
  models: { Tab, TabDrink },
} = require('../../server/db/index.js');
const Venue = require('../../server/db/models/Venue.js');

beforeAll(async () => {
  await Tab.create({ subTotal: 10 });
  await TabDrink.create({ price: 8.0, quantity: 1 });
});

describe('Tab Attributes', () => {
  let tab;
  let drink;
  beforeEach(async () => {
    tab = await Tab.findOne();
    drink = await TabDrink.findOne();
    drink.tabId = tab.id;
    await drink.save();
    await tab.getSubTotal();
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
      expect(tab.getTotal()).toEqual(10.32);
    });
  });

  describe('Method: getSubTotal', () => {
    test('updates the subTotal property', async () => {
      expect(tab.subTotal).toEqual(8.0);
    });
  });

  describe('Association: User', () => {
    test('Tab is associated with a user', () => {
      expect(tab.userId).toBeTruthy;
    });
  });
  describe('Association: TabDrinks', () => {
    test('Tab is associated with tabDrinks', () => {
      expect(tab.tabDrinkId).toBeTruthy;
    });
  });
  describe('Association: TabDrinks', () => {
    test('TabDrinks belong to a Tab', () => {
      expect(drink.tabId).toEqual(tab.id);
    });
  });
  describe('Association: Venue', () => {
    test('Tab is associated with a venue', () => {
      expect(tab.venueId).toBeTruthy;
    });
  });
});
