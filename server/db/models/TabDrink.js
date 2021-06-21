const {
  Model,
  DataTypes: { INTEGER, FLOAT, UUID, UUIDV4 },
  ENUM,
} = require('sequelize');
const db = require('../db');

class TabDrink extends Model {}
TabDrink.init(
  {
    id: {
      type: UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    quantity: {
      type: INTEGER,
    },
    price: {
      type: FLOAT,
    },
    status: {
      type: ENUM(
        'REQUESTED-OUTBOUND',
        'REQUESTED-INCOMING',
        'REJECTED',
        'ACCEPTED',
        'NO REQUEST'
      ),
      defaultValue: 'NO REQUEST',
    },
    associatedTabDrinkId: {
      type: UUID,
      defaultValue: null,
    },
  },
  { sequelize: db, modelName: 'tabDrinks' }
);

module.exports = TabDrink;
