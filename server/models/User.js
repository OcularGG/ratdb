const { DataTypes } = require('sequelize');
const db = require('../db');

const User = db.define('User', {
  discordId: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

module.exports = User;