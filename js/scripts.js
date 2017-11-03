(function() {

    /* -+-+-+------------------------------+-+-+-
    Global Variables
    -+-+-+------------------------------+-+-+- */

    let mainBoard;
    const humanPlayer = 'O';
    const computerPlayer = 'X';
    const winningOptions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    let game;

    /* -+-+-+------------------------------+-+-+-
    Global Variables: Element for Start Page
    -+-+-+------------------------------+-+-+- */

    const body = document.querySelector('body');
    const entireBoard = document.getElementById('board');
    const startScreenContainer = document.createElement('div');
    const startScreenHeader = document.createElement('header');
    const startScreenH1 = document.createElement('h1');
    const startScreenLink = document.createElement('a');

    /* -+-+-+------------------------------+-+-+-
    Global Variables: Element for Board Page
    -+-+-+------------------------------+-+-+- */

    let playerNameElement = document.createElement('p');
    let computerNameElement = document.createElement('p');
    const player1Element = document.getElementById('player1');
    const player2Element = document.getElementById('player2');
    computerNameElement.innerHTML = 'Computer';
    player1Element.appendChild(playerNameElement);
    player2Element.appendChild(computerNameElement);

    /* -+-+-+------------------------------+-+-+-
    Global Variables: Element for Win Page
    -+-+-+------------------------------+-+-+- */

    const endScreenContainer = document.createElement('div');
    const headerWin = document.createElement('header');
    const winP = document.createElement('p');
    const winH1 = document.createElement('h1');
    const winA = document.createElement('a');

    /* -+-+-+------------------------------+-+-+-
    Global Variables: Squares
    -+-+-+------------------------------+-+-+- */

    const squares = document.querySelectorAll('.box');
    // add an ID for each square
    for (let i = 0; i < squares.length; i++) {
        squares[i].id = i;
    }

    /* -+-+-+------------------------------+-+-+-
    Game Class
    -+-+-+------------------------------+-+-+- */

    function Game() {}

    Game.prototype.createStartScreen = function() {
        startScreenContainer.className = 'screen screen-start';
        startScreenContainer.id = 'start';
        startScreenH1.innerHTML = 'Tic Tac Toe';
        startScreenLink.href = '#';
        startScreenLink.className = 'button';
        startScreenLink.innerHTML = 'Start game';
        startScreenLink.addEventListener('click', function() {
            playerName = prompt('Please enter your name:');
            playerNameElement.innerHTML = playerName;
            startGame();
        });
        startScreenHeader.appendChild(startScreenH1);
        startScreenHeader.appendChild(startScreenLink);
        startScreenContainer.appendChild(startScreenHeader);
    };

    Game.prototype.showStartScreen = function() {
        body.appendChild(startScreenContainer);
    };

    Game.prototype.hideStartScreen = function() {
        startScreenContainer.remove();
        startScreenHeader.remove();
        startScreenH1.remove();
        startScreenLink.remove();
    };

    Game.prototype.createWinScreen = function(message, classSelection, name) {
        endScreenContainer.className = 'screen screen-win ' + classSelection;
        endScreenContainer.id = 'finish';
        winH1.innerHTML = 'Tic Tac Toe';
        winP.className = 'message';
        if (name) {
            winP.innerHTML = message + ': ' + name + '!';
        } else {
            winP.innerHTML = message;
        }
        winA.href = '#';
        winA.className = 'button';
        winA.innerHTML = 'New game';
        winA.addEventListener('click', function() {
            startGame();
        });
        headerWin.appendChild(winH1);
        headerWin.appendChild(winP);
        headerWin.appendChild(winA);
        endScreenContainer.appendChild(headerWin);
    };

    Game.prototype.showWinScreen = function() {
        body.appendChild(endScreenContainer);
    };

    Game.prototype.hideWinScreen = function() {
        headerWin.remove();
        winH1.remove();
        winP.remove();
        winA.remove();
        endScreenContainer.remove();
    };

    Game.prototype.showBoard = function() {
        entireBoard.style.display = 'block';
    };

    Game.prototype.hideBoard = function() {
        entireBoard.style.display = 'none';
    };

    /* -+-+-+------------------------------+-+-+-
    *** START OF GAME ***
    -+-+-+------------------------------+-+-+- */

    initialStartGame();

    /* -+-+-+------------------------------+-+-+-
    FUNCTIONS
    -+-+-+------------------------------+-+-+- */

    // start game when it is first loaded onto the screen
    function initialStartGame() {
        game = new Game();
        game.createStartScreen();
        game.showStartScreen();
        game.hideBoard();
    }

    // start game once user clicks on start page button or win page button
    function startGame() {
        game.hideStartScreen();
        game.hideWinScreen();
        player1Element.className = 'players active';
        player2Element.className = 'players';
        // create board elements to keep track of
        mainBoard = [0, 1, 2, 3, 4, 5, 6, 7, 8];
        for (let i = 0; i < squares.length; i++) {
            squares[i].style.backgroundImage = 'none';
            squares[i].className = 'box';
            squares[i].addEventListener('click', turnClick, false);
            squares[i].addEventListener('mouseover', turnMouseOver, false);
            squares[i].addEventListener('mouseout', turnMouseOut, false);
        }
        game.showBoard();
    }

    // add event listeners to squares
    function addClickToSquare() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', turnClick, false);
            squares[i].addEventListener('mouseover', turnMouseOver, false);
            squares[i].addEventListener('mouseout', turnMouseOut, false);
        }
    }

    // remove event listeners from squares
    function removeClickFromSquare() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', turnClick, false);
            squares[i].removeEventListener('mouseover', turnMouseOver, false);
            squares[i].removeEventListener('mouseout', turnMouseOut, false);
        }
    }

    // add image when mouse hovers over square for human player
    function turnMouseOver(square) {
        if (typeof  mainBoard[square.target.id] === 'number') {
            let hoverElement = document.getElementById(square.target.id);
            hoverElement.style.backgroundImage = 'url(img/o.svg)';
        }
    }

    // remove image when mouse leaves square for human player
    function turnMouseOut(square) {
        if (typeof  mainBoard[square.target.id] === 'number') {
            let hoverElement = document.getElementById(square.target.id);
            hoverElement.style.backgroundImage = 'none';
        }
    }

    // square check prior to square being filled - check that square is available
    function turnClick(square) {
        // prevent player clicking or computer choosing a square that is already filled
        if (typeof mainBoard[square.target.id] === 'number') {
            // human player turn
            let checkTurn = turn(square.target.id, humanPlayer);
            if (!checkTurn) {
                if (!checkTie()) {
                    removeClickFromSquare();
                    setTimeout(() => {
                        // computer player turn
                        turn(bestSpot(), computerPlayer);
                        addClickToSquare();
                    }, 1000);
                }
            }
        }
    }

    // main turn function fills square with appropriate image and color as well as checks if the game has been won
    function turn(squareId, player) {
        // altering board to assign player name X or O instead of number for that square in array
        mainBoard[squareId] = player;
        // square that has been chosen on board
        let selectedElement = document.getElementById(squareId);
        // assigning the correct X or O to be displayed in the square
        if (player === humanPlayer) {
            selectedElement.style.backgroundImage = 'url(img/o.svg)';
            selectedElement.className = 'box box-filled-1';
            player2Element.className = 'players active';
            player1Element.className = 'players';
        } else if (player === computerPlayer) {
            selectedElement.style.backgroundImage = 'url(img/x.svg)';
            selectedElement.className = 'box box-filled-2';
            player1Element.className = 'players active';
            player2Element.className = 'players';
        }
        // check if game had been won
        let gameWon = checkWin(mainBoard, player);
        if (gameWon) gameOver(gameWon);
        return gameWon;
    }

    // check if current board is a win for the player
    function checkWin(board, player) {
        // get an array with only the squares that that player has
        let plays = board.reduce((accumulator, boardElement, index) => {
            if (boardElement === player) {
                return accumulator.concat(index);
            } else {
                return accumulator;
            }
        }, []);
        let gameWon = null;
        for (let i = 0; i < winningOptions.length; i++) {
            // check if player has all elements in a win combination
            if (winningOptions[i].every(element => plays.indexOf(element) > -1)) {
                gameWon = player;
                break;
            }
        }
        return gameWon;
    }

    // if game has been won,
    function gameOver(gameWon) {
        removeClickFromSquare();
        setTimeout(() => {
            // show the correct winning screen for the correct player
            if (gameWon === humanPlayer) {
                game.hideBoard();
                game.createWinScreen('Winner', 'screen-win-one', playerName);
                game.showWinScreen();
            } else if (gameWon === computerPlayer) {
                game.hideBoard();
                game.createWinScreen('Winner', 'screen-win-two', 'Computer');
                game.showWinScreen();
            }
        }, 1000);
    }

    function emptySquares() {
        // return array of board numbers that have not been taken by either player
        return mainBoard.filter(element => {
            return typeof element === 'number';
        });
    }

    // computer's best move
    function bestSpot() {
        return minimax(mainBoard, computerPlayer).index;
    }

    // check if the board is full
    function checkTie() {
        if (emptySquares().length === 0) {
            removeClickFromSquare();
            setTimeout(() => {
                game.hideBoard();
                game.createWinScreen('It\'s a Tie!', 'screen-win-tie');
                game.showWinScreen();
                return true;
            }, 1000);
        }
        return false;
    }

    // minimax function for computer's move
    function minimax(newBoard, player) {
        // find the indexes of the available squares on the board
        let availableSquares = emptySquares(newBoard);

        // assign a score
        if (checkWin(newBoard, player)) {
            return { score: -10 };
        } else if (checkWin(newBoard, computerPlayer)) {
            return { score: 10 };
        } else if (availableSquares.length === 0) {
            return { score: 0 };
        }
        let moves = [];
        // loop through all available squares and assign scores to square for both human and computer players
        for (let i = 0; i < availableSquares.length; i++) {
            let move = {};
            move.index = newBoard[availableSquares[i]];
            newBoard[availableSquares[i]] = player;

            if (player === computerPlayer) {
                let result = minimax(newBoard, humanPlayer);
                move.score = result.score;
            } else {
                let result = minimax(newBoard, computerPlayer);
                move.score = result.score;
            }

            newBoard[availableSquares[i]] = move.index;

            moves.push(move);
        }

        // work out what the best move is by assigning the highest score to the best move
        let bestMove;
        if (player === computerPlayer) {
            let bestScore = -10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score > bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        } else {
            let bestScore = 10000;
            for (let i = 0; i < moves.length; i++) {
                if (moves[i].score < bestScore) {
                    bestScore = moves[i].score;
                    bestMove = i;
                }
            }
        }
        // return the best move
        return moves[bestMove];
    }
}());




























