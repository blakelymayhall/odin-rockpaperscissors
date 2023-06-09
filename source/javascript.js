const Throws = [
    "rock",
    "paper",
    "scissors"
]

function getComputerChoice() {
    return Throws[Math.floor(Math.random() * 3)]
}

function playRound(playerSelection, computerSelection) {
    playerSelection = String(playerSelection).toLowerCase();
    let losingThrow  = (Throws.indexOf(playerSelection) + 1) > 2 ? 0 : (Throws.indexOf(playerSelection) + 1);
    let winningThrow = (Throws.indexOf(playerSelection) - 1) < 0 ? 2 : (Throws.indexOf(playerSelection) - 1);

    if(Throws.indexOf(computerSelection) == winningThrow) {
        return "You Win! " + playerSelection + " beats " + computerSelection + "!"
    }
    else if(Throws.indexOf(computerSelection) == losingThrow) {
        return "You Lose! " + playerSelection + " loses to " + computerSelection + "!"
    }
    else if(Throws.indexOf(playerSelection) < 0) {
        alert("invalid input");
    }
    else {
        return "Tie!"
    }
}

function game() {
    console.log(playRound(prompt("Enter a Throw:"), getComputerChoice()))
    console.log(playRound(prompt("Enter a Throw:"), getComputerChoice()))
    console.log(playRound(prompt("Enter a Throw:"), getComputerChoice()))
    console.log(playRound(prompt("Enter a Throw:"), getComputerChoice()))
    console.log(playRound(prompt("Enter a Throw:"), getComputerChoice()))
}