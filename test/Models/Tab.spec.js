const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');

const {
  models: { Tab },
} = require('../../server/db/index.js');
const Venue = require('../../server/db/models/Venue.js');

beforeAll(async () => {
  await Tab.create();
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
    test('default value is 0%', () => {
      expect(tab.tax).toEqual(0.0);
    });
  });
  describe('Attribute: tip', () => {
    test('default value is 20%', () => {
      expect(tab.tip).toEqual(0.2);
    });
  });
});
