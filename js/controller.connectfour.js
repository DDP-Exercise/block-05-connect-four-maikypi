"use strict";

/*******************************************************
 *     Connect Four - 100p
 *
 *     It's gaming time! The kids from Kindergarten would
 *     love to play some connect four! Unfortunately, kids
 *     nowadays can't use any wood or paper games anymore.
 *     It's digital or they go crazy. And we don't want crazy,
 *     do we?
 *
 *     Your task is to create a nice game of connect four.
 *     Make it an interesting >digital product< (I've heard
 *     you are an expert for that)! Make it visually appealing.
 *     Wrap it into a story. Choose or create two characters
 *     with rivalry to give your game more flesh. Try to
 *     match the appearance and/or the behavior of the game to
 *     the background-story (character arch).
 *
 *     Technical requirements:
 *     The game should be intuitive to play. It's a children's
 *     game after all. Think of a good way to handle your input.
 *
 *     The two players use the same input method and play in turns
 *     (= No need for separate input).
 *
 *     The game should give some hint or warning, when a player
 *     wants to put a stone on a file that is already full.
 *
 *     The game should give a clear visual representation of
 *     the winning stones and announce the winner.
 *
 *     Use MVC and custom Events. The model dispatches events for:
 *      - Player Change (view visually highlights current player)
 *      - Stone was inserted (view visually represents all the stones)
 *      - Game is over (Draw or Winner)
 *
 *     The creation of this game should take you somewhere between
 *     8-10 hours of concentrated work.
 *
 *     maikypi - 2026-05-05
 *******************************************************/

//TODO: Create your controller-object. When initiated, it should boot
//      the view (or views, if you decide to make a console-view).

//TODO: Add EventListeners, to forward the user inputs to the model.

import { MODEL } from "./model.connectfour.js"
import { createBoard } from "./view.polished.js";
import {setStone} from "./model.connectfour.js";
import {showCurrentPlayer} from "./view.polished.js";
import {ShowWinner} from "./view.polished.js";


/* Initialisierung, create the board on the start */
createBoard();
showCurrentPlayer();


/* Here i create my buttons for the gifs*/

const BUTTON1 = document.getElementById("click1");
const GIF1 = document.getElementById("gif1");
const BUTTON2 = document.getElementById("click2");
const GIF2 = document.getElementById("gif2");
const BUTTON3 = document.getElementById("btn-stone");
const INPUT = document.getElementById("col-input");

/* This is for open my gifs, if the button from my picture are clicked*/
BUTTON1.addEventListener("click", () => {
    console.log("geklickt");
    GIF1.classList.add("show");
    setTimeout(() => {
        GIF1.classList.remove("show");
    }, 4400);
});



BUTTON2.addEventListener("click", () => {
    console.log("geklickt");
    GIF2.classList.add("show");
    setTimeout(() => {
        GIF2.classList.remove("show");
    }, 4400);
});

/* This button is for the game, the user should input a number from 1-7* then it set a stone and also show which is the current player*/



BUTTON3.addEventListener("click", () => {
    let value = Number(INPUT.value);
    let col = value - 1;


    if (value >= 1 && value <= 7) {
        setStone(col);
    }

    /* after setting the stone, refresh the viewboard */
    createBoard();
    showCurrentPlayer();

    /* check if the game is over */
    if (MODEL.gameOver) {
        ShowWinner();
    }
});