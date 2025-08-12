"use strict"
// Select DOM elements
const resetBtnEl = document.querySelector(".btn-reset");
resetBtnEl.addEventListener("click", resetGame);

const checkBtnEl = document.querySelector(".btn-check");
checkBtnEl.addEventListener("click", checkGuess);

const displayResultEl = document.querySelector(".display-result");
const inputEl = document.querySelector(".input-num");
const guessingMsgEl = document.querySelector(".guessing-msg");
const scoreEl = document.querySelector(".score");
const highScoreEl = document.querySelector(".high-score");
const bodyEl = document.querySelector("body");

// Initialize game variables
let randomNum = Math.trunc(Math.random() * 20 + 1); // Random number between 1 and 20
let guessMsg;
let guessNum = "";
let score = 20;
let highestScore = 0;

// Reset Game function
function resetGame() {
    // Reset display and variables to initial state
    score = 20;
    guessNum = "";
    displayResultEl.textContent = "?";
    inputEl.value = guessNum;
    guessingMsgEl.textContent = "Start guessing";
    scoreEl.textContent = score;
    bodyEl.style.backgroundColor = "darkslategray";
    randomNum = Math.trunc(Math.random() * 20 + 1);
    resetBtnEl.textContent = "Reset";
    checkBtnEl.disabled = false;
}

// Check guessing number function
function checkGuess() {
    guessNum = +inputEl.value;
    // Only check if input is provided
    // (guessNUm && score > 0 && score < 21)?? not working now. Will back again for this.
    if (guessNum && 0 < score) {
        guessMsg = "Enter positive number";
        // if (randomNum < +inputEl.value) {
        //     // Guess is too high
        //     guessMsg = "Too high";
        //     score--;
        // } else if (randomNum > +inputEl.value) {
        //     // Guess is too low
        //     guessMsg = "Too low";
        //     score--;
        // } else {
        //     // Correct guess
        //     guessMsg = "Correct";
        //     displayResultEl.textContent = randomNum;
        //     bodyEl.style.backgroundColor = "#269626";
        //     score > highestScore
        //         ? (highestScore = score)
        //         : (highestScore = highestScore);
        //     highScoreEl.textContent = highestScore;
        // }

        // Refactoring above code
        if (guessNum === randomNum) {
            // Correct guess
            guessMsg = "You guessed it Correct!!!";
            displayResultEl.textContent = randomNum;
            bodyEl.style.backgroundColor = "#269626";
            resetBtnEl.textContent = "Replay";

            // Get highest game score
            score > highestScore
                ? (highestScore = score)
                : (highestScore = highestScore);

            highScoreEl.textContent = highestScore;
            checkBtnEl.disabled = true;

            // Wrong guess
        } else if (guessNum !== randomNum) {
            // Check if score is greater than 0
            if (score > 1) {
                guessMsg = guessNum > randomNum ? "Too high" : "Too low";
                score--;
            } else {
                guessMsg = "You lost the game!!😥";
                resetBtnEl.textContent = "Replay";
                checkBtnEl.disabled = true;
                bodyEl.style.backgroundColor = "#962626ff";
                displayResultEl.textContent = randomNum;
                score = 0;
            }
        }

        // Update score and message on UI
        scoreEl.textContent = score;
        // guessingMsgEl.textContent = guessMsg;
    } else {
        guessMsg = "Input number between 1 to 20!";
    }
    guessingMsgEl.textContent = guessMsg;
}
