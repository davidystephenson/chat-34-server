const db = require('../db')
const Sequelize = require('sequelize')

const Channel = db.define(
  'channel',
  {
    name: Sequelize.STRING
  }
)

module.exports = Channel
