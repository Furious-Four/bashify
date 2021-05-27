const {
    Model,
    DataTypes,
  } = require('sequelize');
  const db = require('../db');
  
class Employee extends Model {}

Employee.init(
{
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
    lastName: {
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
},
{ sequelize: db, modelName: 'employee' }
);
  
module.exports = Employee;