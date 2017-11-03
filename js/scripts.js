(function() {
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

// elements for start page
    const body = document.querySelector('body');
    const entireBoard = document.getElementById('board');
    const startScreenContainer = document.createElement('div');
    const startScreenHeader = document.createElement('header');
    const startScreenH1 = document.createElement('h1');
    const startScreenLink = document.createElement('a');

// elements for board
    let playerNameElement = document.createElement('p');
    let computerNameElement = document.createElement('p');
    const player1Element = document.getElementById('player1');
    const player2Element = document.getElementById('player2');
    computerNameElement.innerHTML = 'Computer';
    player1Element.appendChild(playerNameElement);
    player2Element.appendChild(computerNameElement);

// elements for win page
    const endScreenContainer = document.createElement('div');
    const headerWin = document.createElement('header');
    const winP = document.createElement('p');
    const winH1 = document.createElement('h1');
    const winA = document.createElement('a');

    const squares = document.querySelectorAll('.box');

// add an ID for each square
    for (let i = 0; i < squares.length; i++) {
        squares[i].id = i;
    }

    initialStartGame();

    function createStartScreen() {
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
    }

    function showStartScreen() {
        body.appendChild(startScreenContainer);
    }

    function hideStartScreen() {
        startScreenContainer.remove();
        startScreenHeader.remove();
        startScreenH1.remove();
        startScreenLink.remove();
    }

    function createWinScreen(message, classSelection, name) {
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
    }

    function showWinScreen() {
        body.appendChild(endScreenContainer);
    }

    function hideWinScreen() {
        headerWin.remove();
        winH1.remove();
        winP.remove();
        winA.remove();
        endScreenContainer.remove();
    }

    function showBoard() {
        entireBoard.style.display = 'block';
    }

    function hideBoard() {
        entireBoard.style.display = 'none';
    }

    function initialStartGame() {
        createStartScreen();
        showStartScreen();
        hideBoard();
    }

    function startGame() {
        hideStartScreen();
        hideWinScreen();
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
        showBoard();
    }

    function addClickToSquare() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].addEventListener('click', turnClick, false);
            squares[i].addEventListener('mouseover', turnMouseOver, false);
            squares[i].addEventListener('mouseout', turnMouseOut, false);
        }
    }

    function removeClickFromSquare() {
        for (let i = 0; i < squares.length; i++) {
            squares[i].removeEventListener('click', turnClick, false);
            squares[i].removeEventListener('mouseover', turnMouseOver, false);
            squares[i].removeEventListener('mouseout', turnMouseOut, false);
        }
    }

    function turnMouseOver(square) {
        if (typeof  mainBoard[square.target.id] === 'number') {
            let hoverElement = document.getElementById(square.target.id);
            hoverElement.style.backgroundImage = 'url(img/o.svg)';
        }
    }

    function turnMouseOut(square) {
        if (typeof  mainBoard[square.target.id] === 'number') {
            let hoverElement = document.getElementById(square.target.id);
            hoverElement.style.backgroundImage = 'none';
        }
    }

    function turnClick(square) {
        // prevent player clicking or computer choosing a square that is already filled
        if (typeof mainBoard[square.target.id] === 'number') {
            // human player turn
            let checkTurn = turn(square.target.id, humanPlayer);
            if (!checkTurn) {
                if (!checkTie()) {
                    removeClickFromSquare();
                    setTimeout(() => {
                        turn(bestSpot(), computerPlayer);
                        addClickToSquare();
                    }, 1000);
                }
            }
        }
    }

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

    function checkWin(board, player) {
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

    function gameOver(gameWon) {
        removeClickFromSquare();
        setTimeout(() => {
            // show the correct winning screen for the correct player
            if (gameWon === humanPlayer) {
                hideBoard();
                createWinScreen('Winner', 'screen-win-one', playerName);
                showWinScreen();
            } else if (gameWon === computerPlayer) {
                hideBoard();
                createWinScreen('Winner', 'screen-win-two', 'Computer');
                showWinScreen();
            }
        }, 1000);
    }

    function emptySquares() {
        // return array of board numbers that have not been taken by either player
        return mainBoard.filter(element => {
            return typeof element === 'number';
        });
    }

    function bestSpot() {
        return minimax(mainBoard, computerPlayer).index;
    }

    function checkTie() {
        if (emptySquares().length === 0) {
            removeClickFromSquare();
            setTimeout(() => {
                hideBoard();
                createWinScreen('It\'s a Tie!', 'screen-win-tie');
                showWinScreen();
                return true;
            }, 1000);
        }
        return false;
    }

    function minimax(newBoard, player) {
        // find the indexes of the available squares on the board
        let availableSquares = emptySquares(newBoard);

        if (checkWin(newBoard, player)) {
            return { score: -10 };
        } else if (checkWin(newBoard, computerPlayer)) {
            return { score: 10 };
        } else if (availableSquares.length === 0) {
            return { score: 0 };
        }
        let moves = [];
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
        return moves[bestMove];
    }
}());




























