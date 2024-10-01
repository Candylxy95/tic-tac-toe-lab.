/*-------------------------------- Constants --------------------------------*/
const squareEls = document.querySelectorAll(".sqr");
const messageEls = document.querySelector("#message");
const winningCombos = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [2, 4, 6],
  [0, 4, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];

/*---------------------------- Variables (state) ----------------------------*/
let board = ["", "", "", "", "", "", "", "", ""];
let turn = "X";
let winner = false;
let tie = false;
/*------------------------ Cached Element References ------------------------*/
const resetBtnEl = document.querySelector("#reset");
/*-------------------------------- Functions --------------------------------*/
function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  winner = false;
  tie = false;
  render();
  console.log("game has loaded");
}

function render() {
  updateBoard();
  updateMessage();
}

//makes sure the value stored in board array shows up corresponds board array with squareEls ID
function updateBoard() {
  board.forEach((element, index) => {
    squareEls[index].innerText = element;
  });
}

function updateMessage() {
  if (winner === false && tie === false) {
    messageEls.innerText = `it is ${turn}'s turn`;
  } else if (winner === false && tie === true) {
    messageEls.innerText = "it is a tie";
  } else {
    messageEls.innerText = `congrats! player ${turn} has won`;
  }
}

//when dquares are clicked, store the ID of the clicked square in sqIndx and store in Board Array
function handleClick(event) {
  if (event.target.classList.contains("sqr")) {
    const squareIndex = event.target.id;
    if (board[squareIndex] === "O" || board[squareIndex] === "X") {
      return;
    }
    placePiece(squareIndex);
    checkForWinner();
    checkForTie();
    switchPlayerTurn();
  } else {
    return;
  }
  render();
}

//store value received during players turn in board array
function placePiece(index) {
  board[index] = turn;
  console.log(board);
}

function checkForWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
    const [x, y, z] = winningCombos[i];
    if (board[x] !== "" && board[x] === board[y] && board[x] === board[z]) {
      winner = true;
      console.log(winner);
      console.log(x, y, z);
    }
  }
}

//access the number in each wining combo array
//if board[0] = board[1] = board[2] smoeone won

function checkForTie() {
  if (winner === true) {
    return;
  } else if (board.includes("")) {
    tie = false;
  } else tie = true;
  console.log(tie);
}

function switchPlayerTurn() {
  if (winner === true) {
    return;
  } else if (winner === false) {
    if (turn === "X") {
      turn = "O";
    } else if (turn === "O") {
      turn = "X";
    }
  }
}

/*----------------------------- Event Listeners -----------------------------*/

window.addEventListener("load", init);
document.querySelector(".board").addEventListener("click", handleClick);
resetBtnEl.addEventListener("click", init);
//board array
//if the square clicked has an id corresponding to the board index,
//implement the value of "turn"
