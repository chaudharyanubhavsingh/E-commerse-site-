const { DataTypes } = require('sequelize');
const sequelize = require('../../db');
const User = require('../user');
const Dress = sequelize.define('Dress', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    },
    link: {
      type: DataTypes.JSON,
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false
    },
    price: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
  
  module.exports = Dress;