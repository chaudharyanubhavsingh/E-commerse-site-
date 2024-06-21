// db.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('shop', 'root', 'darkhunter', {
  host: 'localhost',
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Connected to MySQL'))
  .catch(err => console.error('Unable to connect to MySQL:', err.message));

module.exports = sequelize;
