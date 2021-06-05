const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
//const request = require('supertest')
const {
  models: { Drink },
} = require('../../server/db/index.js');
const app = require('supertest')(require('../../server/app.js'));


// beforeAll(async () => {
//   await Drink.create({
    // name: 'cocktail',
    // price: 12.00,
    // brand: null,
    // type: null,
    // amount: null,
//   });
// });

// let drink;

// beforeEach(async () => {
//   drink = await Drink.findOne();
// });

// afterAll(async () => {
//   await drink.destroy();
// });

let drink;

beforeAll(async () => {
  drink = new Drink({
    name: 'cocktail',
    price: 12.00,
    brand: null,
    type: null,
    amount: null,
  });
  await drink.save();
});
afterAll(async () => {
  await drink.destroy();
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