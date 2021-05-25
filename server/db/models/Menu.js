const db = require("../db");
const { DataTypes } = require("sequelize");

const Menu = db.define("menu", {
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
});

module.exports = Menu;