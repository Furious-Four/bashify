const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const request = require('supertest')
const {
  models: { Drink },
} = require('../../server/db/index.js');
const router = require('../../server/api/drink') 


beforeAll(async () => {
  await Drink.create({
    name: 'cocktail',
    price: 12.00,
    brand: null,
    type: null,
    amount: null,
  });
});

let drink;
beforeEach(async () => {
  drink = await Drink.findOne();
});

describe('Drink properties', () => {
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


describe('Drink routes', () => {
  describe('POST /api/drinks', () => {
    it('creates new drink', async() => {
      try {
        const res = await request(router)
          .post('/')
          .send({
            name: 'mojito',
            price: 15.00,
            brand: null, 
            type: null,
            ammount: null
          })
          console.log(res)
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty('post')
      }
      catch (ex) {
        console.log(ex)
      }
    });
  });
});