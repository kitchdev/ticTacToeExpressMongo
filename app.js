const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const newMove = require('./tictactoe')

const TicTacToeMap = require('./model/tictactoeMap')
const isGameOver = require('./lib/gameOver')

const twoDArray = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' '],
]

let arrayId

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/src'));

app.get('/', async (req, res) => {
  console.log('req.body')
  res.sendFile(path.join(__dirname+'/src/index.html'));
}) 

app.get('/move', async (req, res) => {
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
})

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false)
mongoose.connect("mongodb://localhost:27017/tictactoe", { useNewUrlParser: true });

app.listen(port, () => console.log(`app listening on port ${port}!`))
