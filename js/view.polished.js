"use strict";

//TODO: Think of this view as your game board.
//      Your view should listen to various custom events of your model.
//      For each event of your model, there should be a clear visual
//      representation of what's going on.


//TODO: Update the field. Show the whole battlefield with all the stones
//      that are already played

import { MODEL } from "./model.connectfour.js";

/*Also I want to get the div playboard from my html element */
const PLAYBOARD = document.getElementById("playboard")

export function createBoard() {
    PLAYBOARD.innerHTML = "";

    for (let row = 0; row < MODEL.board.grid.length; row++) {

        for (let col = 0; col < MODEL.board.grid[row].length; col++) {

            let field = document.createElement("div");
            field.classList.add("field");

            let value = MODEL.board.grid[row][col];
            let isWinner = MODEL.winningStones.some(stone => {
                return stone[0] === row && stone[1] === col;
            });

            /*When Player 1: Daenerys set a stone*/
            if (value === 1) {
                field.style.backgroundColor = "indianred";
            }
            /*When Player 2: Arya Stark set a stone*/
            if (value === 2) {
                field.style.backgroundColor = "slateblue";
            }

            if (isWinner) {
                field.classList.add("winner-field");
            }
            PLAYBOARD.appendChild(field);
        }
    }
}



//TODO: Show the current player
/* I create a export function */
export function showCurrentPlayer() {
    const P1 = document.getElementById("current-player1");
    const P2 = document.getElementById("current-player2");

    if (MODEL.currentPlayer === 1) {
        P1.textContent = "➤ current Player ";
        P2.textContent = "";
    } else {
        P2.textContent = "➤ current Player ";
        P1.textContent = "";
    }
}

//TODO: Notify the player when the game is over. Make it clear how the
//      Game ended. If it's a win, show the winning stones.


        /* This function is for it, if one player wins. Therefore I want to see a Image from the winner on the display */

export function ShowWinner() {
    const DISPLAY = document.getElementById("winner-display");
    const WINNER1 = document.getElementById("winner1");
    const WINNER2 = document.getElementById("winner2");
    const TEXT = document.getElementById("winner-text");

    WINNER1.classList.add("hiddenwinner");
    WINNER2.classList.add("hiddenwinner");

    DISPLAY.classList.remove("hiddenwinner");

    if (MODEL.winner === 1) {
        TEXT.textContent = "Daenerys wins the Iron Throne!";
        WINNER1.classList.remove("hiddenwinner");
    } else if (MODEL.winner === 2) {
        TEXT.textContent = "Arya wins the battle!";
        WINNER2.classList.remove("hiddenwinner");
    } else {
        TEXT.textContent = "It's a draw!";
    }
}

/*
Listen for custom events from the model and update the view:
- stoneInserted → redraw the board
- playerChanged → update current player display
- gameOver → show the winner
*/

document.addEventListener("stoneInserted", createBoard);
document.addEventListener("playerChanged", showCurrentPlayer);
document.addEventListener("gameOver", ShowWinner);