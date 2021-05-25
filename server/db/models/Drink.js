const db = require("../db");
const { DataTypes } = require("sequelize");

const Drink = db.define("drink", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  brand: {
    type: DataTypes.STRING
  }, 
  type: {
    type: DataTypes.STRING
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true,
    }
  },
  amount: {
    type: DataTypes.INTEGER
  }
});

module.exports = Drink;
