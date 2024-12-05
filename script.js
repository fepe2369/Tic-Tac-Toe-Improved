let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameOver = false;

function handleClick(index) {
  if (board[index] || isGameOver) return;

  const cell = document.getElementById(`cell-${index}`);
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add("taken");

  if (checkWinner()) {
    document.getElementById("winner").textContent = `${currentPlayer} Wins!`;
    highlightWinner();
    isGameOver = true;
    return;
  }

  if (board.every(cell => cell)) {
    document.getElementById("winner").textContent = "It's a Draw!";
    isGameOver = true;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
}

function checkWinner() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], 
    [0, 3, 6], [1, 4, 7], [2, 5, 8], 
    [0, 4, 8], [2, 4, 6]
  ];

  for (const condition of winConditions) {
    const [a, b, c] = condition;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return condition;
    }
  }

  return null;
}

function highlightWinner() {
  const winnerCells = checkWinner();
  if (!winnerCells) return;

  for (const index of winnerCells) {
    document.getElementById(`cell-${index}`).classList.add("winner");
  }
}

function resetGame() {
  board = Array(9).fill(null);
  currentPlayer = "X";
  isGameOver = false;
  document.getElementById("winner").textContent = "";

  const cells = document.querySelectorAll(".cell");
  cells.forEach(cell => {
    cell.textContent = "";
    cell.className = "cell";
  });
}
