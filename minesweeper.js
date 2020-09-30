document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
// This was my second attempted at writting this section, big change this seems better as I can change the number of cells on the board with more ese if needed. 

var board = {cells: []}
let size = 4
let difficulty = 0.3

function createBoard () {
  document.querySelector(".board").innerHtml = " "
  for (i =0; i < size; i++) {
    for (j =0; j < size; j++) {
      board.cells.push({
        row: i,
        col: j,
        hidden: true,
        isMine: Math.random() < difficulty
      })
    }
  }
}

// Board Restfuction bring the board back to first stage of the board funcation 

function resetBoard (){
  document.querySelector(".board").innerHTML = " ";
  board = {cells:[]}
  startGame()
}

function startGame () {
  createBoard();
  lib.initBoard()
  for (i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
  }
  document.addEventListener('click', checkForWin)
  document.addEventListener('contextmenu', checkForWin)
}

// Define this function to look for a win condition


// ensure that all of the cells that are not mines visible.

// Not all cells are mines. 

function checkForWin () {
  for (i = 0; i < board.cells.length; i++) {
  if (board.cells.isMine === true && board.cells.isMarked === true) {
    return lib.displayMessage('yay, you win!')
    } else if (board.cells.isMine === true && board.cells.isMarked !== true) {
      return
    } else if (board.cells.isMine !== true && board.cells.isMarked === true) {
      return
    }
  }
}

// function count the number of mines around the cell.


// intention to return cell objects as a array. then, Calculate amount `cell.isMine` when it is true.

function countSurroundingMines (cell) {
  var surroundingCells = lib.getSurroundingCells(cell.row, cell.col)
  let mineCount = 0
    surroundingCells.forEach(surCell => { 
    if (surCell.isMine === true) {
      mineCount++;
    }
  })
  return mineCount
}