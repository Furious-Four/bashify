const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const {
  models: { Venue },
} = require('../../server/db/index.js');

describe('Venue properties', () => {
  let venue;
  beforeEach(async () => {
    venue = await Venue.findOne();
  });
  describe('property: name', () => {
    test('name is Furious Four Pub', () => {
      expect(venue.name).toEqual('Furious Four Pub');
    });
  });
  describe('property: type', () => {
    test('type is Pub', () => {
      expect(venue.type).toEqual('Pub');
    });
  });
  describe('property: email', () => {
    test('email is valid', () => {
      expect(venue.email).toEqual('furiousfourpub@email.com');
    });
  });
  describe('property: address', () => {
    test('address is valid', () => {
      expect(venue.address).toEqual('4 Furious Ave, NY, 00000');
    });
  });
  describe('property: state', () => {
    test('state is NY', () => {
      expect(venue.state).toEqual('NY');
    });
  });
  describe('property: website', () => {
    test('website is valid', () => {
      expect(venue.website).toEqual('www.furiousfourpub.com');
    });
  });
});
