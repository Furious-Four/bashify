require('dotenv').config();
const {
  Model,
  DataTypes: { STRING, VIRTUAL },
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const db = require('../db');

class User extends Model {
  static authenticate({ email, password }) {
    let id;
    return User.findOne({
      where: {
        email,
      },
    })
      .then((user) => {
        if (user) {
          id = user.id;
          return bcrypt.compare(password, user.password);
        }
        throw new Error('bad credentials');
      })
      .then((comparison) => {
        if (comparison) {
          const token = jwt.sign({ id }, process.env.ACCESS_TOKEN_SECRET);
          return token;
        }
        throw new Error('bad credentials');
      });
  }

  static byToken(token) {
    const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    return User.findByPk(id, {
      attributes: { exclude: ['password', 'createdAt', 'updatedAt'] },
      include: {
        model: User,
        as: 'friends',
      },
    }).then((user) => {
      if (user) return user;
      throw new Error('bad credentials');
    });
  }

  addFriend(friend) {
    const {
      models: { friendships },
    } = db;
    return friendships
      .findOne({ where: { userId: this.id, friendId: friend.id } })
      .then((friendship) => {
        if (friendship) {
          switch (friendship.status) {
            case 'PENDING':
              throw new Error('already requested');
            case 'ACCEPTED':
              throw new Error('already a friend');
            case 'REJECTED':
              throw new Error('rejected already');
          }
        }
        friendship = new friendships();
        friendship.userId = this.id;
        friendship.friendId = friend.id;
        return friendship.save();
      });
  }

  acceptFriend(friend) {
    const {
      models: { friendships },
    } = db;
    return friendships
      .findOne({
        where: { friendId: this.id, userId: friend.id },
      })
      .then((friendship) => {
        if (!friendship) throw new Error('no pending request');
        if (friendship.status !== 'PENDING')
          throw new Error('not a pending request');
        friendship.status = 'ACCEPTED';
        return friendship.save();
      })
      .then(() => {
        return friendships.findOrCreate({
          where: { userId: this.id, friendId: friend.id },
        });
      })
      .then(([friendship, bool]) => {
        if (bool) {
          friendship.userId = this.id;
          friendship.friendId = friend.id;
        }
        friendship.status = 'ACCEPTED';
        return friendship.save();
      });
  }

  rejectFriend(friend) {
    const {
      models: { friendships },
    } = db;
    return friendships
      .findOne({
        where: { friendId: this.id, userId: friend.id },
      })
      .then((friendship) => {
        if (!friendship) throw new Error('no pending request');
        if (friendship.status !== 'PENDING')
          throw new Error('not a pending request');
        friendship.status = 'REJECTED';
        return friendship.save();
      });
  }

  getFriends() {
    const {
      models: { users },
    } = db;
    return users
      .findByPk(this.id, {
        include: {
          model: users,
          as: 'friends',
        },
      })
      .then((user) => {
        return user.friends.filter(({ friendships }) => {
          return friendships.status === 'ACCEPTED';
        });
      });
  }

  getFriendRequests() {
    const {
      models: { users },
    } = db;
    return users
      .findByPk(this.id, {
        include: {
          model: users,
          as: 'friends',
        },
      })
      .then((user) => {
        return user.friends.filter(({ friendships }) => {
          return friendships.status === 'PENDING';
        });
      });
  }

  currentOrder() {
    const {
      models: { orders },
    } = db;

    return orders
      .findAll({
        where: { userId: this.id, status: 'ORDERING' },
        limit: 1,
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
      })
      .then(async (_orders) => {
        let mostRecentOrder = _orders[0];
        if (!mostRecentOrder) {
          mostRecentOrder = await orders.create();
          await this.addOrder(mostRecentOrder);
        }
        return orders.getWithDrinks(mostRecentOrder.id);
      });
  }

  currentTab() {
    const {
      models: { tabs },
    } = db;

    return tabs
      .findAll({
        where: { userId: this.id, status: 'open' },
        limit: 1,
        order: [['createdAt', 'DESC']],
        attributes: ['id'],
      })
      .then((_tabs) => {
        const mostRecentTab = _tabs[0];
        if (!mostRecentTab) {
          return null;
        } else return tabs.getWithDrinks(mostRecentTab.id);
      });
  }
}

//add beforeCreate hook to hash password when a user signs up using bcrypt.hash

User.init(
  {
    firstName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    lastName: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    fullName: {
      type: VIRTUAL,
      get() {
        return `${this.firstName} ${this.lastName}`;
      },
    },
    email: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        notEmpty: true,
      },
    },
    username: {
      type: STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: true,
      },
    },
    password: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    phone: {
      type: STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
      },
    },
    stripeId: {
      type: STRING,
    },
  },
  { sequelize: db, modelName: 'users' }
);

User.addHook('beforeSave', async (user) => {
  if (user._changed.has('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

User.addHook('beforeCreate', async (user) => {
  const customer = await stripe.customers.create({
    description: `Stripe customer for user ${user.id}`,
  });
  user.stripeId = customer.id;
});

module.exports = User;
