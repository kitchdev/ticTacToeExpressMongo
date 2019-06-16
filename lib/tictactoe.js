const move = (location, team, twoDArray) => {
  if (location > 9 || team.length > 1 || team.match(/XO/)) {
    throw new Error('Incorrect Input; move must be from 1 to 9 and team must be O or X')
  }

  const newMoveArray = twoDArray.map((line, i) => {
    let newLine
    if (location <= 3 && i === 0) {
      let mark = location - 1
      newLine = line.map((spot, i) => {
    
        if (spot === ' ' && i === mark) {
          const newSpot = spot[mark] = team
          return newSpot
        } else {
          return spot
        }
      })
      return newLine
    } else if (location > 3 && location <= 6 && i === 1) {
      let mark = location - 4
      newLine = line.map((spot, i) => {
        if (spot === ' ' && i === mark) {
          const newSpot = spot[mark] = team
          return newSpot
        } else {
          return spot
        }
      })
      return newLine
    } else if (location > 6 && location <= 9 && i === 2) {
      let mark = location - 7
      newLine = line.map((spot, i) => {
        if (spot === ' ' && i === mark) {
          const newSpot = spot[mark] = team
          return newSpot
        } else {
          return spot
        }
      })
      return newLine
    } else {
      return line
    }
  })
  return newMoveArray
}

module.exports = move
