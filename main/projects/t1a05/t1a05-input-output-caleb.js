'use strict';
const playerNameOut = document.getElementById('playerNameOut');
const winsOut = document.getElementById('winsOut');
const bestOut = document.getElementById('bestOut');
const difficultySelect = document.getElementById('difficultySelect');
const triesRange = document.getElementById('triesRange');
const triesRangeOut = document.getElementById('triesRangeOut');
const hintsCheck = document.getElementById('hintsCheck');
const saveButton = document.getElementById('saveButton');
const fileInput = document.getElementById('fileInput');
const rangeOut = document.getElementById('rangeOut');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const hintOut = document.getElementById('hintOut');
const triesProgress = document.getElementById('triesProgress');
const historyList = document.getElementById('historyList');
const newGameButton = document.getElementById('newGameButton');
const copyButton = document.getElementById('copyButton');
const speakButton = document.getElementById('speakButton');
const thermoCanvas = document.getElementById('thermoCanvas');
const thermoCtx = thermoCanvas ? thermoCanvas.getContext('2d') : null;
const winDialog = document.getElementById('winDialog');
const dialogMsg = document.getElementById('dialogMsg');
const closeDialog = document.getElementById('closeDialog');
const difficultyMax = { easy: 10, medium: 50, hard: 100 };
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
        autoSave();
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
let player = loadSavedPlayer() || new Player('player');
let game = new Game(difficultyMax[player.difficulty] || 10, player.maxTries);
function autoSave() {
    localStorage.setItem('t1a05Player', JSON.stringify(player));
}
function loadSavedPlayer() {
    let saved = localStorage.getItem('t1a05Player');
    if (saved) {
        try {
            let data = JSON.parse(saved);
            let p = new Player(data.name || 'player');
            p.wins = data.wins || 0;
            p.bestScore = data.bestScore !== undefined ? data.bestScore : null;
            p.difficulty = data.difficulty || 'easy';
            p.maxTries = data.maxTries || 7;
            p.hints = data.hints !== undefined ? data.hints : true;
            return p;
        } catch (e) {
            return null;
        }
    }
    return null;
}
function triesWord(count) {
    return count === 1 ? 'try' : 'tries';
}
function askForName() {
    if (player.name && player.name !== 'player') {
        return player.name;
    }
    let name = prompt('what is your name?', 'player');
    while (name !== null && name.trim() === '') {
        name = prompt('your name can\'t be empty. what\'s your name?', 'player');
    }
    if (name === null) {
        name = 'player';
    }
    return name.trim();
}
function startPage() {
    player.name = askForName();
    difficultySelect.value = player.difficulty;
    triesRange.value = player.maxTries;
    triesRangeOut.textContent = player.maxTries;
    hintsCheck.checked = player.hints;
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
    hintOut.textContent = 'make a guess';
    renderHistory();
    updateProgress();
    drawThermo(0);
    guessInput.focus();
    autoSave();
    console.log(`the secret number is ${game.secret}`);
}
function playBeep(type) {
    try {
        let ctx = new (window.AudioContext || window.webkitAudioContext)();
        let osc = ctx.createOscillator();
        let gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.value = type === 'low' ? 150 : (type === 'high' ? 600 : 880);
        gain.gain.setValueAtTime(0.1, ctx.currentTime);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
}
function speakHint(text) {
    if ('speechSynthesis' in window) {
        let u = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(u);
    }
}
function drawThermo(val) {
    if (!thermoCtx) return;
    thermoCtx.clearRect(0, 0, thermoCanvas.width, thermoCanvas.height);
    thermoCtx.fillStyle = 'rgba(255,255,255,0.1)';
    thermoCtx.fillRect(60, 20, 30, 140);
    let ratio = val / game.max;
    let h = Math.max(10, Math.min(140, ratio * 140));
    thermoCtx.fillStyle = '#c77dff';
    thermoCtx.fillRect(60, 160 - h, 30, h);
}
function handleGuess() {
    if (game.over) {
        return;
    }
    const text = guessInput.value.trim();
    const guess = text === '' ? NaN : Number(text);
    const result = game.check(guess);
    showHint(result);
    playBeep(result);
    if (result === 'invalid' || result === 'repeat') {
        guessInput.select();
        return;
    }
    drawThermo(guess);
    console.log(`guess ${guess} was ${result}`);
    renderHistory();
    updateProgress();
    guessInput.value = '';
    guessInput.focus();
    autoSave();
    if (game.over) {
        endGame(result === 'correct');
    }
}
function showHint(result) {
    const left = game.triesLeft();
    let message;
    switch (result) {
        case 'invalid':
            message = `enter a whole number from ${game.min} to ${game.max}.`;
            break;
        case 'repeat':
            message = 'you already tried that one, pick a different number';
            break;
        case 'correct':
            message = 'you got it';
            break;
        default:
            message = hintsCheck.checked ? `too ${result}` : 'not it';
            message += ` ${left} ${triesWord(left)} left`;
    }
    hintOut.className = `hint-${result}`;
    hintOut.textContent = message;
    speakHint(message);
}
function labelFor(result) {
    switch (result) {
        case 'correct':
            return 'correct';
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
    document.title = `guess the number - ${left} ${triesWord(left)} left`;
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
        hintOut.textContent = `you got it in ${used} ${triesWord(used)}`;
        dialogMsg.textContent = `nice one, ${player.name}! you got it in ${used} ${triesWord(used)}.`;
    } else {
        hintOut.className = 'hint-lost';
        hintOut.textContent = `out of tries. the number was ${game.secret}.`;
        dialogMsg.textContent = `out of tries! the number was ${game.secret}.`;
    }
    autoSave();
    setTimeout(function () {
        if (winDialog && typeof winDialog.showModal === 'function') {
            winDialog.showModal();
        } else {
            if (won) alert(`nice one, ${player.name} ${used} ${triesWord(used)}`);
            if (confirm('want to play again?')) startGame();
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
function loadPlayerFile(event) {
    const file = event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            let data = JSON.parse(e.target.result);
            player.name = data.name || player.name;
            player.wins = data.wins || player.wins;
            player.bestScore = data.bestScore !== undefined ? data.bestScore : player.bestScore;
            player.difficulty = data.difficulty || player.difficulty;
            player.maxTries = data.maxTries || player.maxTries;
            player.hints = data.hints !== undefined ? data.hints : player.hints;
            difficultySelect.value = player.difficulty;
            triesRange.value = player.maxTries;
            triesRangeOut.textContent = player.maxTries;
            hintsCheck.checked = player.hints;
            updateStats();
            autoSave();
            startGame();
            console.log('loaded player from file:', data);
        } catch (err) {
            alert('invalid json file');
        }
    };
    reader.readAsText(file);
}
guessButton.addEventListener('click', handleGuess);
newGameButton.addEventListener('click', startGame);
saveButton.addEventListener('click', savePlayer);
if (fileInput) fileInput.addEventListener('change', loadPlayerFile);
if (closeDialog) {
    closeDialog.addEventListener('click', function() {
        if (winDialog) winDialog.close();
        startGame();
    });
}
if (copyButton) {
    copyButton.addEventListener('click', function() {
        let text = `t1a05 guess the number - player: ${player.name}, wins: ${player.wins}, best: ${player.bestScore || '-'}`;
        navigator.clipboard.writeText(text).then(() => {
            copyButton.textContent = 'copied!';
            setTimeout(() => copyButton.textContent = 'copy score', 1500);
        });
    });
}
if (speakButton) {
    speakButton.addEventListener('click', function() {
        speakHint(hintOut.textContent);
    });
}
if (thermoCanvas) {
    thermoCanvas.addEventListener('click', function(e) {
        if (game.over) return;
        const rect = thermoCanvas.getBoundingClientRect();
        const y = e.clientY - rect.top;
        let ratio = 1 - (y - 20) / 140;
        ratio = Math.max(0, Math.min(1, ratio));
        let guessedVal = Math.round(ratio * (game.max - game.min) + game.min);
        guessInput.value = guessedVal;
        handleGuess();
    });
}
guessInput.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        handleGuess();
    }
});
difficultySelect.addEventListener('change', function () {
    player.difficulty = difficultySelect.value;
    autoSave();
    startGame();
});
triesRange.addEventListener('input', function () {
    triesRangeOut.textContent = triesRange.value;
});
triesRange.addEventListener('change', function () {
    player.maxTries = Number(triesRange.value);
    autoSave();
    startGame();
});
hintsCheck.addEventListener('change', function () {
    player.hints = hintsCheck.checked;
    autoSave();
    renderHistory();
});
setTimeout(startPage, 100);