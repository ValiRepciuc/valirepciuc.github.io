function typeWriter(yourInput, HTMLoutput){
    let index = 0;
    let isFull = false;

    function addLetter() {
        if (index < yourInput.length) {
            HTMLoutput.textContent += yourInput[index];
            index++;
            setTimeout(addLetter, 125); 
        }
        else{
            isFull = true;
            setTimeout(removeLastLetter, 2500);
        }
    }
    
    function removeLastLetter() {
        if (isFull && index > 1) {
            HTMLoutput.textContent = HTMLoutput.textContent.slice(0, -1);
            index--;
            setTimeout(removeLastLetter, 50);
        } else if (isFull && index === 1) {
            
            isFull = false;
            setTimeout(addLetter, 500); 
        }
    }
    
    addLetter();
}

function typeWriterMultipleWords(yourInput, HTMLoutput){
    let arrIndex = 0;
    let textIndex = 0;

    let isFull = true;

    let word = '';

    function addLetter(){
        if(textIndex < yourInput[arrIndex].length){
            HTMLoutput.textContent += yourInput[arrIndex][textIndex];
            textIndex++;
            setTimeout(addLetter, 125); 
        }
        else{
            isFull = false;
            setTimeout(removeLastLetter, 2000);
        }
    }

    function removeLastLetter(){
        if (!isFull && textIndex > 0){
            HTMLoutput.textContent = HTMLoutput.textContent.slice(0, -1);
            textIndex--;
            setTimeout(removeLastLetter, 100);
        }else if(!isFull && textIndex === 0){

            isFull = true;
            selectWord();
            setTimeout(addLetter, 500);
        }
    }
    function selectWord(){
        if (arrIndex < yourInput.length - 1) {
            arrIndex++;
        } else {
            arrIndex = 0;
        }
        textIndex = 0;
        word = yourInput[arrIndex]; 
        isFull = true; 
    }

    selectWord();
    addLetter();

}

const thirdRow = "JUNIOR FRONT-END DEVELOPER";
const headerText = document.querySelector('.js-third-row');
document.addEventListener('DOMContentLoaded', typeWriter(thirdRow, headerText));

const contactWriter = ["Let's get in touch!", "Got any ideas?"];
const contactText = document.querySelector('.js-typewriter-contact');
document.addEventListener('DOMContentLoaded', typeWriterMultipleWords(contactWriter, contactText));

const firstSix = document.querySelector('.first-six');
const lastFive = document.querySelector('.last-five');

firstSix.addEventListener('mouseenter', function() {
    this.style.animationPlayState = 'paused';
});

firstSix.addEventListener('mouseleave', function() {
    this.style.animationPlayState = 'running';
});

lastFive.addEventListener('mouseenter', function(){
    this.style.animationPlayState = 'paused';
})
lastFive.addEventListener('mouseleave', function(){
    this.style.animationPlayState = 'running';
})

