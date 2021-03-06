(async () => {
    let url = 'https://olekskramarenko.github.io/jstask/list.json';
    let response = await fetch(url);
    let jsonList = await response.json();

    let arrayOfLetters = [];
    let letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    function getRandom(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    function findLetter() {
        let number = getRandom(0, letters.length - 1)
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

    let options = document.querySelectorAll('option');
    for (let i = 1; i < options.length; i++) {
        options[i].textContent = arrayOfLetters[i-1];
    };

    let selectElement = document.querySelector('.letters');
    let allNamesArea = document.querySelector('.names');

    selectElement.onchange = function () {
        let char = this.value;
        let matches = [];
        let answers = allNamesArea.querySelectorAll('div');
        let length = jsonList.length;
        let fragment = document.createDocumentFragment();
        if (answers.length > 0) {
            answers.forEach(el => el.remove());
        }
        if ( char === 'Choose a letter') {
            return
        }
        for (let i = 0; i < length; i++) {
            if (jsonList[i]['name'].startsWith(char)) {
                let newName = document.createElement('div');
                newName.textContent = jsonList[i]['name'];
                fragment.appendChild(newName);
                matches.push(jsonList[i]['name']);
            }
        }
        if (matches.length) allNamesArea.appendChild(fragment);
        if (!matches.length) {
            let notFound = document.createElement('div');
            notFound.textContent = 'No matches found';
            notFound.style.color = 'red';
            allNamesArea.appendChild(notFound);
        }
    }
})()

