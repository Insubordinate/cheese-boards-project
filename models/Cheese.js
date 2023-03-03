const {sequelize} = require('../db.js')
const {Sequelize,Model} = require('sequelize')

class Cheese extends Model{}


Cheese.init({title:Sequelize.STRING,descrition:Sequelize.STRING},{sequelize})

module.exports = {
    Cheese
}