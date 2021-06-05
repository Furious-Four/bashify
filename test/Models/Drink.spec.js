const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Drink },
} = require('../../server/db/index.js');
const app = require('supertest')(require('../../server/app.js'));

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


describe('Drink routes', () => {
  describe('POST /api/drink', () => {
    test('creates new drink', async() => {
      try {
        const response = await app
          .post('/api/drink')
          .send({
            name: 'mojito',
            price: 15.00,
            brand: null, 
            type: null,
            ammount: null
          })
        console.log(response.body)
        expect(response.status).toBe(201);
        expect(response.body).toHaveProperty('post')
      }
      catch (ex) {
        console.log(ex)
      }
    });
  });
    // describe('PUT /api/drinks/:id', () => {
  //   test('updates single drink by id', async() => {
  //     try {
  //       const res = await app
  //         .put(`/api/drink/${drink.id}`)
  //         .send({

  //         })
  //       expect().toEqual();
  //     }
  //     catch (ex) {
  //       console.log(ex)
  //     }
  //   });
  // });
    // describe('DELETE /api/drinks/:id', () => {
  //   test('deletes single drink by id', async() => {
  //     try {
  //       const res = await app
  //         .destroy(`/api/drink/${drink.id}`)
  //         .send({

  //         })
  //       expect().toEqual();
  //     }
  //     catch (ex) {
  //       console.log(ex)
  //     }
  //   });
  // });
});