let frameWait = 16;
let baseDistance = 40;
let noteStreak = 0;
let noteScore = 0;
let highScore = 0;

let colValues = {
    Q: document.documentElement.clientWidth / 2 - 75,
    W: document.documentElement.clientWidth / 2 - 25,
    E: document.documentElement.clientWidth / 2 + 25,
    R: document.documentElement.clientWidth / 2 + 75
};

let numToCol = {
    1: "Q",
    2: "W",
    3: "E",
    4: "R"
};

let game = document.body;
let noteSpeed = 3;


let highScoreElement = document.createElement("div");
highScoreElement.innerHTML = "Highscore: " + highScore + " points";
highScoreElement.style.fontSize = "2em";
game.appendChild(highScoreElement);

let scoreElement = document.createElement("div");
scoreElement.innerHTML = noteScore + " points";
scoreElement.style.fontSize = "2em";
game.appendChild(scoreElement);

let streakElement = document.createElement("div");
streakElement.innerHTML = noteStreak;
streakElement.style.fontSize = "2em";
game.appendChild(streakElement);

let helpElement = document.createElement("div");
helpElement.innerHTML = "Press S to start";
helpElement.style.fontSize = "2em";
game.appendChild(helpElement);


for (let col in colValues) {
    let colElement = document.createElement("div");
    colElement.style.border = "solid 1px black";
    colElement.style.position = "absolute";
    colElement.style.left = (colValues[col]) + "px";
    colElement.style.top = "0px";
    colElement.style.height = document.documentElement.clientHeight + "px";
    colElement.style.width = "45px";
    game.appendChild(colElement);


    let btnElement = document.createElement("div");
    btnElement.style.border = "solid 1px black";
    btnElement.style.position = "absolute";
    btnElement.style.left = (colValues[col]) + "px";
    btnElement.style.bottom = "0px";
    btnElement.style.borderRadius = "40px";
    btnElement.style.height = "45px";
    btnElement.style.width = "45px";
    btnElement.id = col;
    let textElement = document.createElement("p");
    textElement.innerHTML = col;
    textElement.style.position = "relative";
    textElement.style.left = "16px";
    textElement.style.top = "-2px";

    btnElement.appendChild(textElement);

    let btnStyle = setInterval(() => {
        btnIndex = parseInt(btnElement.style.zIndex);
        if (btnIndex > 100) {
            btnElement.style.zIndex = btnIndex -= 1;
            btnElement.style.backgroundColor = "#000000";
        }
        else {
            btnElement.style.backgroundColor = "transparent";
        }

    }, frameWait);

    game.appendChild(btnElement);

}

let qBtn = document.getElementById("Q");
let wBtn = document.getElementById("W");
let eBtn = document.getElementById("E");
let rBtn = document.getElementById("R");

function startNewGame(amount) {
    noteScore = 0;
    noteStreak = 0;
    let noteString = "";
    for (i = 0; i < amount; i++) {
        noteString += Math.floor(Math.random() * 4 + 1);
    }
    for (i = 0; i < noteString.length; i++) {
        col = parseInt(noteString[i]);
        createNote(numToCol[col], i * baseDistance);
    }
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "q":
            qBtn.style.zIndex = 105;
            let qNotes = document.getElementsByClassName("colQ");
            checkNoteHit(qNotes);
            break;
        case "w":
            wBtn.style.zIndex = 105;
            let wNotes = document.getElementsByClassName("colW");
            checkNoteHit(wNotes);
            break;
        case "e":
            eBtn.style.zIndex = 105;
            let eNotes = document.getElementsByClassName("colE");
            checkNoteHit(eNotes);
            break;
        case "r":
            rBtn.style.zIndex = 105;
            let rNotes = document.getElementsByClassName("colR");
            checkNoteHit(rNotes);
            break;
        case "s":
            if(document.getElementsByClassName("note").length == 0){
                startNewGame(100);
            }
            break;

    }
});

function checkNoteHit(noteList) {
    let miss = true;
    for (let i = 0; i < noteList.length; i++) {
        let position = parseInt(noteList[i].style.bottom);
        if (position > -40 && position < 40) {
            console.log("note hit")
            noteScore += noteStreak;
            noteStreak += 1;
            noteList[i].classList.add("remove");
            miss = false;
        }
    }
    if (miss) {
        noteStreak = 0;
    }
}

let updateGUI = setInterval(() => {
    if (noteScore > highScore){
        highScore = noteScore;
    }
    scoreElement.innerHTML = noteScore + " points";
    streakElement.innerHTML = noteStreak + " note streak!";
    highScoreElement.innerHTML = "Highscore: " + highScore + " points";
}, frameWait);


function createNote(col, top) {
    let note = document.createElement("div");
    let noteBottom = document.documentElement.clientHeight + top + 100;
    note.style.position = "absolute";
    note.style.border = "solid 1px black";
    note.style.borderRadius = "40px";
    note.style.width = "40px";
    note.style.height = "40px";
    note.style.bottom = noteBottom + "px";
    note.style.left = colValues[col] + 2.5 + "px";
    noteClass = "col" + col;
    note.classList.add(noteClass);
    note.classList.add("note");
    game.appendChild(note);

    let move = setInterval(() => {
        noteBottom -= noteSpeed;
        if (note.classList.contains("remove")) {
            note.remove();
            clearInterval(move);
        }
        if (noteBottom < -50) {
            note.remove();
            clearInterval(move);
            noteStreak = 0;
        }
        else {
            note.style.bottom = noteBottom + "px";
        }
    }, frameWait);

}