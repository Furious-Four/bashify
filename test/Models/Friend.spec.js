const { describe, test, expect, beforeAll } = require('@jest/globals');
const {
  models: { Friendship, User },
} = require('../../server/db/index.js');

describe.only('Friend properties', () => {
  let user, friend;
  beforeAll(async () => {
    user = await User.create({
      firstName: 'Garrus',
      lastName: 'Vakarian',
      username: 'Archangel',
      email: 'gvakarian@csec.net',
      password: '1e5GBHjeanrk34269gs!!j',
      phone: '5556668989',
    });
    friend = await User.create({
      firstName: 'Thane',
      lastName: 'Krios',
      username: 'agentKrios',
      email: 'agentK@kahje.net',
      password: 'asdnAA3!w4j1!lkn51345',
      phone: '2345245678',
    });
  });
  describe('User.addFriend()', () => {
    test('Can create a friend request by adding a friend', async () => {
      let friendship;
      try {
        await user.addFriend(friend);
        friendship = await Friendship.findOne({
          where: { friend1: user.id, friend2: friend.id },
        });
      } catch (err) {
        console.error(err);
        expect(true).toBe(false);
      }
      expect(friendship.status).toBe('PENDING');
    });
  });
  describe('User.acceptFriend()', () => {
    test('Can accept a friend request that is pending', async () => {
      let friendship;
      try {
        await friend.acceptFriend(user);
        friendship = await Friendship.findOne({
          where: { friend1: user.id, friend2: friend.id },
        });
      } catch (err) {
        console.error(err);
        expect(true).toBe(false);
      }
      expect(friendship.status).toBe('ACCEPTED');
    });
    test('Accepting a friend request creates a second frienship for the reverse assocation', async () => {
      let friendship;
      try {
        friendship = await Friendship.findOne({
          where: { friend1: friend.id, friend2: user.id },
        });
      } catch (err) {
        console.error(err);
        expect(true).toBe(false);
      }
      expect(friendship.status).toBe('ACCEPTED');
    });
  });
  describe('User.rejectFriend()', () => {
    let friend2;
    beforeAll(async () => {
      friend2 = await User.create({
        firstName: 'Chloe',
        lastName: 'Michel',
        username: 'drMichel',
        email: 'michelMD@citadel.gov',
        password: '!w4j1!lkn51345asdf',
        phone: '5568985423',
      });
      await friend2.addFriend(user);
    });
    test('Can reject a friend request that is pending', async () => {
      let friendship;
      try {
        await user.rejectFriend(friend2);
        friendship = await Friendship.findOne({
          where: { friend1: friend2.id, friend2: user.id },
        });
      } catch (err) {
        console.error(err);
        expect(true).toBe(false);
      }
      expect(friendship.status).toBe('REJECTED');
    });
    test('Users cannot request a friend again after being rejected', async () => {
      try {
        await friend2.addFriend(user);
        expect(true).toBe(false);
      } catch (err) {
        expect(true).toBe(true);
      }
    });
    test("BUT, users can add a friend that they've previously rejected", async () => {
      try {
        await user.addFriend(friend2);
        expect(true).toBe(true);
      } catch (err) {
        expect(true).toBe(false);
      }
    });
  });
});
