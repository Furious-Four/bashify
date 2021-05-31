const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');

const {
  models: { Tab },
} = require('../../server/db/index.js');

beforeAll(async () => {
  await Tab.create({
    subTotal: 10.0,
  });
});

describe('Tab Attributes', () => {
  let tab;
  beforeEach(async () => {
    tab = await Tab.findOne();
  });
  describe('Attribute: status', () => {
    test('default status is open', () => {
      expect(tab.status).toEqual('open');
    });
  });
  describe('Attribute: tax', () => {
    test('default value is 9%', () => {
      expect(tab.tax).toEqual(0.9);
    });
  });
  describe('Attribute: tip', () => {
    test('default value is 20%', () => {
      expect(tab.tip).toEqual(0.2);
    });
  });
  // describe('Method: getTotal', () => {
  //   test('calculates total', () => {
  //     expect(tab.getTotal()).toEqual(12.09);
  //   });
  // });// need to fix this
});
