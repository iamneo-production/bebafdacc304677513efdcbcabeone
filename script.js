let currentPlayer = 'X';
let gameOver = false;

// Function to handle a player's move
function handleMove(cell) {
    if (!gameOver && cell.value === '') {
        cell.value = currentPlayer;
        cell.disabled = true;
        checkWin();
        togglePlayer();
    }
}

// Function to toggle the current player
function togglePlayer() {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    document.querySelector('.result').textContent = `Player ${currentPlayer}'s Turn`;
}

// Function to check for a win or a draw
function checkWin() {
    const cells = document.querySelectorAll('.btn');
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a].value && cells[a].value === cells[b].value && cells[a].value === cells[c].value) {
            document.querySelector('.result').textContent = `Player ${currentPlayer} Wins!`;
            gameOver = true;
            break;
        }
    }

    if (!gameOver && [...cells].every(cell => cell.value !== '')) {
        document.querySelector('.result').textContent = "It's a Draw!";
        gameOver = true;
    }
}

// Event listeners for cell clicks
const cells = document.querySelectorAll('.btn');
cells.forEach(cell => {
    cell.addEventListener('click', () => {
        handleMove(cell);
    });
});

// Event listener for the reset button
const resetButton = document.getElementById('reset');
resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.value = '';
        cell.disabled = false;
    });
    currentPlayer = 'X';
    gameOver = false;
    document.querySelector('.result').textContent = `Player ${currentPlayer}'s Turn`;
});