const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');

const {
  models: { PickUpLocation },
} = require('../../server/db/index.js');
const Venue = require('../../server/db/models/Venue.js');

beforeAll(async () => {
  await PickUpLocation.create({ name: 'testName' });
});

describe('PickUpLocation Attributes', () => {
  let pickup;
  beforeEach(async () => {
    pickup = await PickUpLocation.findOne();
  });
  describe('Attribute: instructions', () => {
    test('gives the user directions', () => {
      expect(pickup.instructions).toBeTruthy;
    });
  });
  describe('Associated to Venue', () => {
    test('has venueId', () => {
      expect(pickup.venueId).toBeTruthy;
    });
  });
});
