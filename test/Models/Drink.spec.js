const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Drink },
} = require('../../server/db/index.js');


describe('Drink properties', () => {
  let drink;
  beforeEach(async () => {
    drink = await Drink.findOne();
  });
  describe('property: name', () => {
    test('Glenlivet', () => {
      expect(drink.name).toEqual(
        "The Glenlivet Founder's Reserve Scotch Whisky - Single Shot"
      );
    });
  });
  describe('property: price', () => {
    test('price is $7', () => {
      expect(drink.price).toEqual(7.0);
    });
  });
  describe('property: brand', () => {
    test('brand is Glenlivet', () => {
      expect(drink.brand).toEqual('Glenlivet');
    });
  });
});

