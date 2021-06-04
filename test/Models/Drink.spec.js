const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Drink },
} = require('../../server/db/index.js');

beforeAll(async () => {
  await Drink.create({
    name: 'cocktail',
    price: 12.0,
    brand: null,
    type: null,
    amount: null,
  });
});

describe('Drink properties', () => {
  let drink;
  beforeEach(async () => {
    drink = await Drink.findOne();
  });
  describe('property: name', () => {
    test('cocktail', () => {
      expect(drink.name).toEqual('cocktail');
    });
  });
  describe('property: price', () => {
    test('price is $12', () => {
      expect(drink.price).toEqual(12.0);
    });
  });
  describe('property: brand', () => {
    test('brand can be null', () => {
      expect(drink.brand).toEqual(null);
    });
  });
});
