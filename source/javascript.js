const Throws = [
    "rock",
    "paper",
    "scissors"
]

const MAX_WINS = 5;
let wins = 0;
let losses = 0;
let ties = 0;
let showFinalScored = 1;

const buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
    button.addEventListener('click', () => {
        playGame(button);
    });
});

function playGame(button) {
    let playerThrow = button.dataset.throw;
    let computerThrow = getComputerChoice();
    displayThrows(playerThrow, computerThrow);
    displayRoundResult(playRound(playerThrow, computerThrow));
    
    let gameOver = !(wins < MAX_WINS && losses < MAX_WINS);
    if (gameOver && showFinalScored) {
        showFinalScored = 0;

        disableGame();
        displayFinalScoreAndRestart();
    }
}

function getComputerChoice() {
    let compThrow = Throws[Math.floor(Math.random() * 3)];
    const compThrowText = document.querySelector(".compThrow");
    compThrowText.textContent = capitalizeFirstLetter(compThrow);
    return compThrow;
}

function displayThrows(playerSelection, computerSelection) {

    let firstTurn = !wins && !losses && !ties; // function executes prior to results increment

    if(firstTurn) {
        const middleSection = document.querySelector('.middle');

        const playerImg = document.createElement("img");
        playerImg.classList.add("playerImg");
        playerImg.src = "source/" + playerSelection + ".png";
        playerImg.alt = playerSelection;

        const compImg = document.createElement("img");
        compImg.classList.add("compImg");
        compImg.src = "source/" + computerSelection + ".png";
        compImg.alt = computerSelection;

        middleSection.appendChild(playerImg);
        middleSection.appendChild(compImg);
    }
    else {
        document.querySelector(".playerImg").src = "source/" + playerSelection + ".png";
        document.querySelector(".compImg").src = "source/" + computerSelection + ".png";
    }
}

function displayRoundResult(gameResult) {
    let countText;
    let count;
    let roundResultText;
    let firstTurn = wins + losses + ties == 1; // function executed after results increment

    switch (gameResult) {
        case 1:
            countText = document.querySelector(".wins");
            count = wins;
            roundResultText = "You Win!";
            break;
        case -1:
            countText = document.querySelector(".losses");
            count = losses;
            roundResultText = "You Lose!";
            break;
        case 0:
            countText = document.querySelector(".ties");
            count = ties;
            roundResultText = "Tie!";
            break;
    }
    countText.textContent = String(count);

    if(firstTurn) {
        const gameLogContainer = document.querySelector(".rightSide");
        const roundResult = document.createElement("p");
        roundResult.classList.add("roundResult");
        roundResult.textContent = roundResultText;
        gameLogContainer.appendChild(roundResult);
    }
    else {
        document.querySelector(".roundResult").textContent = roundResultText;
    }
}

function playRound(playerSelection, computerSelection) {
    
    let losingThrow  = (Throws.indexOf(playerSelection) + 1) > 2 ? 0 : (Throws.indexOf(playerSelection) + 1);
    let winningThrow = (Throws.indexOf(playerSelection) - 1) < 0 ? 2 : (Throws.indexOf(playerSelection) - 1);

    if(Throws.indexOf(computerSelection) == winningThrow) {
        wins++;
        return 1
    }
    else if(Throws.indexOf(computerSelection) == losingThrow) {
        losses++;
        return -1
    }
    else if(Throws.indexOf(playerSelection) < 0) {
        alert("invalid input");
    }
    else {
        ties++;
        return 0
    }
}

function disableGame() {
    buttons.forEach((button) => {
        if(button.dataset.throw != null) {
            button.disabled = true;
        }
    });
}

function displayFinalScoreAndRestart() {
    let winText = wins != 1 ? " wins, " : " win, ";
    let lossText = losses != 1 ? " losses, " : " loss, ";
    let tieText = ties != 1 ? " ties!" : " tie!";

    const finalText = document.createElement("p");
    finalText.classList.add("finalText");
    finalText.textContent = "Game Over! Final Score: " + wins + winText + losses + lossText + ties + tieText; 
    document.querySelector('.footer').appendChild(finalText);

    const restartButton = document.createElement("button");
    restartButton.classList.add("restartButton");
    restartButton.textContent = "Restart?";
    restartButton.addEventListener('click', restartGame);
    document.querySelector('.footer').appendChild(restartButton);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function restartGame() {
    wins = 0;
    losses = 0;
    ties = 0;
    showFinalScored = 1;

    let countText = document.querySelector(".wins");
    countText.textContent = "0";
    countText = document.querySelector(".losses");
    countText.textContent = "0";
    countText = document.querySelector(".ties");
    countText.textContent = "0";

    document.querySelector(".compThrow").textContent = "";

    const toDelete = document.querySelectorAll(".compImg, .playerImg, .roundResult, .finalText, .restartButton")
    toDelete.forEach((e) => {
        e.parentElement.removeChild(e);
    });

    buttons.forEach((button) => {
        if(button.dataset.throw != null) {
            button.disabled = false;
        }
    });
}