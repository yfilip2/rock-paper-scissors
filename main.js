let pScore = 0;
let cScore = 0;
const pScoreDiv = document.querySelector('.player');
const cScoreDiv = document.querySelector('.computer');

let computerSelection;

function getComputerChoise() {
    let rand = Math.floor(Math.random() * 3) + 1;
    switch(rand) {
        case 1:
            return "Rock";
            break;
        case 2:
            return "Paper";
            break;
        case 3:
            return "Scissors"
            break;
    }
};

function victoryMessage(playerSelection){
    return `Round Won! ${playerSelection} beats ${computerSelection}`;
}

function defeatMessage(playerSelection){
    return `Round Lost: ${computerSelection} beats ${playerSelection}`;
}

function play(playerSelection,computerSelection){
    if(computerSelection.match(playerSelection) == computerSelection){
        return "Draw!"
    }else if ("Rock".match(playerSelection) == "Rock"){
        if (computerSelection == "Scissors"){
           return victoryMessage("Rock");
        }else if (computerSelection == "Paper"){
            return defeatMessage("Rock");
        }
    }else if ("Paper".match(playerSelection) == "Paper"){
        if (computerSelection == "Scissors") {
            return defeatMessage("Paper");
        }else if(computerSelection == "Rock"){
            return victoryMessage("Paper");
        }
    }else if ("Scissors".match(playerSelection) == "Scissors"){
        if(computerSelection == "Rock"){
            return defeatMessage("Scissors");
        }else if (computerSelection == "Paper"){
            return victoryMessage("Scissors");
        }
    }
}

function game(playerSelection) {
    const div = document.querySelector('.roundResult');
    let count = 0;
    computerSelection = getComputerChoise();
    result =  play(playerSelection,computerSelection);
    div.setAttribute('style', 'padding: 0;');  
    div.textContent = result;
    return result.charAt(6);
}

function updateScore(result) {
    if (result === 'W'){
        pScore++;
        pScoreDiv.textContent = pScore;
    } else if (result === 'L'){
        cScore++;
        cScoreDiv.textContent = cScore;
    }
    displayResult();
}

function displayResult() {
    let result = document.querySelector('.result');
    if (pScore === 5){
        result.textContent = "You Won! Congratulations!"
        disableButtons();
    } else if (cScore === 5){
        result.textContent = "You Lost... Better luck next time!"
        disableButtons();
    }
}

function buttonHandler(e){
    updateScore(game(e.target.childNodes[0].data));
}

function disableButtons() {
    buttons.forEach((button)=>{
        button.removeEventListener('click',buttonHandler);
    })
    displayReplay();
}

function displayReplay() {
    let replay = document.querySelector('.replay');
    replay.setAttribute('style', 'display:block;');
    replay.addEventListener('click',()=>{
        location.reload()
    });  
}

const buttons = document.querySelectorAll('button');
buttons.forEach((button) =>{
    button.addEventListener('click',buttonHandler)
})