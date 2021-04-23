
(async () => {
let url = 'https://olekskramarenko.github.io/jstask/list.json';
let response = await fetch(url);
let jsonList = await response.json(); 

let arrayOfLetters = [];
let  letters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ';
function getRandom(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
function findLetter() {
    let number = getRandom(0, letters.length-1)
    let letter = letters[number];
    return letter
};
function addLetterToArray() {
   while (arrayOfLetters.length < 5) {
       let newLetter = findLetter();
        if (!arrayOfLetters.includes(newLetter)) {
            arrayOfLetters.push(newLetter)
        }
   }
}
addLetterToArray();

let buttons = document.querySelectorAll('button');
for (let i = 0; i <buttons.length; i++) {
    buttons[i].textContent = arrayOfLetters[i]
};

let allBtnsArea = document.querySelector('.letters');
let allNamesArea = document.querySelector('.names');

allBtnsArea.addEventListener('click', function(evt){
    evt.preventDefault();
    let char = event.target.textContent;
    let matches = [];
    let length = jsonList.length;
    let fragment = document.createDocumentFragment();
    if (allNamesArea.textContent) {
        allNamesArea.textContent = '';
    }
    for (let i=0; i < length; i++) {
    if (jsonList[i]['name'].startsWith(char)) {
        fragment.textContent = jsonList[i]['name']+' | ';
        allNamesArea.appendChild(fragment);
        matches.push(jsonList[i]['name']);
    }     
}
    if (!matches.length) {
        let notFound = document.createElement('div');
        notFound.textContent = 'No matches found';
        notFound.style.color = 'red';
        allNamesArea.appendChild(notFound);
    }
});
})()

