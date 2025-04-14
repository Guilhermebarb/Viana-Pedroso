// backend/config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'better-sqlite3',
  storage: './backend/database/database.sqlite'
});

module.exports = sequelize;