// Game board (2D array)
let gameBoard = [
    ['', '', 'T', '', ''],
    ['M', '', '', 'T', ''],
    ['', 'T', 'M', '', ''],
    ['', '', '', 'M', ''],
    ['', 'M', '', '', 'D']
];

// Player object
let player = {
    x: 0, // Starting row
    y: 0, // Starting column
    health: 100,
    treasuresCollected: 0,
    inventory: [],
    move: function(direction) {
        // Move logic will be implemented here
        if (direction === 'up' && this.x > 0) {
            this.x--;
        } else if (direction === 'down' && this.x < 4) {
            this.x++;
        } else if (direction === 'left' && this.y > 0) {
            this.y--;
        } else if (direction === 'right' && this.y < 4) {
            this.y++;
        }
        checkInteractions();
        renderBoard();
        updatePlayerStats();
    },
    collectTreasure: function() {
        if (gameBoard[this.x][this.y] === 'T') {
            this.treasuresCollected++;
            gameBoard[this.x][this.y] = '';  // Remove the treasure
            document.getElementById('gameMessages').innerText = `Treasure collected! Treasures left: ${3 - this.treasuresCollected}`;
        }
    },
    fightMonster: function() {
        if (gameBoard[this.x][this.y] === 'M') {
            this.health -= 20; // Reduce health for monster encounter
            if (this.health <= 0) {
                document.getElementById('gameMessages').innerText = "Game Over! You landed on a monster.";
                disableMovement();
            }
        }
    }
};

// Function to render the game board
function renderBoard() {
    const board = document.getElementById('gameBoard');
    board.innerHTML = ''; // Clear the current board
    for (let i = 0; i < 5; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < 5; j++) {
            const cell = document.createElement('td');
            if (i === player.x && j === player.y) {
                cell.classList.add('player');
            }
            if (gameBoard[i][j] === 'T') {
                cell.classList.add('treasure');
            } else if (gameBoard[i][j] === 'M') {
                cell.classList.add('monster');
            } else if (gameBoard[i][j] === 'D') {
                cell.classList.add('door');
            }
            row.appendChild(cell);
        }
        board.appendChild(row);
    }
}

// Function to update player stats
function updatePlayerStats() {
    document.getElementById('playerStats').innerHTML = `
        Health: ${player.health} <br>
        Treasures Collected: ${player.treasuresCollected} <br>
        Inventory: ${player.inventory.join(', ') || 'None'}
    `;
}

// Function to handle player movement
function handleKeyPress(event) {
    if (event.key === 'ArrowUp') {
        player.move('up');
    } else if (event.key === 'ArrowDown') {
        player.move('down');
    } else if (event.key === 'ArrowLeft') {
        player.move('left');
    } else if (event.key === 'ArrowRight') {
        player.move('right');
    }
}

// Function to check interactions with treasures and monsters
function checkInteractions() {
    player.collectTreasure();
    player.fightMonster();

    // Check for game win condition (all treasures collected)
    if (player.treasuresCollected === 3) {
        document.getElementById('gameMessages').innerText = "Victory! All treasures collected!";
        disableMovement();
    }
}

// Disable player movement after game over or victory
function disableMovement() {
    document.removeEventListener('keydown', handleKeyPress);
}

// Event listener for keypresses
document.addEventListener('keydown', handleKeyPress);

// Initial setup
renderBoard();
updatePlayerStats();
