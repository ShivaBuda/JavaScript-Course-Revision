"use strict";
// Select DOM Elements
const player1ScoreEl = document.querySelector(".score--0");
const player2ScoreEl = document.querySelector(".score--1");
const player1BoxEl = document.querySelector(".player--0");
const player2BoxEl = document.querySelector(".player--1");

const diceImgEl = document.querySelector(".dice-img");
const newGameBtnEl = document.querySelector(".btn__new-game");
const rollDiceBtnEl = document.querySelector(".btn__roll-dice");
const holdBtnEl = document.querySelector(".btn__hold");
const player1CurrentEl = document.querySelector(".current--0");
const player2CurrentEl = document.querySelector(".current--1");

// Add click event to button
newGameBtnEl.addEventListener("click", newGame);
rollDiceBtnEl.addEventListener("click", rollDice);
holdBtnEl.addEventListener("click", hold);

// Initial values
let scores, currentScore, activePlayer, playGame;

// Game functions
function switchPlayer() {
    currentScore = 0;
    document.querySelector(`.current--${activePlayer}`).textContent =
        currentScore;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player1BoxEl.classList.toggle("active-player");
    player2BoxEl.classList.toggle("active-player");
}
function newGame() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playGame = true;

    player1ScoreEl.textContent = scores[0];
    player2ScoreEl.textContent = scores[1];
    player1CurrentEl.textContent = currentScore;
    player2CurrentEl.textContent = currentScore;

    diceImgEl.classList.add("hidden");
    player1BoxEl.classList.add("active-player");
    player2BoxEl.classList.remove("active-player");
    player1BoxEl.classList.remove("bg--winner");
    player2BoxEl.classList.remove("bg--winner");
}

newGame();

function rollDice() {
    if (playGame) {
        let randomNum = Math.trunc(Math.random() * 6 + 1);
        diceImgEl.classList.remove("hidden");
        diceImgEl.src = `./img/face-${randomNum}.png`;

        if (randomNum !== 1) {
            currentScore += randomNum;
            document.querySelector(`.current--${activePlayer}`).textContent =
                currentScore;
        } else {
            switchPlayer();
        }
    }
}

function hold() {
    if (playGame) {
        scores[activePlayer] += currentScore;
        document.querySelector(`.score--${activePlayer}`).textContent =
            scores[activePlayer];

        if (scores[activePlayer] >= 20) {
            playGame = false;
            diceImgEl.classList.add("hidden");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.add("bg--winner");
            document
                .querySelector(`.player--${activePlayer}`)
                .classList.remove("active-player");
        } else {
            switchPlayer();
        }
    }
}

// Future project feature
// add number of win by a player!!!!
