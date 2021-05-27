const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Employee },
} = require('../../server/db/index.js');

beforeAll(async () => {
  await Employee.create({
      firstName: 'Billie',
      lastName: 'Gee',
      role: 'bartender',
      pin: 1234
  });
});

describe('Employee properties', () => {
    let employee;
    beforeEach(async ()=>{
        employee = await Employee.findOne()
    })
    describe('property: name', ()=> {
        test('name is Billie Gee', () => {
            expect(employee.firstName).toEqual('Billie') 
            expect(employee.lastName).toEqual('Gee') 
        })
    })
    describe('property: role', ()=> {
        test('role is bartender', () => {
            expect(employee.role).toEqual('bartender') 
        })
    })
    describe('property: pin', ()=> {
        test('pin is 1234', () => {
            expect(employee.pin).toEqual(1234) 
        })
    })
})
