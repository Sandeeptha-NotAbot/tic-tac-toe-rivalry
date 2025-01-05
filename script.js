let board = Array(9).fill(null);  // Initialize the board array
let currentPlayer = 'max';  // Max starts the game
const winningCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

const gameBoard = document.getElementById('game-board');
const statusDiv = document.getElementById('game-status'); // Status div for game status
const resetButton = document.getElementById('restartBtn'); // Reset button

// Initialize the game board
function renderBoard() {
  gameBoard.innerHTML = ''; // Clear previous cells
  board.forEach((cell, index) => {
    const cellDiv = document.createElement('div');
    cellDiv.className = 'cell';
    if (cell) cellDiv.classList.add(cell);  // Add the player class (max or lewis)
    cellDiv.addEventListener('click', () => handleMove(index));  // Add click event
    gameBoard.appendChild(cellDiv);
  });
}

// Handle player move
function handleMove(index) {
  if (board[index] || checkWinner()) return; // Prevent moves on taken cells or after game end
  board[index] = currentPlayer;
  currentPlayer = currentPlayer === 'max' ? 'lewis' : 'max'; // Switch players
  renderBoard();
  checkGameStatus();
}

// Check for a winner or draw
function checkGameStatus() {
  const winner = checkWinner();
  if (winner) {
    statusDiv.textContent = `${winner === 'max' ? 'Max Verstappen' : 'Lewis Hamilton'} wins!`;
  } else if (board.every(cell => cell)) {
    statusDiv.textContent = 'It\'s a draw!';
  } else {
    statusDiv.textContent = `${currentPlayer === 'max' ? 'Max Verstappen' : 'Lewis Hamilton'}'s turn`;
  }
}

// Check for winning combinations
function checkWinner() {
  for (const combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      return board[a];
    }
  }
  return null;
}

// Reset the game
resetButton.addEventListener('click', () => {
  board.fill(null);
  currentPlayer = 'max';
  statusDiv.textContent = `${currentPlayer === 'max' ? 'Max Verstappen' : 'Lewis Hamilton'}'s turn`;
  renderBoard();
});

// Initialize
renderBoard();
statusDiv.textContent = `${currentPlayer === 'max' ? 'Max Verstappen' : 'Lewis Hamilton'}'s turn`;
