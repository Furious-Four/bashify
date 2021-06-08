const { test, expect, beforeAll, beforeEach } = require('@jest/globals');
const { DatabaseError } = require('sequelize');
const bcrypt = require('bcrypt');
const {
  models: { User },
} = require('../../server/db/index.js');

describe('User properties', () => {
  let user;
  beforeEach(async () => {
    user = await User.findOne();
  });
  describe('property: name', () => {
    test('name is Arjan Mitra', () => {
      expect(user.firstName).toEqual('Arjan');
      expect(user.lastName).toEqual('Mitra');
    });
  });
  describe('property: email', () => {
    test('email is valid', () => {
      expect(user.email).toEqual('arjanmitra@email.com');
    });
  });
  describe('property: username', () => {
    test('username is valid', () => {
      expect(user.username).toEqual('arjanmitra');
    });
  });

  describe('property: password', () => {
    test('password is valid test password', async () => {
      expect(await bcrypt.compare('test', user.password)).toBe(true);
    });
  });
  describe('property: phone', () => {
    test('phone is valid', () => {
      expect(user.phone).toEqual('647-999-9999');
    });
  });
});
