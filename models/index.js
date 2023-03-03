const {User} = require('./User')
const {Cheese} = require('./Cheese')
const {Board} = require('./Board')


User.hasMany(Board)
Board.belongsTo(User)



Board.belongsToMany(Cheese,{through:'BoardCheese'})
Cheese.belongsToMany(Board,{through:'BoardCheese'})

module.exports = {
    Cheese,
    User,
    Board,
}