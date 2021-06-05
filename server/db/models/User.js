const {
  Model,
  DataTypes: { STRING, VIRTUAL },
} = require('sequelize');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const db = require('../db');
require('dotenv').config();

class User extends Model {
  static authenticate({ email, password }) {
    let id;
    return new Promise((res, rej) => {
      User.findOne({
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
            res(token);
          }
          throw new Error('bad credentials');
        })
        .catch(() => {
          const error = new Error('bad credentials');
          error.status = 401;
          rej(error);
        });
    });
  }

  static byToken(token) {
    return new Promise((res, rej) => {
      const { id } = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
      User.findByPk(id)
        .then((user) => {
          if (user) res(user);
          throw new Error('bad credentials');
        })
        .catch(() => {
          const error = new Error('bad credentials');
          error.status = 401;
          rej(error);
        });
    });
  }

  addFriend(friend) {
    const {
      models: { friendships },
    } = db;
    return friendships
      .findOne({ where: { friend1: this.id, friend2: friend.id } })
      .then((friendship) => {
        if (friendship) {
          switch (friendship.status) {
            case 'PENDING':
              throw new Error('already requested');
              break;
            case 'ACCEPTED':
              throw new Error('already a friend');
              break;
            case 'REJECTED':
              throw new Error('rejected already');
              break;
          }
        }
        friendship = new friendships();
        friendship.friend1 = this.id;
        friendship.friend2 = friend.id;
        return friendship.save();
      });
  }

  acceptFriend(friend) {
    const {
      models: { friendships },
    } = db;
    return friendships
      .findOne({
        where: { friend2: this.id, friend1: friend.id },
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
          where: { friend1: this.id, friend2: friend.id },
        });
      })
      .then(([friendship, bool]) => {
        if (bool) {
          friendship.friend1 = this.id;
          friendship.friend2 = friend.id;
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
        where: { friend2: this.id, friend1: friend.id },
      })
      .then((friendship) => {
        if (!friendship) throw new Error('no pending request');
        if (friendship.status !== 'PENDING')
          throw new Error('not a pending request');
        friendship.status = 'REJECTED';
        return friendship.save();
      });
  }

  currentOrder() {
    const {
      models: { orders },
    } = db;
    return new Promise((res, rej) => {
      orders
        .findAll({
          where: { userId: this.id },
          limit: 1,
          order: [['createdAt', 'DESC']],
          attributes: ['id'],
        })
        .then(([mostRecentOrder]) => {
          return orders.getWithDrinks(mostRecentOrder.id);
        })
        .then((orderWithDrinks) => res(orderWithDrinks))
        .catch((err) => {
          console.error(err);
          rej(err);
        });
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
  },
  { sequelize: db, modelName: 'users' }
);

User.addHook('beforeSave', async (user) => {
  if (user._changed.has('password')) {
    user.password = await bcrypt.hash(user.password, 5);
  }
});

module.exports = User;
