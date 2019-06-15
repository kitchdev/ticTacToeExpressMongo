const mongoose = require('mongoose')

const tictacSchema = new mongoose.Schema({
  twoDArray: {
    type: [
      'Array'
    ]
  },
  game: String
})

const tictacMap = mongoose.model('TicTacToe', tictacSchema)

module.exports = tictacMap