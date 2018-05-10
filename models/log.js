var Sequelize = require('sequelize')
var sequelize = require('../config/connection.js')

var log = sequelize.define('log', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  date: {
    type: Sequelize.DATEONLY
  },
  time: {
    type: Sequelize.INTEGER
  },
  poop: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  pee: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  },
  milk_total: {
    type: Sequelize.INTEGER
  }
})

log.sync()

module.exports = log
