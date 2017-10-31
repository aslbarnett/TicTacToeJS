/* -+-+-+---------------------------------+-+-+-
VARIABLES
-+-+-+---------------------------------+-+-+- */

let currentPlayer;
let player1;
let player2;


let xArray = [];
let oArray = [];

const body = document.getElementById('body');
const entireBoard = document.getElementById('board');
const startScreenContainer = document.createElement('div');
const endScreenContainer = document.createElement('div');

const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');

/* -+-+-+---------------------------------+-+-+-
HELPER METHODS
-+-+-+---------------------------------+-+-+- */

// HELPER METHODS -- BOARD DISPLAY
function hideBoard() {
    entireBoard.style.display = 'none';
}

function showBoard() {
    entireBoard.style.display = 'block';
    player1 = new Player('player1', 'X');
    player2 = new Player('player2', 'O');
    currentPlayer = player1;
    turn(currentPlayer);
}

// HELPER METHODS -- START SCREEN
function createStartScreen(container) {
    container.className = 'screen screen-start';
    container.id = 'start';

    const startScreenHeader = document.createElement('header');
    const startScreenH1 = document.createElement('h1');
    startScreenH1.innerHTML = 'Tic Tac Toe';
    const startScreenLink = document.createElement('a');
    startScreenLink.href = '#';
    startScreenLink.className = 'button';
    startScreenLink.innerHTML = 'Start game';
    startScreenLink.addEventListener('click', function() {
        hideStartScreen();
        showBoard();
    });

    startScreenHeader.appendChild(startScreenH1);
    startScreenHeader.appendChild(startScreenLink);
    container.appendChild(startScreenHeader);
}

function showStartScreen() {
    body.appendChild(startScreenContainer);
}

function hideStartScreen() {
    startScreenContainer.remove();
}

// HELPER METHODS -- PLAYERS
function Player(name, type) {
    this.name = name;
    this.type = type;
}

// HELPER METHODS -- CURRENT PLAYER
function turn(player) {
    if (player.name === 'player1') {
        player1Element.className = 'players active';
        player2Element.className = 'players';
    } else {
        player2Element.className = 'players active';
        player1Element.className = 'players';
    }
}

const box = document.getElementsByClassName('box');


for (let i = 0; i < box.length; i++) {
    box[i].addEventListener('click', function() {
        if (currentPlayer === player1) {
            box[i].style.backgroundImage = 'url(img/o.svg)';
            box[i].className = 'box box-filled-1';
            oArray.push(i);
            checkWin();
            currentPlayer = player2;
            turn(currentPlayer);
        } else {
            box[i].style.backgroundImage = 'url(img/x.svg)';
            box[i].className = 'box box-filled-2';
            xArray.push(i);
            checkWin();
            currentPlayer = player1;
            turn(currentPlayer);
        }
    });
    box[i].addEventListener('mouseover', function() {
        if (!(box[i].className === 'box box-filled-1') && !(box[i].className === 'box box-filled-2')) {
            if (currentPlayer === player1) {
                box[i].style.backgroundImage = 'url(img/o.svg)';
            } else {
                box[i].style.backgroundImage = 'url(img/x.svg)';
            }
        }
    });
    box[i].addEventListener('mouseout', function() {
        if (!(box[i].className === 'box box-filled-1') && !(box[i].className === 'box box-filled-2')) {
            box[i].style.backgroundImage = 'none';
        }

    });
}

// INDEX COMBOS FOR WIN
// [1, 2, 3]
// [4, 5, 6]
// [7, 8, 9]
// [1, 4, 7]
// [2, 5, 8]
// [3, 6, 9]
// [1, 5, 9]
// [3, 5, 7]

function checkWin() {
    const winArray = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    console.log(xArray);
    for (let j = 0; j < winArray.length; j++) {
        let checkXArray = winArray[j].every(function (value) { return xArray.indexOf(value) > -1 });
        let checkOArray = winArray[j].every(function (value) { return oArray.indexOf(value) > -1 });
        console.log(checkXArray);
        if (checkXArray === true) {
            hideBoard();
            createWinScreen('Winner', 'screen-win-two');
            hideBoard();
            showWinScreen();
            break;
        } else if (checkOArray === true) {
            createWinScreen('Winner', 'screen-win-one');
            hideBoard();
            showWinScreen();
            break;
        }
    }

}

function createWinScreen(message, classSelection) {
    endScreenContainer.className = 'screen screen-win ' + classSelection;
    endScreenContainer.id = 'finish';
    const headerWin = document.createElement('header');
    const winH1 = document.createElement('h1');
    winH1.innerHTML = 'Tic Tac Toe';
    winP = document.createElement('p');
    winP.className = 'message';
    winP.innerHTML = message;
    winA = document.createElement('a');
    winA.href = '#';
    winA.className = 'button';
    winA.innerHTML = 'New game';

    headerWin.appendChild(winH1);
    headerWin.appendChild(winP);
    headerWin.appendChild(winA);
    endScreenContainer.appendChild(headerWin);
}

function showWinScreen() {
    body.appendChild(endScreenContainer);
}

function removeWinScreen() {
    endScreenContainer.remove();
}

/* -+-+-+---------------------------------+-+-+-
-------- MAIN GAME --------
-+-+-+---------------------------------+-+-+- */
createStartScreen(startScreenContainer);
showStartScreen();




