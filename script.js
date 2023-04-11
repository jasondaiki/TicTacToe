
const playerX = document.getElementById("x")
const playerO = document.getElementById("o")
const cells = document.querySelectorAll(".cell");
const newGame = document.getElementById("resetButton")
const playerModal = document.getElementById("playermodal")
const gameBoard = document.getElementById("game-board")
const undoButton = document.getElementById("undo")
const redoButton = document.getElementById("redo")
let player = "X"
let board = [
	["", "", ""],
	["", "", ""],
	["", "", ""]
];
let gameOver = false;
let moves = [];
let currentMoveIndex = -1;




playerX.addEventListener("click", () => {
    playerModal.style.visibility = "hidden"
    newGame.style.visibility = "visible"
    gameBoard.style.visibility = "visible"
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (!gameOver && cell.innerHTML === "") {
                let row = cell.id[0];
                let col = cell.id[1];
                moves.splice(currentMoveIndex + 1, moves.length - currentMoveIndex - 1, { row, col, player });
                currentMoveIndex++;
                board[row][col] = player;
                cell.innerHTML = player;
                checkWin();
                player = player === "X" ? "O" : "X";
            }
        });
    });
})
playerO.addEventListener("click", () => {
    playerModal.style.visibility = "hidden"
    newGame.style.visibility = "visible"
    gameBoard.style.visibility = "visible"
    player = "O"
    cells.forEach(cell => {
        cell.addEventListener("click", () => {
            if (!gameOver && cell.innerHTML === "") {
                let row = cell.id[0];
                let col = cell.id[1];
                moves.splice(currentMoveIndex + 1, moves.length - currentMoveIndex - 1, { row, col, player });
                currentMoveIndex++;
                board[row][col] = player;
                cell.innerHTML = player;
                checkWin();
                player = player === "O" ? "X" : "O";
            }
        });
    });
})

undoButton.addEventListener("click", () => {
    redoButton.style.visibility = "visible"
    if (currentMoveIndex > -1) {
      let move = moves[currentMoveIndex];
      let cell = document.getElementById(move.row + move.col);
      cell.innerHTML = "";
      board[move.row][move.col] = "";
      currentMoveIndex--;
      player = move.player === "X" ? "O" : "X";
      gameOver = false;
    }
  });
  
  redoButton.addEventListener("click", () => {
    if (currentMoveIndex < moves.length - 1) {
      currentMoveIndex++;
      let move = moves[currentMoveIndex];
      let cell = document.getElementById(move.row + move.col);
      board[move.row][move.col] = move.player;
      cell.innerHTML = move.player;
      player = move.player === "X" ? "O" : "X";
    }
  });


newGame.addEventListener("click", resetGame);

function checkWin() {
	if (checkRows() || checkCols() || checkDiags()) {
        undoButton.style.visibility = "visible"
		gameOver = true;
		alert(player + " wins!");
	}
}

function checkRows() {
	for (let row = 0; row < 3; row++) {
		if (board[row][0] !== "" && board[row][0] === board[row][1] && board[row][1] === board[row][2]) {
			return true;
		}
	}
	return false;
}

function checkCols() {
	for (let col = 0; col < 3; col++) {
		if (board[0][col] !== "" && board[0][col] === board[1][col] && board[1][col] === board[2][col]) {
			return true;
		}
	}
	return false;
}

function checkDiags() {
    if (board[0][0] !== "" && board[0][0] === board[1][1] && board[1][1] === board[2][2]) {
    return true;
    }
    if (board[0][2] !== "" && board[0][2] === board[1][1] && board[1][1] === board[2][0]) {
    return true;
    }
    return false;
    }
    
    function resetGame() {
    playerModal.style.visibility = "visible"
    newGame.style.visibility = "hidden"
    player = "X"
    board = [
    ["", "", ""],
    ["", "", ""],
    ["", "", ""]
    ];
    gameOver = false;
    cells.forEach(cell => {
    cell.innerHTML = "";
    location.reload()
    });
    }