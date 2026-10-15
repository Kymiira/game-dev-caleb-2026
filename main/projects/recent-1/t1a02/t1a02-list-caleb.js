document.addEventListener('DOMContentLoaded', () => {
    initWhaleGame();
});

function initWhaleGame() {
    const whaleList = document.getElementById('whale-list');
    const whales = whaleList.querySelectorAll('li');
    const playButton = whales[6].querySelector('button');
    const timer = whales[0];
    const question = document.getElementById('question');
    const answerButtons = document.querySelectorAll('.answer-button');
    whales[1].textContent = "Humpback";
    whales[2].textContent = "Blue Whale";
    whales[3].textContent = "Beluga";
    whales[4].textContent = "Orca";
    whales[5].textContent = "Sperm Whale";
    document.getElementById('answers').style.visibility = "hidden";
    question.textContent = "";
    playButton.addEventListener('click', () => {
        playButton.style.visibility = "hidden";
        shuffleWhales(whales);
        let targetPosition = Math.floor(Math.random() * 5) + 1;
        let targetWhale = whales[targetPosition].textContent;
        gameLoop(timer, whales, question, answerButtons, targetWhale, targetPosition);
    });
}

function shuffleWhales(whales) {
    let whaleNames = ["Humpback", "Blue Whale", "Beluga", "Orca", "Sperm Whale"];
    for (let i = whaleNames.length - 1; i > 0; i--) {
        let randomPosition = Math.floor(Math.random() * (i + 1));
        let temp = whaleNames[i];
        whaleNames[i] = whaleNames[randomPosition];
        whaleNames[randomPosition] = temp;
    }
    for (let i = 0; i < whaleNames.length; i++) {
        whales[i + 1].textContent = whaleNames[i];
    }
}

function gameLoop(timer, whales, question, answerButtons, targetWhale, targetPosition) {
    let initSec = 0;
    const initTimer = setInterval(() => {
        initSec++;
        switch (initSec) {
            case 1: timer.textContent = "..."; break;
            case 2: timer.textContent = "3"; break;
            case 3: timer.textContent = "2"; break;
            case 4: timer.textContent = "1"; break;
            case 5:
                timer.textContent = "BEGIN";
                clearInterval(initTimer);
                initSec = 0;
                for (let i = 1; i <= 5; i++) {
                    whales[i].textContent = "???";
                }
                question.textContent = `At what position was ${targetWhale}?`;
                document.getElementById('answers').style.visibility = "visible";
                guessLoop(timer, question, answerButtons, targetWhale, targetPosition);
                break;
        }
    }, 1000);
}

function guessLoop(timer, question, answerButtons, targetPosition) {
    let gameSec = 0;
    const gameTimer = setInterval(() => {
        gameSec++;
        if (gameSec >= 5) {
            clearInterval(gameTimer);
            timer.textContent = "INCORRECT";
            question.textContent = "Play again?";
            document.getElementById('answers').style.visibility = "hidden";
            recordHistory(targetPosition, false);
            const playButton = document.querySelector('#whale-list li:last-child button');
            playButton.style.visibility = "visible";
        }
    }, 1000);

    answerButtons.forEach((button) => {
        button.onclick = () => {
            clearInterval(gameTimer);
            let guess = Number(button.textContent);
            document.getElementById('answers').style.visibility = "hidden";
            if (guess == targetPosition) {
                timer.textContent = "CORRECT!";
                question.textContent = "You got it!";
                recordHistory(targetPosition, true);
                setTimeout(() => {
                    location.reload();
                }, 5000);
            } else {
                timer.textContent = "INCORRECT";
                question.textContent = "Play again?";
                recordHistory(targetPosition, false);
                const playButton = document.querySelector('#whale-list li:last-child button');
                playButton.style.visibility = "visible";
            }
        };
    });
}

function recordHistory(targetPos, isWin) {
    const historyList = document.getElementById('history-list');
    const placeholder = historyList.querySelector('.history-placeholder');
    if (placeholder) {
        placeholder.remove();
    }
    const newLi = document.createElement('li');
    newLi.textContent = isWin ? `Win! Position was ${targetPos}` : `Loss. Position was ${targetPos}`;
    newLi.style.backgroundColor = isWin ? 'var(--prim-color)' : 'var(--surf-color-2)';
    historyList.prepend(newLi);
}