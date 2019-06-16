# ticTacToeExpressMongo


### Running and testing for the time being

---

**since the frontend isn't connected to the backend yet, we can run this app with the following steps**

* ensure mongodb is running on your local. ==> run `mongod` in terminal(if that doesn't work, perhaps install mongo and configure correctly)

* run node app.js in project root

* from here we can use postman or a browser to play the game by using the following url `localhost:3000/move?position=3&team=O`

---
_note that position is starting from the left of a tictactoe box - first line 1,2,3 second line 4,5,6 third line 7,8,9 and the team is either `X` or `O`_