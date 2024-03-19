let miliseconds = 0;
let seconds = 0;
let minutes = 0;

const formatTime = (value) => {
    return value < 10 ? "0" + value : value;
};

let intervalId; 

const setIntervalFunction = () => {
    intervalId = setInterval(() => {
        miliseconds = miliseconds + 1;
        if (miliseconds === 99) {
            seconds = seconds + 1;
            miliseconds = 0;
        }
        if (seconds === 60) {
            minutes = minutes + 1;
            seconds = 0;
        }
        document.querySelector('.js-stop-watch').innerHTML = (formatTime(minutes) + ":" + formatTime(seconds) + "." + formatTime(miliseconds));
    }, 10);
};

const setClearIntervalFunction = () => {
    clearInterval(intervalId); 
};
let startButton = document.querySelector('.js-start-button');


startButton.addEventListener('click', ()=>{
    if(startButton.innerHTML === 'Start'){
        startButton.innerHTML = 'Stop';
        startButton.classList.add('stop-button');
        setIntervalFunction();
    }else if(startButton.innerHTML === 'Stop'){
        startButton.innerHTML = 'Start';
        startButton.classList.remove('stop-button');
        setClearIntervalFunction();
    }
});

document.querySelector('.js-reset-button').addEventListener('click', () =>{
    miliseconds = 0;
    seconds = 0;
    minutes = 0;
    document.querySelector('.js-stop-watch').innerHTML = (formatTime(minutes) + ":" + formatTime(seconds) + "." + formatTime(miliseconds));
});