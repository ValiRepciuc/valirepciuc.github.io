const cells = document.querySelectorAll('.cell');
const restartBtn = document.querySelector('.js-reset-game');
const gameText = document.querySelector('.js-text');
const gameText2 = document.querySelector('.js-text2');
const scoreTable = document.querySelector('.js-score-table');
const resetGameScore = document.querySelector('.js-reset-score');

let gameScore = JSON.parse(localStorage.getItem('gameScore')) || {
    xWins: 0,
    draws: 0,
    oWins: 0
};

updateScoreTable();
gameText.textContent = 'Press the table to start the game!'
const winConditions= [

    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

let options = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let running = false;

initializeGame();

function updateScoreTable() {
    scoreTable.textContent = `X wins: ${gameScore.xWins} | Draws: ${gameScore.draws} | O wins: ${gameScore.oWins}`;
}
function initializeGame(){

    cells.forEach(cell => cell.addEventListener('click', cellClicked));
    restartBtn.addEventListener('click', restartGame);
    running = true;

}

function cellClicked(){
    const cellIndex = this.getAttribute('cellIndex');

    if(options[cellIndex] != '' || !running) {
        return;
    }
    
    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index){

    options[index] = currentPlayer;
    cell.textContent = currentPlayer;
}

function changePlayer(){
    currentPlayer = (currentPlayer === 'X') ? 'O' : 'X';
    gameText.textContent = `${currentPlayer} turn`
}

function checkWinner(){
    let roundWon = false;

    for(let i = 0; i < winConditions.length; i++){

        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if(cellA === '' || cellB === '' || cellC === ''){
            continue;
        }
        if(cellA === cellB && cellB === cellC){
            roundWon = true;
            break;
        }

    }
    if(roundWon){
        gameText.textContent = `${currentPlayer} wins!`;
        gameText2.textContent = 'Press the Restart Game button to play another game!'
        if(currentPlayer === 'X'){
            gameScore.xWins++;
            updateScoreTable();
            localStorage.setItem('gameScore', JSON.stringify(gameScore));
        }
        else if(currentPlayer === 'O'){
            gameScore.oWins++;
            updateScoreTable();
            localStorage.setItem('gameScore', JSON.stringify(gameScore));
        }
        running = false;
    }
    else if(!options.includes('')){
        gameText.textContent = `Draw`
        gameText2.textContent = 'Press the Restart Game button to play another game!'
        gameScore.draws++;
        updateScoreTable();
        localStorage.setItem('gameScore', JSON.stringify(gameScore));
    }
    else{
        changePlayer();
    }
    
}

function restartGame(){

    currentPlayer = 'X';
    options = ['', '', '', '', '', '', '', '', ''];
    cells.forEach(cell => cell.textContent = '');
    running = true;
    gameText.textContent = 'Press the table to start the game!'
    gameText2.textContent = '';
}

function resetScoreButton(){
    gameScore.xWins = 0;
    gameScore.draws = 0;
    gameScore.oWins = 0;
    localStorage.removeItem('gameScore');
    updateScoreTable();
}

resetGameScore.addEventListener('click', resetScoreButton);