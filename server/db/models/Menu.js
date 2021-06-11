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
    type: DataTypes.STRING,
    allowNull: false,
    validate: { 
        notEmpty: true,
    },
}, 
status: {
    type: DataTypes.ENUM('ACTIVE', 'INACTIVE'),
    defaultValue: 'ACTIVE',
    allowNull: false
}
},
{ sequelize: db, modelName: 'menu' }
);
  
  module.exports = Menu;