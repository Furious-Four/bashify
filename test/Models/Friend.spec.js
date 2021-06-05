const { describe, test, expect, beforeAll } = require('@jest/globals');
const {
  models: { Friendship, User },
} = require('../../server/db/index.js');

describe.only('Friendship properties', () => {
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
  describe('User methods related to friendships', () => {
    describe('addFriend()', () => {
      test('Can create a friend request by adding a friend', async () => {
        let friendship;
        try {
          await user.addFriend(friend);
          friendship = await Friendship.findOne({
            where: { userId: user.id, friendId: friend.id },
          });
        } catch (err) {
          console.error(err);
          expect(true).toBe(false);
        }
        expect(friendship.status).toBe('PENDING');
      });
    });
    describe('acceptFriend()', () => {
      test('Can accept a friend request that is pending', async () => {
        let friendship;
        try {
          await friend.acceptFriend(user);
          friendship = await Friendship.findOne({
            where: { userId: user.id, friendId: friend.id },
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
            where: { userId: friend.id, friendId: user.id },
          });
        } catch (err) {
          console.error(err);
          expect(true).toBe(false);
        }
        expect(friendship.status).toBe('ACCEPTED');
      });
    });
    describe('rejectFriend()', () => {
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
            where: { userId: friend2.id, friendId: user.id },
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
  describe('User <-> User assocations via Friendship table', () => {
    test('Users can be eager loaded with friendships', async () => {
      const testUser = await User.findByPk(user.id, {
        include: {
          model: User,
          as: 'friends',
        },
      });
      // console.log(testUser);
      const { friends } = testUser;
      // console.log(friends);
      expect(friends[0].id === testUser.id).toBe(false);
      expect(friends.length).toBe(2);
    });
  });
});
