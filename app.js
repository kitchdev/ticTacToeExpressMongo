const express = require('express')
const path = require('path')
const mongoose = require('mongoose')
const app = express()
const port = 3000

const move = require('./routes/move')

app.use(express.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/src'));

app.get('/', async (req, res) => {
  res.sendFile(path.join(__dirname+'/src/index.html'));
}) 

app.get('/move', async (req, res) => move(req, res))

mongoose.Promise = global.Promise;
mongoose.set('useFindAndModify', false)
mongoose.connect("mongodb://localhost:27017/tictactoe", { useNewUrlParser: true });

app.listen(port, () => console.log(`app listening on port ${port}!`))
