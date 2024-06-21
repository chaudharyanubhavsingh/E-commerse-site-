const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const User = require('../user');

const OrderHistory = sequelize.define('OrderHistory', {
  orderId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  orderName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orderPrice: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  orderQuantity: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  orderDate: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  addressId: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
});

OrderHistory.belongsTo(User, { foreignKey: 'userId' });
module.exports = OrderHistory;
