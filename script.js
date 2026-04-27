
// 🔊 Load Sounds
const clickSound = new Audio("sounds/click.mp3");
const winSound = new Audio("sounds/win.mp3");
const drawSound = new Audio("sounds/draw.mp3");
const restartSound= new Audio("sounds/restart.mp3");

let board = document.getElementById("board");
let statusText = document.getElementById("status");
let scoreX = document.getElementById("scoreX");
let scoreO = document.getElementById("scoreO");

let currentPlayer = "X";
let gameActive = true;
let scores = { X: 0, O: 0 };
let cells = [];

// Win patterns
let winPatterns = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
];

// Create 9 cells
for (let i = 0; i < 9; i++) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.addEventListener("click", handleClick);
  board.appendChild(cell);
  cells.push(cell);
}

function handleClick() {

  if (this.innerText !== "" || !gameActive) return;

  // Put player symbol
  this.innerText = currentPlayer;

  // 🔊 Click Sound
  clickSound.currentTime = 0;
  clickSound.play();

  // Check Winner
  if (checkWinner()) {
    winSound.currentTime = 0;
    winSound.play();
    party();

    scores[currentPlayer]++;
    if (currentPlayer === "X") {
      scoreX.innerText = scores.X;
    } else {
      scoreO.innerText = scores.O;
    }

    statusText.innerText = "Player " + currentPlayer + " Wins!";
    gameActive = false;
    return;
  }

  // Check Draw
  let isDraw = true;
  for (let i = 0; i < cells.length; i++) {
    if (cells[i].innerText === "") {
      isDraw = false;
      break;
    }
  }

  if (isDraw) {
    drawSound.currentTime = 0;
    drawSound.play();
    statusText.innerText = "Match Draw!";
    gameActive = false;
    return;
  }

  // Switch Player
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.innerText = "Player " + currentPlayer + "'s Turn";
}

function checkWinner() {
  for (let pattern of winPatterns) {
    let [a, b, c] = pattern;

    if (
      cells[a].innerText !== "" &&
      cells[a].innerText === cells[b].innerText &&
      cells[a].innerText === cells[c].innerText
    ) {
      // Highlight winner cells
      cells[a].style.backgroundColor = "lightgreen";
      cells[b].style.backgroundColor = "lightgreen";
      cells[c].style.backgroundColor = "lightgreen";

      return true;
    }
  }
  return false;
}

function restartGame() {

  restartSound.currentTime = 0;
  restartSound.play();

  cells.forEach(cell => {
    cell.innerText = "";
    cell.style.backgroundColor = "";
  });

  currentPlayer = "X";
  gameActive = true;
  statusText.innerText = "Player X's Turn";
}


function party() {
  for (let i = 0; i < 10; i++) {
    let b = document.createElement("div");

    b.innerHTML = "🎈";
    b.style.position = "fixed";
    b.style.fontSize = "30px";
    b.style.left = Math.random() * 100 + "vw";
    b.style.bottom = "-50px";
    b.style.transition = "3s linear";

    document.body.appendChild(b);

    setTimeout(() => {
      b.style.bottom = "100vh";
    }, 100);

    setTimeout(() => {
      b.remove();
    }, 3000);
  }
}

