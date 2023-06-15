const Throws = [
    "rock",
    "paper",
    "scissors"
]

function getComputerChoice() {
    let compThrow = Throws[Math.floor(Math.random() * 3)];
    const compThrowText = document.querySelector(".compThrow");
    compThrowText.textContent = capitalizeFirstLetter(compThrow);
    return compThrow;
}

function playRound(playerSelection, computerSelection) {
    playerSelection = String(playerSelection).toLowerCase();
    let losingThrow  = (Throws.indexOf(playerSelection) + 1) > 2 ? 0 : (Throws.indexOf(playerSelection) + 1);
    let winningThrow = (Throws.indexOf(playerSelection) - 1) < 0 ? 2 : (Throws.indexOf(playerSelection) - 1);

    if(Throws.indexOf(computerSelection) == winningThrow) {
        wins++;
        return "You Win! " + capitalizeFirstLetter(playerSelection) + " beats " + capitalizeFirstLetter(computerSelection) + "!"
    }
    else if(Throws.indexOf(computerSelection) == losingThrow) {
        losses++;
        return "You Lose! " + capitalizeFirstLetter(playerSelection) + " loses to " + capitalizeFirstLetter(computerSelection)  + "!"
    }
    else if(Throws.indexOf(playerSelection) < 0) {
        alert("invalid input");
    }
    else {
        ties++;
        return "Tie!"
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function displayRoundResult(gameResult) {
    const resultText = document.createElement("p");
    resultText.classList.add("roundResult");
    resultText.textContent = gameResult;
    document.querySelector('.gameLogContainer').appendChild(resultText);
}

function displayFinalScore() {
    const finalText = document.createElement("p");
    let winText = wins != 1 ? " wins, " : " win, ";
    let lossText = losses != 1 ? " losses, " : " loss, ";
    let tieText = ties != 1 ? " ties!" : " tie!";

    finalText.classList.add("finalText");
    finalText.textContent = "Game Over! Final Score: " + wins + winText + losses + lossText + ties + tieText; 
    finalText.style.cssText = "font-size: 24px; font-weight:bold; text-align: center;"
    document.querySelector('body').appendChild(finalText);
}

function disableGame() {
    buttons.forEach((button) => {
        if(button.dataset.throw != null) {
            button.disabled = true;
        }
    });
}

function displayResetButton() {
    const restartButtonContainer = document.createElement("div");
    restartButtonContainer.classList.add("restartButtonContainer");
    restartButtonContainer.style.cssText = "display:flex; justify-content:center;";

    const restartButton = document.createElement("button");
    restartButton.classList.add("restartButton");
    restartButton.textContent = "Restart?";
    restartButtonContainer.appendChild(restartButton);
    document.querySelector('body').appendChild(restartButtonContainer);

    restartButton.addEventListener('click', () => {
        wins = 0;
        losses = 0;
        ties = 0;

        const compThrowText = document.querySelector(".compThrows");
        compThrowText.textContent = "..........."
        
        const toDelete = document.querySelectorAll(".resultText, .finalText, .restartButton, .restartButtonContainer")
        toDelete.forEach((e) => {
            e.parentElement.removeChild(e);
        });

        buttons.forEach((button) => {
            if(button.dataset.throw != null) {
                button.disabled = false;
            }
        });
    });
}

const MAX_WINS = 5;
let wins = 0;
let losses = 0;
let ties = 0;
let showFinalScored = 1;

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        let gameOver = !(wins < MAX_WINS && losses < MAX_WINS);

        if(!gameOver) {
            let gameResult = playRound(button.dataset.throw, getComputerChoice());
            displayRoundResult(gameResult);
        }

        if (gameOver && showFinalScored) {
            showFinalScored = 0;

            disableGame(buttons);
            displayFinalScore();
            displayResetButton(buttons);
        }
    });
});