const flipButton = document.querySelector('.js-flip')
const resetButton = document.querySelector('.js-reset');
let coinAnim = document.querySelector('.js-coin');

let score = JSON.parse(localStorage.getItem('score')) ||  {
    heads: 0,
    tails: 0
};
updateScore();

let result;

function updateScore(){
    document.querySelector('.js-result').innerHTML = `Heads: ${score.heads} Tails: ${score.tails}`;
}
function playGame(){

        flipButton.disabled = true;
        result = Math.random();

        coinAnim.style.animation = 'none';
        if(result < 0.5) {
            setTimeout(()=>{
                coinAnim.style.animation = 'spin-heads 3s forwards'
            }, 100)
            score.heads++;
        } 
        else{
            setTimeout(()=>{
                coinAnim.style.animation = 'spin-tails 3s forwards';
            },100)
            score.tails++;
        }
    setTimeout(()=>{
        updateScore();
        flipButton.disabled=false;
    }, 3000);
    localStorage.setItem('score', JSON.stringify(score));

}

flipButton.addEventListener('click', playGame);

const confirmReset = document.querySelector('.js-confirm-reset');

function resetScore(){
    confirmReset.innerHTML= `Are you sure you want to reset your score?
                        <div>
                            <button class="yes-confirm">Yes</button>
                            <button class="no-confirm">No</button>
                        </div>`
    document.querySelector('.yes-confirm').addEventListener('click',()=>{
        score.heads=0;
        score.tails=0;
        localStorage.removeItem('score');
        updateScore();
        confirmReset.innerHTML = ``;
    })

    document.querySelector('.no-confirm').addEventListener('click', ()=>{
        confirmReset.innerHTML = ``;
    })
}

resetButton.addEventListener('click', resetScore);

const bodyElement = document.querySelector('body');
bodyElement.addEventListener('keydown', (event)=>{
    if(event.key ===' '){
        playGame();
    }
});