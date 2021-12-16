'use strict';

// Elements
const 
    scoreElem       = [document.querySelector("#score--0"), document.querySelector("#score--1")],
    currentElem     = [document.querySelector("#current--0"), document.querySelector("#current--1")],
    playerElem      = [document.querySelector(".player--0"), document.querySelector(".player--1")],
    diceElem        = document.querySelector(".dice"),
    btnNew          = document.querySelector(".btn--new"),
    btnRoll         = document.querySelector(".btn--roll"),
    btnHold         = document.querySelector(".btn--hold");

// Variables
let scores, currentScore, activePlayer, playing;

// Init function
function init() {
    scores = [0, 0];
    currentScore = 0;
    activePlayer = 0;
    playing = true;
    
    for(let i = 0; i < 2; i++) {
        scoreElem[i].textContent = scores[i];
        currentElem[i].textContent = currentScore;
        playerElem[i].classList.remove("player--winner", "player--active");
    }

    diceElem.classList.remove("shake");
    playerElem[activePlayer].classList.add("player--active");
}

// Switch player
function switchPlayer({ hold }) {
    if(hold) {
        scores[activePlayer] += currentScore;
        scoreElem[activePlayer].textContent = scores[activePlayer];

        if(scores[activePlayer] >= 100) {
            playerElem[activePlayer].classList.remove("player--active");
            playerElem[activePlayer].classList.add("player--winner");
            
            playing = false;
            return;
        }
    }

    currentScore = 0;
    currentElem[activePlayer].textContent = currentScore;

    // Change active player display
    playerElem.forEach(element => {
        element.classList.toggle("player--active");
    });

    activePlayer ^= 1;
};

// Dice roll
btnRoll.addEventListener("click", () => {
    if(playing) {
        // Generate random dice roll
        const diceRoll = Math.trunc(Math.random() * 6) + 1;

        diceElem.classList.add("shake");
        playing = false;

        // Display dice roll
        setTimeout(function() {
            diceElem.src = `dice-${diceRoll}.png`;
            diceElem.classList.remove("shake");

            // Update game using dice roll
            if(diceRoll !== 1) {
                currentScore += diceRoll;
                currentElem[activePlayer].textContent = currentScore;
            }
            else {
                switchPlayer({hold : false});
            }

            playing = true;
        }, 1000);
        
    }
});

btnHold.addEventListener("click", () => {
    if(playing) {
        switchPlayer({hold : true});
    }
});

btnNew.addEventListener("click", init);

init();
