document.addEventListener("DOMContentLoaded", function() {
initWhaleGame();
});

function initWhaleGame() {
const list = document.getElementById("whale-list");
const whales = list.querySelectorAll("li");
const playButton = whales[6].querySelector("button");
const timer = whales[0];
const question = document.getElementById("question");
const answers = document.querySelectorAll(".answer-button");

whales[1].textContent = "Humpback";
whales[2].textContent = "Blue Whale";
whales[3].textContent = "Beluga";
whales[4].textContent = "Orca";
whales[5].textContent = "Sperm Whale";

document.getElementById("answers").style.visibility = "hidden";

playButton.addEventListener("click", function() {
    playButton.style.visibility = "hidden";

    shuffleWhales(whales);

    let targetPosition = Math.floor(Math.random() * 5) + 1;
    let targetWhale = whales[targetPosition].textContent;

    gameLoop(timer, whales, question, answers, targetWhale, targetPosition);
});

}

function shuffleWhales(whales) {
let names = [
"Humpback",
"Blue Whale",
"Beluga",
"Orca",
"Sperm Whale"
];

for (let i = names.length - 1; i > 0; i--) {
    let random = Math.floor(Math.random() * (i + 1));

    let temp = names[i];
    names[i] = names[random];
    names[random] = temp;
}

for (let i = 0; i < names.length; i++) {
    whales[i + 1].textContent = names[i];
}

}

function gameLoop(timer, whales, question, answers, targetWhale, targetPosition) {
let seconds = 0;

let countdown = setInterval(function() {
    seconds++;

    if (seconds == 1) {
        timer.textContent = "...";
    } else if (seconds == 2) {
        timer.textContent = "3";
    } else if (seconds == 3) {
        timer.textContent = "2";
    } else if (seconds == 4) {
        timer.textContent = "1";
    } else if (seconds == 5) {
        timer.textContent = "BEGIN";
        clearInterval(countdown);

        for (let i = 1; i <= 5; i++) {
            whales[i].textContent = "???";
        }

        question.textContent = "At what position was " + targetWhale + "?";
        document.getElementById("answers").style.visibility = "visible";

        guessLoop(timer, question, answers, targetPosition);
    }
}, 1000);

}

function guessLoop(timer, question, answers, targetPosition) {
let seconds = 0;

let timerLoop = setInterval(function() {
    seconds++;

    if (seconds >= 5) {
        clearInterval(timerLoop);

        timer.textContent = "INCORRECT";
        question.textContent = "Play again?";
        document.getElementById("answers").style.visibility = "hidden";

        document.querySelector("#whale-list li:last-child button").style.visibility = "visible";
    }
}, 1000);

for (let i = 0; i < answers.length; i++) {
    answers[i].onclick = function() {
        clearInterval(timerLoop);

        let guess = Number(answers[i].textContent);

        document.getElementById("answers").style.visibility = "hidden";

        if (guess == targetPosition) {
            timer.textContent = "CORRECT!";
            question.textContent = "You got it!";

            setTimeout(function() {
                location.reload();
            }, 10000);
        } else {
            timer.textContent = "INCORRECT";
            question.textContent = "Play again?";

            document.querySelector("#whale-list li:last-child button").style.visibility = "visible";
        }
    };
}

}