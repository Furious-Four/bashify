const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Menu },
} = require('../../server/db/index.js');

beforeAll(async () => {
  await Menu.create({
      name: 'Dive Bar'
  });
});

describe('Menu properties', () => {
    let menu;
    beforeEach(async ()=>{
        menu = await Menu.findOne()
    })
    describe('property: name', ()=> {
        test('menu name is Dive Bar', () => {
            //console.log(menu)
            expect(menu.name).toEqual('Dive Bar') // is the menu name just the venue name?
        })
    })
})
