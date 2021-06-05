const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Employee },
} = require('../../server/db/index.js');

beforeAll(async () => {
  //   await Employee.create({
  //     firstName: 'Billie',
  //     lastName: 'Gee',
  //     role: 'bartender',
  //     pin: 1234,
  //   });
});

describe('Employee properties', () => {
  let employee;
  beforeEach(async () => {
    employee = await Employee.findOne();
  });
  describe('property: name', () => {
    test('name is Eric P. Katz', () => {
      expect(employee.firstName).toEqual('Eric P.');
      expect(employee.lastName).toEqual('Katz');
    });
  });
  describe('property: role', () => {
    test('role is manager', () => {
      expect(employee.role).toEqual('Manager');
    });
  });
  describe('property: pin', () => {
    test('pin is 0000', () => {
      expect(employee.pin).toEqual(0);
    });
  });
});
