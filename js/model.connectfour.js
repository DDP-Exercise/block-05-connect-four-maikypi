"use strict";

/* Model for Data and Logic


/* First I create an object for my BOARD with row and col, also I use export to use it later again */


export const BOARD = {
    rows: 6,
    cols: 7,
    grid: [
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 0],
    ]
}

/* Here I create an object called MODEL - the model is like the brain from the game */
/* The model safe all things who are important for the game to know - like switch the game or set a stone */

export const MODEL = {
    board: BOARD,
    currentPlayer: 1,
    gameOver: false,
    winner: null,
    winningStones: []
};

/* Here I create a function to change my players */

export function changePlayer() {
    if (MODEL.currentPlayer === 1) {
        MODEL.currentPlayer = 2;
    } else {
        MODEL.currentPlayer = 1;
    }



    /*1.The model looks at the column from bottom to top
and places the stone in the first empty field. */
}

export function setStone(col) {
    if (MODEL.gameOver) return;

    for (let row = 5; row >= 0; row--) {
        let field = MODEL.board.grid[row][col];

        if (field === 0) {
            MODEL.board.grid[row][col] = MODEL.currentPlayer;
            document.dispatchEvent(new CustomEvent("stoneInserted"));
            /*
Dispatch custom events to notify the view:
- stoneInserted → a stone was placed
- playerChanged → current player changed
- gameOver → game has ended
*/

            if (checkGameIsOver()) {
                return;

            }
            changePlayer();
            document.dispatchEvent(new CustomEvent("playerChanged"));
            return;
        }
    }

    alert("Diese Spalte ist voll!");
}


/* I created three different function, one for horizontal, one for vertical and one for checking it diagonal */

export function checkWin() {
    return checkWinHorizontal() || checkWinVertical() || checkWinDiagonal();
}

export function checkDraw() {
    for (let row = 0; row < MODEL.board.grid.length; row++) {
        for (let col = 0; col < MODEL.board.grid[row].length; col++) {
            if (MODEL.board.grid[row][col] === 0) {
                return false;
            }
        }
    }

    return true;
}
/*
Checks for a horizontal win:
- Looks through every row.
- Checks four fields next to each other.
- If all four belong to the same player, the winning stones are saved.
- Returns true if a win was found, otherwise false.
*/
function checkWinHorizontal() {
    for (let row = 0; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            let value = MODEL.board.grid[row][col];
            if (value !== 0 &&
                value === MODEL.board.grid[row][col + 1] &&
                value === MODEL.board.grid[row][col + 2] &&
                value === MODEL.board.grid[row][col + 3]) {
                MODEL.winningStones = [
                    [row, col],
                    [row, col + 1],
                    [row, col + 2],
                    [row, col + 3]
                ];
                return true;
            }
        }
    }
    return false;
}

function checkWinVertical() {
    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 7; col++) {
            let value = MODEL.board.grid[row][col];
            if (value !== 0 &&
                value === MODEL.board.grid[row + 1][col] &&
                value === MODEL.board.grid[row + 2][col] &&
                value === MODEL.board.grid[row + 3][col]) {
                MODEL.winningStones = [
                    [row, col],
                    [row + 1, col],
                    [row + 2, col],
                    [row + 3, col]
                ];
                return true;
            }
        }
    }
    return false;
}

function checkWinDiagonal() {
    const grid = MODEL.board.grid;

    /* */

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 4; col++) {
            let value = grid[row][col];
 /* diagonal ↓ */
            if (
                value !== 0 &&
                value === grid[row + 1][col + 1] &&
                value === grid[row + 2][col + 2] &&
                value === grid[row + 3][col + 3]
            ) {
                MODEL.winningStones = [
                    [row, col],
                    [row + 1, col + 1],
                    [row + 2, col + 2],
                    [row + 3, col + 3]
                ];
                return true;
            }
        }
    }

    /* diagonal ↑ */
    for (let row = 3; row < 6; row++) {
        for (let col = 0; col < 4; col++) {
            let value = grid[row][col];

            if (
                value !== 0 &&
                value === grid[row - 1][col + 1] &&
                value === grid[row - 2][col + 2] &&
                value === grid[row - 3][col + 3]
            ) {
                MODEL.winningStones = [
                    [row, col],
                    [row - 1, col + 1],
                    [row - 2, col + 2],
                    [row - 3, col + 3]
                ];
                return true;
            }
        }
    }

    return false;
}


/* check if the game is over */

export function checkGameIsOver() {
    if (checkWin()) {
        MODEL.gameOver = true;
        MODEL.winner = MODEL.currentPlayer;
        document.dispatchEvent(new CustomEvent("gameOver"));
        return true;
    }

    if (checkDraw()) {
        MODEL.gameOver = true;
        MODEL.winner = null;
        document.dispatchEvent(new CustomEvent("gameOver"));
        return true;
    }


    return false;
}






