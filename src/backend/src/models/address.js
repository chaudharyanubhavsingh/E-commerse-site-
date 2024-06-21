const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const User = require('../user');

const Address = sequelize.define('Address', {
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING,
    allowNull: false
  },
  streetAddress: {
    type: DataTypes.STRING,
    allowNull: false
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false
  },
  zipCode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  country: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

Address.belongsTo(User, { foreignKey: 'userId' });

module.exports = Address;
