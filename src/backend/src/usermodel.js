const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('UserModel', {
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Company: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true, // Ensure email is unique
    },
    Message: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    // Other model options here
  });
  

  module.exports = User;
