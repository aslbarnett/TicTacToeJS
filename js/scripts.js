/* -+-+-+---------------------------------+-+-+-
VARIABLES
-+-+-+---------------------------------+-+-+- */

let currentPlayer;
let player1;
let player2;

let playerName;
let playerNameElement = document.createElement('p');
let computerNameElement = document.createElement('p');
computerNameElement.innerHTML = 'Computer';


let availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];


let xArray = [];
let oArray = [];

const body = document.getElementById('body');
const entireBoard = document.getElementById('board');
const startScreenContainer = document.createElement('div');
const endScreenContainer = document.createElement('div');

const player1Element = document.getElementById('player1');
const player2Element = document.getElementById('player2');

player1Element.appendChild(playerNameElement);
player2Element.appendChild(computerNameElement);

const headerWin = document.createElement('header');
const winP = document.createElement('p');
const winH1 = document.createElement('h1');
const winA = document.createElement('a');

/* -+-+-+---------------------------------+-+-+-
HELPER METHODS
-+-+-+---------------------------------+-+-+- */

// HELPER METHODS -- BOARD DISPLAY
function hideBoard() {
    entireBoard.style.display = 'none';
}

function showBoard() {
    entireBoard.style.display = 'block';
    player1 = new Player('player1', 'O');
    player2 = new Player('player2', 'X');
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
        playerName = prompt('Please enter your name:');
        playerNameElement.innerHTML = playerName;

        hideStartScreen();
        showBoard();
        boardOperation();
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
    console.log(player.name);
    if (player.name === 'player1') {
        player1Element.className = 'players active';
        player2Element.className = 'players';
    } else {
        player2Element.className = 'players active';
        player1Element.className = 'players';
        computerBoardOperation();
    }
}

const box = document.getElementsByClassName('box');


// for (let i = 0; i < box.length; i++) {
//     box[i].addEventListener('click', function() {
//         if (currentPlayer === player1) {
//             box[i].style.backgroundImage = 'url(img/o.svg)';
//             box[i].className = 'box box-filled-1';
//             oArray.push(i);
//             checkWin();
//             currentPlayer = player2;
//             turn(currentPlayer);
//         } else {
//             box[i].style.backgroundImage = 'url(img/x.svg)';
//             box[i].className = 'box box-filled-2';
//             xArray.push(i);
//             checkWin();
//             currentPlayer = player1;
//             turn(currentPlayer);
//         }
//     });
//     box[i].addEventListener('mouseover', function() {
//         if (!(box[i].className === 'box box-filled-1') && !(box[i].className === 'box box-filled-2')) {
//             if (currentPlayer === player1) {
//                 box[i].style.backgroundImage = 'url(img/o.svg)';
//             } else {
//                 box[i].style.backgroundImage = 'url(img/x.svg)';
//             }
//         }
//     });
//     box[i].addEventListener('mouseout', function() {
//         if (!(box[i].className === 'box box-filled-1') && !(box[i].className === 'box box-filled-2')) {
//             box[i].style.backgroundImage = 'none';
//         }
//
//     });
// }
function boardOperation() {
    $('.box').one('click', function() {
        let index = $('.box').index(this);
        let mainArrayIndex = availableSquares.indexOf(index);
        if (currentPlayer === player1) {
            this.style.backgroundImage = 'url(img/o.svg)';
            this.className = 'box box-filled-1';
            if (mainArrayIndex > -1) {
                availableSquares.splice(mainArrayIndex, 1);
            }
            oArray.push(index);
            checkWin();
            currentPlayer = player2;
            turn(currentPlayer);
        } else if (currentPlayer === player2) {
            this.style.backgroundImage = 'url(img/x.svg)';
            this.className = 'box box-filled-2';
            if (mainArrayIndex > -1) {
                availableSquares.splice(mainArrayIndex, 1);
            }
            xArray.push(index);
            checkWin();
            currentPlayer = player1;
            turn(currentPlayer);
        }
    });

    $('.box').on('mouseover', function() {
        if (!(this.className === 'box box-filled-1') && !(this.className === 'box box-filled-2')) {
            if (currentPlayer === player1) {
                this.style.backgroundImage = 'url(img/o.svg)';
            } else {
                this.style.backgroundImage = 'url(img/x.svg)';
            }
        }
    });

    $('.box').on('mouseout', function() {
        if (!(this.className === 'box box-filled-1') && !(this.className === 'box box-filled-2')) {
            this.style.backgroundImage = 'none';
        }
    });
}

function computerBoardOperation() {
    const randomSquare = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    setTimeout(function () {
        $('.box').each(function() {
            if ($('.box').index(this) === randomSquare) {
                this.style.backgroundImage = 'url(img/x.svg)';
                this.className = 'box box-filled-2';
                let index = $('.box').index(this);
                let mainArrayIndex = availableSquares.indexOf(index);
                if (mainArrayIndex > -1) {
                    availableSquares.splice(mainArrayIndex, 1);
                }
                xArray.push(index);
                checkWin();
                currentPlayer = player1;
                turn(currentPlayer);
            }
        });
    }, 1000);
}

function clearBoard() {
    oArray = [];
    xArray = [];
    availableSquares = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    $('.box').each(function () {
        this.style.backgroundImage = 'none';
        this.className = 'box';
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
    for (let j = 0; j < winArray.length; j++) {
        let checkXArray = winArray[j].every(function (value) { return xArray.indexOf(value) > -1 });
        let checkOArray = winArray[j].every(function (value) { return oArray.indexOf(value) > -1 });
        if (checkXArray === true) {
            hideBoard();
            createWinScreen('Winner', 'screen-win-two');
            hideBoard();
            showWinScreen();
            break;
        } else if (checkOArray === true) {
            hideBoard();
            createWinScreen('Winner', 'screen-win-one');
            showWinScreen();
            break;
        } else if (availableSquares.length === 0) {
            hideBoard();
            createWinScreen("It's a Tie!", 'screen-win-tie');
            showWinScreen();
        }
    }


}

function createWinScreen(message, classSelection) {
    endScreenContainer.className = 'screen screen-win ' + classSelection;
    endScreenContainer.id = 'finish';
    winH1.innerHTML = 'Tic Tac Toe';
    winP.className = 'message';
    winP.innerHTML = message;
    winA.href = '#';
    winA.className = 'button';
    winA.innerHTML = 'New game';
    winA.addEventListener('click', function() {
        removeWinScreen();
        clearBoard();
        showBoard();
        boardOperation();
    });

    headerWin.appendChild(winH1);
    headerWin.appendChild(winP);
    headerWin.appendChild(winA);
    endScreenContainer.appendChild(headerWin);
}

function showWinScreen() {
    body.appendChild(endScreenContainer);
}

function removeWinScreen() {
    headerWin.remove();
    winH1.remove();
    winP.remove();
    winA.remove();
    endScreenContainer.remove();
}

/* -+-+-+---------------------------------+-+-+-
-------- MAIN GAME --------
-+-+-+---------------------------------+-+-+- */
createStartScreen(startScreenContainer);
showStartScreen();




