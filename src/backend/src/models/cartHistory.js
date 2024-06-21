const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const User = require('../user');

const CartHistory = sequelize.define('CartHistory', {
  cartId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orderQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

CartHistory.belongsTo(User, { foreignKey: 'userId' });

module.exports = CartHistory;
