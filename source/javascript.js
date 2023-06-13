const Throws = [
    "rock",
    "paper",
    "scissors"
]

function getComputerChoice() {
    return Throws[Math.floor(Math.random() * 3)]
}

function playRound(playerSelection, computerSelection) {
    gamesPlayed++;

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

const maxGames = 5;
let gamesPlayed = 0;
let wins = 0;
let losses = 0;
let ties = 0;

const buttons = document.querySelectorAll('button');
buttons.forEach((button) => {
    button.addEventListener('click', () => {
        if(gamesPlayed < maxGames) {
            let gameResult = playRound(button.dataset.throw, getComputerChoice());
            const resultText = document.createElement("p");
            resultText.classList.add("resultText");
            resultText.textContent = gameResult;
            resultText.style.cssText = "font-size: 24px; text-align: center;"
            document.querySelector('body').appendChild(resultText);
        }
        else {
            const finalText = document.createElement("p");
            finalText.classList.add("finalText");
            finalText.textContent = "Game Over! Final Score: " + wins + " wins, " + losses + " losses, " + ties + " ties!"; 
            finalText.style.cssText = "font-size: 24px; font-weight:bold; text-align: center;"
            document.querySelector('body').appendChild(finalText);
        }
    });
});

// todo 

// move the funciton to its own function for brevity
// win or wins depending if > 1 -- change the sumamry text
// flex box or margin the game over and the summary text so there is a gap between them. Bigger and bolder. 
// Add reset button
// gray out buttons when game is over, make unclickable
