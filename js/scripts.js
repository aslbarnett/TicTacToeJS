/* -+-+-+---------------------------------+-+-+-
VARIABLES
-+-+-+---------------------------------+-+-+- */

const body = document.getElementById('body');
const entireBoard = document.getElementById('board');
const startScreenContainer = document.createElement('div');

const player1 = {
    type: 'X'
};

const player2 = {
    type: 'O'
};

/* -+-+-+---------------------------------+-+-+-
HELPER METHODS
-+-+-+---------------------------------+-+-+- */

// HELPER METHODS -- BOARD DISPLAY
function hideBoard() {
    entireBoard.style.display = 'none';
}

function showBoard() {
    entireBoard.style.display = 'block';
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

/* -+-+-+---------------------------------+-+-+-
-------- MAIN GAME --------
-+-+-+---------------------------------+-+-+- */
createStartScreen(startScreenContainer);
showStartScreen();




