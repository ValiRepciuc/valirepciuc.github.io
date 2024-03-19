let score = JSON.parse(localStorage.getItem('score')) || 
{
     wins: 0,
     loses: 0,
     ties: 0
 };

updateScoreElement();
function updateScoreElement(){
 document.querySelector('.js-score').innerHTML = `Wins:${score.wins}, Loses:${score.loses}, Ties:${score.ties}`;
}
 function pickComputerMove(){
 
     let computerMove;
     const randomnumber = Math.random();

     if(randomnumber <= 1/3 && randomnumber >= 0){
         computerMove = 'rock';
     }
     else if ( randomnumber >= 1/3 && randomnumber <= 2/3){
         computerMove = 'paper';
     }
     else if ( randomnumber >= 2/3 && randomnumber <= 1){
         computerMove = 'scissors';
     }
     
     return computerMove;
 }

 function playGame(playerMove){
    
     const computerMove=pickComputerMove();
     let result='';

     if(playerMove === 'scissors'){

         if( computerMove === 'rock'){
             result = 'You lost!';
         }else if( computerMove === 'paper'){
             result = 'You won!';
         }
         else if ( computerMove === 'scissors'){
             result = 'Tie!';
         }
         
     }else if(playerMove === 'paper'){
         
         if( computerMove === 'rock'){
             result = 'You won!';
         }else if( computerMove === 'paper'){
             result = 'Tie!';
         }
         else if ( computerMove === 'scissors'){
             result = 'You lost!';
         }
     
     }else if(playerMove ==='rock'){    

         if( computerMove === 'rock'){
             result = 'Tie!';
         }else if( computerMove === 'paper'){
             result = 'You lost!';
         }
         else if ( computerMove === 'scissors'){
             result = 'You won!';
         }

     }

     if(result === 'You won!'){
         score.wins+=1;
     }else if(result === 'You lost!'){
         score.loses+=1;
    }else if(result === 'Tie!'){
         score.ties+=1;
    }
     
     localStorage.setItem('score', JSON.stringify(score));
     document.querySelector('.js-result').innerHTML = `${result}`;
     document.querySelector('.js-moves').innerHTML =`You
                                 <img src="icons/${playerMove}-emoji.png" class="game-button-icon">
                                 <img src="icons/${computerMove}-emoji.png" class="game-button-icon">
                                 Computer`;
     updateScoreElement();
 
 }
 
 function resetScore(){
     score.wins=0;
     score.loses=0;
     score.ties=0;

     localStorage.removeItem('score');
     updateScoreElement();
 }

document.querySelector('.js-reset-button').addEventListener('click', ()=>{
    document.querySelector('.js-confirm-reset').innerHTML = ` Are you sure you
                        want to reset the score? <button onclick="
                                    resetScore();
                                    document.querySelector('.js-confirm-reset').innerHTML = '';
                        "class ="yes-confirm-reset"> Yes </button>
                                                 <button onclick="
                                    document.querySelector('.js-confirm-reset').innerHTML = '';             
                                                 " class ="no-confirm-reset"> No </button>`
})

let isAutoPlaying = false;
let intervalId;


 function autoPlay(){
    if(!isAutoPlaying){
        intervalId = setInterval(() => {
            const playerMove = pickComputerMove();
            playGame(playerMove);
        }, 1000);
        isAutoPlaying = true;
    }
    else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
    
 }
const autoPlayButton = document.querySelector('.js-auto-play-button');
 document.querySelector('.js-auto-play-button').addEventListener('click', ()=>{
    
    if(autoPlayButton.innerHTML === 'Stop Play'){
        autoPlayButton.innerHTML = 'Auto Play';
    }
    else{
        autoPlayButton.innerHTML = 'Stop Play';
    }

    autoPlay();

})

 document.body.addEventListener('keydown', (event)=>{
    if(event.key === 'r' || event.key === 'R'){
        playGame('rock');
    }else if(event.key === 'p' || event.key === 'P'){
        playGame('paper');
    }
    else if(event.key === 's' || event.key === 'S'){
        playGame('scissors');
    }
    else if(event.key === 'a' || event.key === 'A'){
        if(autoPlayButton.innerHTML === 'Stop Play'){
            autoPlayButton.innerHTML = 'Auto Play';
        }
        else{
            autoPlayButton.innerHTML = 'Stop Play';
        }
    
        autoPlay();
    }
    else if(event.key ===' '){
        document.querySelector('.js-confirm-reset').innerHTML = ` Are you sure you
        want to reset the score? <button onclick="
                    resetScore();
                    document.querySelector('.js-confirm-reset').innerHTML = '';
        "class ="yes-confirm-reset"> Yes </button>
                                 <button onclick="
                    document.querySelector('.js-confirm-reset').innerHTML = '';             
                                 " class ="no-confirm-reset"> No </button>`
    }
    console.log(event.key);
 })

 document.querySelector('.js-rock-button').addEventListener('click', () =>{
    playGame('rock');
 });

 document.querySelector('.js-paper-button').addEventListener('click', () => {
    playGame('paper');
 })

 document.querySelector('.js-scissors-button').addEventListener('click', ()=>{
    playGame('scissors');
 })