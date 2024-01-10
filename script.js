const gridContainer = document.querySelector('.grid-container');
const btnChangePlayer = document.querySelector('.btn-change-player');
const winner = document.querySelector('.winner');
const dobas = document.querySelector('.step');
console.log({gridContainer});
const gridContainerWidth = gridContainer.clientWidth;

let currentPlayer = 1;

let track = [
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [ 0, 5, 6, 7, 8, 0, 0, 0, 0,19,20,21, 0,28,29,30,31,32, 0],
    [ 0, 4, 0, 0, 9,10,11, 0, 0,18, 0,22, 0,27, 0, 0, 0,33, 0],
    [ 0, 3, 0, 0, 0, 0,12, 0, 0,17, 0,24,25,26, 0, 0, 0,34, 0],
    [ 1, 2, 0, 0, 0, 0,13,14,15,16, 0, 0, 0, 0, 0,37,36,35, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,38, 0, 0, 0],
    [ 0, 0, 0,57,56,55, 0, 0,50,49,48, 0, 0, 0, 0,39, 0, 0, 0],
    [ 0, 0,59,58, 0,54,53,52,51, 0,47,46, 0,42,41,40, 0, 0, 0],
    [62,61,60, 0, 0, 0, 0, 0, 0, 0, 0,45,44,43, 0, 0, 0, 0, 0],
    [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

]

class Player {
    constructor(className, currentPosition, nextPosition) {
        this.currentPosition = currentPosition;
        this.nextPosition = nextPosition;
        this.player = document.createElement('div'); // <div></div>
        this.player.className = className; // kinézet <div class="player1"></div>
    }

}

class Suprise {
    constructor(className) {
        this.suprise = document.createElement('div');
        this.suprise.className = className;
    }
}

let p1 = new Player('player1', 1, 1);
let p2 = new Player('player2', 1, 1);
let s1 = new Suprise('suprise1');
let s2 = new Suprise('suprise2');
let s3 = new Suprise('suprise3');
let s4 = new Suprise('suprise4');



const rowNumber = 10;
const columnNumber = 19;

function createGrid() {
    let div;
    let gridRow;

    for (let row = 0; row < rowNumber; row++) {
        gridRow = document.createElement('div');
        gridRow.className = 'grid-row';
        for (let column = 0; column < columnNumber; column++) {
            div = document.createElement('div');
            div.className = 'cell';
            if (track[row][column] == 0) {
                // fal
                div.className = 'wall';
            } else {
                div.dataset.id = track[row][column];
                if (track[row][column] == 10) {
                    div.appendChild(s1.suprise);
                }
                if (track[row][column] == 15) {
                    div.appendChild(s2.suprise);
                }
                if (track[row][column] == 2) {
                    div.appendChild(s3.suprise);
                }
                if (track[row][column] == 19) {
                    div.appendChild(s4.suprise);
                }
            }
            div.style.width = gridContainerWidth / columnNumber + 'px';
            div.style.height = gridContainerWidth / columnNumber + 'px';
            gridRow.appendChild(div);
        }
        gridContainer.appendChild(gridRow);
    }
}

function nextPlayer() {
    let step = Math.floor(Math.random() * 6) + 1;
    dobas.innerHTML = step;

    if (currentPlayer == 1) {
        if (p1.nextPosition + step <= 20){
            p1.currentPosition = p1.nextPosition;
            p1.nextPosition += step;
            movePlayer(p1);
        }
        if (p1.nextPosition == 20)  {
           btnChangePlayer.disabled = true; 
           winner.innerHTML = '1. játékos nyert!'
        }
        if (p1.nextPosition == 2) {
            p1.currentPosition = p1.nextPosition;
            p1.nextPosition = 5;
        }
    }

    if (currentPlayer == 2) {
        if (p2.nextPosition + step <= 20){
            p2.currentPosition = p2.nextPosition;
            p2.nextPosition += step;
            movePlayer(p2);
        }
        if (p2.nextPosition == 20)  {
            btnChangePlayer.disabled = true; 
            winner.innerHTML = '2. játékos nyert!'
        }
        if (p2.nextPosition == 2) {
            p2.currentPosition = p2.nextPosition;
            p2.nextPosition = 5;
        }
    }

    currentPlayer++;
    if (currentPlayer > 2) currentPlayer = 1;

}

async function movePlayer(player) {
    let position;
    for (let i = player.currentPosition; i <= player.nextPosition; i++) {
        position = document.querySelector(`[data-id="${i}"]`);
        await delay(200);
        position.appendChild(player.player)
    }
}

function delay(milliseconds) {
    return new Promise(resolve => {
        setTimeout(resolve, milliseconds)
    });
}

createGrid();

btnChangePlayer.addEventListener('click', nextPlayer);

movePlayer(p1);
movePlayer(p2);