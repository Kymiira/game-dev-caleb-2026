'use strict';
const playerNameOut = document.getElementById('playerNameOut');
const winsOut = document.getElementById('winsOut');
const bestOut = document.getElementById('bestOut');
const difficultySelect = document.getElementById('difficultySelect');
const triesRange = document.getElementById('triesRange');
const triesRangeOut = document.getElementById('triesRangeOut');
const hintsCheck = document.getElementById('hintsCheck');
const saveButton = document.getElementById('saveButton');
const rangeOut = document.getElementById('rangeOut');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const hintOut = document.getElementById('hintOut');
const triesProgress = document.getElementById('triesProgress');
const historyList = document.getElementById('historyList');
const newGameButton = document.getElementById('newGameButton');
const conceptList = document.getElementById('conceptList');
const difficultyMax = { easy: 10, medium: 50, hard: 100 };
const concepts = [
    { name: 'Variables', where: 'const page elements at the top, let player and let game for state' },
    { name: 'Input/Output', where: 'prompt(), confirm(), alert(), form inputs, <output>, <progress>, JSON download' },
    { name: 'Decisions', where: 'if / else if in Game.check(), switch in showHint() and labelFor(), ternaries in messages' },
    { name: 'Events', where: 'click on buttons, keydown for Enter, input and change on the settings' },
    { name: 'Objects', where: 'the difficultyMax lookup, plus the player and game objects made from the classes' },
    { name: 'Functions', where: 'startGame(), handleGuess(), showHint(), renderHistory() and more' },
    { name: 'Loops', where: 'while in askForName(), for in renderHistory() and Game.hasGuessed(), for...of in renderConcepts()' },
    { name: 'Arrays', where: 'game.guesses stores every guess, and concepts builds this list' },
    { name: 'Classes', where: 'Player and Game' }
];
class Player {
    constructor(name) {
        this.name = name;
        this.wins = 0;
        this.bestScore = null;
        this.difficulty = 'easy';
        this.maxTries = 7;
        this.hints = true;
    }

    recordWin(triesUsed) {
        this.wins++;
        if (this.bestScore === null || triesUsed < this.bestScore) {
            this.bestScore = triesUsed;
        }
    }

    toJSON() {
        return {
            name: this.name,
            wins: this.wins,
            bestScore: this.bestScore,
            difficulty: this.difficulty,
            maxTries: this.maxTries,
            hints: this.hints
        };
    }
}
class Game {
    constructor(max, maxTries) {
        this.min = 1;
        this.max = max;
        this.maxTries = maxTries;
        this.secret = Math.floor(Math.random() * max) + 1;
        this.guesses = [];
        this.over = false;
    }

    triesLeft() {
        return this.maxTries - this.guesses.length;
    }

    hasGuessed(value) {
        for (let i = 0; i < this.guesses.length; i++) {
            if (this.guesses[i].value === value) {
                return true;
            }
        }
        return false;
    }

    check(guess) {
        if (!Number.isInteger(guess) || guess < this.min || guess > this.max) {
            return 'invalid';
        }
        if (this.hasGuessed(guess)) {
            return 'repeat';
        }

        let result;
        if (guess === this.secret) {
            result = 'correct';
        } else if (guess < this.secret) {
            result = 'low';
        } else {
            result = 'high';
        }

        this.guesses.push({ value: guess, result: result });
        if (result === 'correct' || this.triesLeft() === 0) {
            this.over = true;
        }
        return result;
    }
}
let player = new Player('Player');
let game = new Game(difficultyMax.easy, 7);
function triesWord(count) {
    return count === 1 ? 'try' : 'tries';
}
function askForName() {
    let name = prompt('What is your name?', 'Player');
    while (name !== null && name.trim() === '') {
        name = prompt('Your name can\'t be empty. What is your name?', 'Player');
    }
    if (name === null) {
        name = 'Player';
    }
    return name.trim();
}
function startPage() {
    player.name = askForName();
    updateStats();
    startGame();
}
function startGame() {
    const max = difficultyMax[difficultySelect.value];
    game = new Game(max, Number(triesRange.value));

    rangeOut.textContent = `${game.min} to ${game.max}`;
    guessInput.min = game.min;
    guessInput.max = game.max;
    guessInput.value = '';
    guessInput.disabled = false;
    guessButton.disabled = false;
    hintOut.className = '';
    hintOut.textContent = 'Make a guess';

    renderHistory();
    updateProgress();
    guessInput.focus();

    console.log(`the secret number is ${game.secret}`);
}
function handleGuess() {
    if (game.over) {
        return;
    }

    const text = guessInput.value.trim();
    const guess = text === '' ? NaN : Number(text);
    const result = game.check(guess);

    showHint(result);

    if (result === 'invalid' || result === 'repeat') {
        guessInput.select();
        return;
    }

    console.log(`guess ${guess} was ${result}`);
    renderHistory();
    updateProgress();
    guessInput.value = '';
    guessInput.focus();

    if (game.over) {
        endGame(result === 'correct');
    }
}
function showHint(result) {
    const left = game.triesLeft();
    let message;

    switch (result) {
        case 'invalid':
            message = `Enter a whole number from ${game.min} to ${game.max}.`;
            break;
        case 'repeat':
            message = 'You already tried that one. Pick a different number.';
            break;
        case 'correct':
            message = 'You got it!';
            break;
        default:
            message = hintsCheck.checked ? `Too ${result}!` : 'Not it.';
            message += ` ${left} ${triesWord(left)} left.`;
    }

    hintOut.className = `hint-${result}`;
    hintOut.textContent = message;
}
function labelFor(result) {
    switch (result) {
        case 'correct':
            return 'correct!';
        case 'low':
            return hintsCheck.checked ? 'too low' : 'wrong';
        case 'high':
            return hintsCheck.checked ? 'too high' : 'wrong';
        default:
            return '';
    }
}
function renderHistory() {
    let html = '';
    for (let i = 0; i < game.guesses.length; i++) {
        const entry = game.guesses[i];
        html += `<li>${entry.value} - ${labelFor(entry.result)}</li>`;
    }
    historyList.innerHTML = html;
}
function updateProgress() {
    const left = game.triesLeft();
    triesProgress.max = game.maxTries;
    triesProgress.value = left;
    triesProgress.textContent = left;
    document.title = `Guess the Number - ${left} ${triesWord(left)} left`;
}
function updateStats() {
    playerNameOut.textContent = player.name;
    winsOut.textContent = player.wins;
    bestOut.textContent = player.bestScore === null ? '-' : player.bestScore;
}
function endGame(won) {
    guessInput.disabled = true;
    guessButton.disabled = true;

    const used = game.guesses.length;
    if (won) {
        player.recordWin(used);
        updateStats();
        hintOut.textContent = `You got it in ${used} ${triesWord(used)}!`;
    } else {
        hintOut.className = 'hint-lost';
        hintOut.textContent = `Out of tries. The number was ${game.secret}.`;
    }

    setTimeout(function () {
        if (won) {
            alert(`Nice one, ${player.name}! ${used} ${triesWord(used)}.`);
        }
        if (confirm('Play again?')) {
            startGame();
        }
    }, 100);
}
function savePlayer() {
    const json = JSON.stringify(player, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const safeName = player.name.replace(/[^a-z0-9_-]/gi, '_');

    const link = document.createElement('a');
    link.href = url;
    link.download = `${safeName}-player.json`;
    link.click();
    URL.revokeObjectURL(url);

    console.log('saved player:', json);
}
function renderConcepts() {
    for (const concept of concepts) {
        const item = document.createElement('li');
        const label = document.createElement('strong');
        label.textContent = `${concept.name}: `;
        item.appendChild(label);
        item.appendChild(document.createTextNode(concept.where));
        conceptList.appendChild(item);
    }
}
guessButton.addEventListener('click', handleGuess);
newGameButton.addEventListener('click', startGame);
saveButton.addEventListener('click', savePlayer);
guessInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleGuess();
    }
});
difficultySelect.addEventListener('change', function () {
    player.difficulty = difficultySelect.value;
    startGame();
});
triesRange.addEventListener('input', function () {
    triesRangeOut.textContent = triesRange.value;
});
triesRange.addEventListener('change', function () {
    player.maxTries = Number(triesRange.value);
    startGame();
});
hintsCheck.addEventListener('change', function () {
    player.hints = hintsCheck.checked;
    renderHistory();
});
renderConcepts();
setTimeout(startPage, 100);