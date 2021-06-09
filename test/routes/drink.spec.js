const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Drink },
} = require('../../server/db/index.js');
const app = require('supertest')(require('../../server/app.js'));


let drink;
beforeAll(async () => {
    drink = new Drink({
        name: 'mojito',
        price: 15.00,
        brand: null, 
        type: null,
        ammount: null
    });
    await drink.save();
  });
  afterAll(async () => {
    await drink.destroy();
  });

describe('Drink routes', () => {
  describe('POST /api/drink', () => {
    test('creates new drink', async() => {
      const data = {
        name: 'test mojito',
        price: 15.00,
      };

      try {
        const response = await app.post('/api/drink').send(data)
        expect(response.body.name).toBe(data.name)
      }
      catch (ex) {
        console.log(ex)
      }

    });
  });
    describe('PUT /api/drinks/:id', () => {
    test('updates single drink by id', async() => {
      try {
        const response = await app
          .put(`/api/drink/${drink.id}`)
          .send({
            name: 'mojito',
            price: 20.00,
            brand: null, 
            type: null,
            ammount: null
          })
        expect(response.body.price).toEqual(20.00);
      }
      catch (ex) {
        console.log(ex)
      }
    });
  });
});