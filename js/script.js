const playButton = document.querySelector('button');
let bombsPlacement = [];
let userTries = [];

playButton.addEventListener('click', function(){
    grid.innerHTML = '';
    bombsPlacement = [];
    userTries = [];
    console.clear();
    startNewGame();
    console.log(bombsPlacement);
});
    
    
function startNewGame(){
    const gridElement = document.getElementById('grid');
    const dificultySelector = document.getElementById('dificulty').value;

    let cellsNumber = 0;
    let cellsClass = "";

    if (dificultySelector == 1){
        cellsNumber = 100;
        cellsClass = "my_cell-one"
    } else if (dificultySelector == 2) {
        cellsNumber = 81;
        cellsClass = "my_cell-two"
    } else if (dificultySelector == 3){
        cellsNumber = 49;
        cellsClass = "my_cell-three"
    }

    for (let i = 1; i<=cellsNumber ; i++) {
        const newCell = createElement('div', cellsClass, i);
            newCell.addEventListener('click', function(){
                userTries.push(i)
                if (!bombsPlacement.includes(i)){
                    newCell.classList.toggle('my_selected');
                    console.log(i);
                } else {
                    newCell.classList.add('my_bomb');
                    alert("Sorry, you've lost! Yo pressed " + (userTries.length - 1) + " tiles before stepping on the bomb.");
                }
            });
        gridElement.appendChild(newCell);
    };

    generateBombs(1,cellsNumber,16);
};

/**
 * Function that creates a custom HTML element with the given tag and classes (as a string)
 *
 * @param {string} tagName The tag of the element to be created as a string.
 * @param {string} className The classes of the element to be created as a string.
 * @param {string} innerText Content inside the div cell.
 */
function createElement(tagName, className, innerText){
    const cellElement = document.createElement(tagName);
    cellElement.className = className;
    cellElement.innerText = innerText;
    return cellElement;
};

/**
 * Function that generates a random number (not secure) between two values, both included.
 *
 * @param minumNumber the included minium value of the random generated number range.
 * @param maximumNumber the included maximum value of the random generated number range
 * @returns A randomly generated number.
 */
function getRandomInt(minumNumber, maximumNumber){
    const randomNumber = Math.floor( Math.random() * ( maximumNumber - minumNumber +1) + minumNumber);
    return randomNumber;
}

/**
 * Function that generates an array of random unique numbers between two values (both included).
 *
 * @param minNum The minimum interval for the random generated numbers
 * @param maxNum The maximum interval for the random generated numbers
 * @param elements The number of elements to be generated
 * @returns The list of random unique generated numbers, or an empty array if it is not possibile to generate that amount of numbers within the given interval.
 */
function generateBombs( minNum, maxNum, elements){
    if ( (maxNum - minNum) < elements ){
        return [];
    }

    while (bombsPlacement.length < elements){
        const newRandomNumber = getRandomInt(minNum, maxNum);
        if (!bombsPlacement.includes(newRandomNumber)){
            bombsPlacement.push(newRandomNumber);
        }
    }

    return bombsPlacement;
}