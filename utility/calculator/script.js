let calculation=localStorage.getItem('calculation') || '';
function resultOfCalculation(){
    document.querySelector('.js-show-result').innerHTML = `${calculation}`;

}

function updateCalculation(update){
    calculation+=update;
    localStorage.setItem('calculation', calculation);
    resultOfCalculation();
}

function equalCalculation(){
    calculation=eval(calculation);
    localStorage.setItem('calculation', JSON.stringify(calculation));
    resultOfCalculation();
}

function clearCalculation(){
    calculation='';
    localStorage.setItem('calculation', JSON.stringify(calculation));
    document.querySelector('.js-show-result').innerHTML = '';
}