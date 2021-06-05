const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Menu },
} = require('../../server/db/index.js');

// beforeEach(async () => {
//   await Menu.create({
//       name: 'Dive Bar Lunch',
//       status: 'ACTIVE'
//   });
// });

// describe('Menu properties', () => {
//     let menu;
//     beforeEach(async ()=>{
//         menu = await Menu.findOne()
//     })
//     describe('property: name', ()=> {
//         test('menu name is Dive Bar Lunch', () => {
//             expect(menu.name).toEqual('Dive Bar Lunch')
//         })
//     })
//     describe('property: status', ()=> {
//         test('menu status is ACTIVE', () => {
//             expect(menu.status).toEqual('ACTIVE')
//         })
//     })
// })

beforeAll(async () => {
  //   await Menu.create({
  //       name: 'Dive Bar'
  //   });
});

describe('Menu properties', () => {
  let menu;
  beforeEach(async () => {
    menu = await Menu.findOne();
  });
  describe('property: name', () => {
    test('menu name is Night Menu', () => {
      expect(menu.name).toEqual('Night Menu');
    });
  });
});
