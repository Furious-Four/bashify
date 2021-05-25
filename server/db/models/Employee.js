const db = require("../db");
const { DataTypes } = require("sequelize");

const Employee = db.define("employee", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  lasName: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  role: {
    type: DataTypes.STRING
  },
  pin: {
    type: DataTypes.INTEGER
  }
});

module.exports = Employee;