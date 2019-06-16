const newMove = require('../lib/tictactoe')
const isGameOver = require('../lib/gameOver')

const TicTacToeMap = require('../model/tictactoeMap')

const twoDArray = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
]

let arrayId

module.exports = async (req, res) => {
  const map = await TicTacToeMap.findOne({ game: true })
  const posistion = req.query.position
  const team = req.query.team
  const newGrid = newMove(posistion, team, map ? map.twoDArray : twoDArray)
  let moveRes = new TicTacToeMap({ twoDArray: newGrid, game: true })
  let saveRes
  if (!map) {
    saveRes = await moveRes.save()
  } else {
    map.twoDArray = newGrid
    saveRes = await TicTacToeMap.findOneAndUpdate({ game: true }, map)
  }
  arrayId = saveRes._id
  
  const gridRes = await TicTacToeMap.findById(arrayId)
  
  const xWinner = isGameOver(gridRes.twoDArray, 'X')
  const oWinner = isGameOver(gridRes.twoDArray, 'O')
  
  if (xWinner) {
    res.send('X is the winner, Continue to start again')
    await gridRes.remove()
  } else if (oWinner) {
    res.send('O is the winner, Continue to start again')
    await gridRes.remove()
  } else {
    res.send(gridRes.twoDArray)
  }
}
