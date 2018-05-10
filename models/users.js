var Sequelize = require('sequelize')
var sequelize = require('../config/connection.js')

const User = sequelize.define('user', {
  username: Sequelize.STRING,
  birthday: Sequelize.DATE
})

sequelize.sync()
  .then(() => User.create({
    username: 'robert',
    birthday: new Date(1984, 3, 16)
  }))
  .then(robert => {
    console.log(robert.toJSON())
  })

module.exports = User
