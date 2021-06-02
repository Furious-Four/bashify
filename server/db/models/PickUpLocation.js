const {
  Model,
  DataTypes: { STRING },
} = require('sequelize');
const db = require('../db');

class PickUpLocation extends Model {}
PickUpLocation.init(
  {
    name: {
      type: STRING,
      allowNull: false,
    },
    instructions: {
      type: STRING,
      defaultValue: 'Head to the bar to pick up your drink.',
    },
  },
  { sequelize: db, modelName: 'pickUpLocations' }
);
module.exports = PickUpLocation;
