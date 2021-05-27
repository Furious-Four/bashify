const {
    Model,
    DataTypes,
  } = require('sequelize');
  const db = require('../db');
  
class Menu extends Model {}

Menu.init(
{
id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    },
name: {
    type: DataTypes.STRING, // is menu name just venue name?
    allowNull: false,
    validate: { 
        notEmpty: true,
    },
}, 
},
{ sequelize: db, modelName: 'menu' }
);
  
  module.exports = Menu;