const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');

const {
  models: { Drink, Tab, TabDrink },
} = require('../../server/db/index.js');
const Venue = require('../../server/db/models/Venue.js');

describe('Tab Attributes', () => {
  let tab;
  let drink;
  beforeAll(async () => {
    tab = await Tab.create({ subTotal: 10 });
    drink = await Drink.findOne();
    await tab.addDrink(drink, { through: { price: 8.0, quantity: 1 } });
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
    let tabDrink;
    beforeAll(async () => {
      const { tabDrinks } = await Tab.findByPk(tab.id, {
        include: { model: TabDrink },
      });
      tabDrink = tabDrinks[0];
      // console.log(tabDrinks);
      // console.log(tabDrink);
    });

    test('TabDrinks belong to a Drink', () => {
      expect(tabDrink.drinkId).toBe(drink.id);
    });
    test('TabDrinks belong to a Tab', () => {
      expect(tabDrink.tabId).toBe(tab.id);
    });
  });
  describe('Association: Venue', () => {
    test('Tab is associated with a venue', () => {
      expect(tab.venueId).toBeTruthy;
    });
  });
});
