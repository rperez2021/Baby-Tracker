var Sequelize = require("sequelize");
var sequelize = require("../config/connection.js");

var burger = sequelize.define('burger', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  burger_name: {
    type: Sequelize.STRING,
    // validate: {
    //   len: [2, 20],
    //   isAlphanumeric: true
    // }
  },
  devoured: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
});

burger.sync();

module.exports = burger;