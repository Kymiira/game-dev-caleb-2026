let board = ['', '', '', '', '', '', '', '', ''];
let isGameActive = true;
const winningConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

function makeMove(index) {
    if (!isGameActive || board[index] !== '') return;
    
    board[index] = 'X';
    updateBoardUI();
    
    if (checkWin('X')) {
        document.getElementById('ttt-status').innerText = 'you win';
        isGameActive = false;
        return;
    }
    if (checkTie()) {
        document.getElementById('ttt-status').innerText = "tie";
        isGameActive = false;
        return;
    }

    document.getElementById('ttt-status').innerText = "opponents turn";
    
    setTimeout(aiMove, 500);
}

function aiMove() {
    if (!isGameActive) return;

    let move = findStrategicMove('O');
    if (move === -1) {
        move = findStrategicMove('X');
    }
    if (move === -1 && board[4] === '') {
        move = 4;
    }
    if (move === -1) {
        let emptyCells = [];
        for (let i = 0; i < board.length; i++) {
            if (board[i] === '') emptyCells.push(i);
        }
        if (emptyCells.length > 0) {
            move = emptyCells[Math.floor(Math.random() * emptyCells.length)];
        }
    }

    if (move !== -1) {
        board[move] = 'O';
        updateBoardUI();

        if (checkWin('O')) {
            document.getElementById('ttt-status').innerText = 'ai won';
            isGameActive = false;
            return;
        }
        if (checkTie()) {
            document.getElementById('ttt-status').innerText = "tied";
            isGameActive = false;
            return;
        }

        document.getElementById('ttt-status').innerText = 'your turn';
    }
}

function findStrategicMove(player) {
    for (let condition of winningConditions) {
        let [a, b, c] = condition;
        let line = [board[a], board[b], board[c]];
        if (line.filter(val => val === player).length === 2 && line.includes('')) {
            if (board[a] === '') return a;
            if (board[b] === '') return b;
            if (board[c] === '') return c;
        }
    }
    return -1;
}

function updateBoardUI() {
    let cells = document.getElementById('tictactoe-board').getElementsByTagName('td');
    for (let i = 0; i < board.length; i++) {
        cells[i].innerText = board[i];
    }
}

function checkWin(player) {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === player);
    });
}

function checkTie() {
    return board.every(cell => cell !== '');
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    isGameActive = true;
    document.getElementById('ttt-status').innerText = 'your turn';
    updateBoardUI();
}