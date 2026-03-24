const iconHTML = {
  rock:     '<i class="fa-solid fa-hand-back-fist"></i>',
  paper:    '<i class="fa-solid fa-hand"></i>',
  scissors: '<i class="fa-solid fa-hand-scissors"></i>'
};

const choices = ["rock", "paper", "scissors"];
// what beats each choice
const beats = { rock: "paper", paper: "scissors", scissors: "rock" };
const wins  = { rock: "scissors", paper: "rock", scissors: "paper" };

let playerScore = 0, computerScore = 0, draws = 0;
let mode = "easy"; // "easy" | "hard"

const playerPick   = document.getElementById("playerPick");
const computerPick = document.getElementById("computerPick");
const resultText   = document.getElementById("resultText");
const buttons      = document.querySelectorAll(".choice-btn");
const modeBtns     = document.querySelectorAll(".mode-btn");

function animate(el) {
  el.classList.remove("pop");
  void el.offsetWidth;
  el.classList.add("pop");
}

function getCpuChoice(playerChoice) {
  if (mode === "hard") return beats[playerChoice]; // always wins
  return choices[Math.floor(Math.random() * 3)];
}

function play(playerChoice) {
  const cpuChoice = getCpuChoice(playerChoice);

  playerPick.innerHTML   = iconHTML[playerChoice];
  computerPick.innerHTML = iconHTML[cpuChoice];
  animate(playerPick);
  animate(computerPick);

  resultText.className = "result-text";

  if (playerChoice === cpuChoice) {
    draws++;
    resultText.textContent = "It's a Draw!";
    resultText.classList.add("draw");
  } else if (wins[playerChoice] === cpuChoice) {
    playerScore++;
    resultText.textContent = "You Win!";
    resultText.classList.add("win");
  } else {
    computerScore++;
    resultText.textContent = "You Lose!";
    resultText.classList.add("lose");
  }

  document.getElementById("playerScore").textContent   = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
  document.getElementById("draws").textContent         = draws;

  if (playerScore === 3 || computerScore === 3) {
    resultText.textContent = playerScore === 3 ? "You Won the Match!" : "CPU Won the Match!";
    resultText.className   = "result-text " + (playerScore === 3 ? "win" : "lose");
    buttons.forEach(b => b.disabled = true);
  }
}

function reset() {
  playerScore = computerScore = draws = 0;
  document.getElementById("playerScore").textContent   = 0;
  document.getElementById("computerScore").textContent = 0;
  document.getElementById("draws").textContent         = 0;
  playerPick.innerHTML   = '<i class="fa-solid fa-question"></i>';
  computerPick.innerHTML = '<i class="fa-solid fa-question"></i>';
  resultText.textContent = "Make your move!";
  resultText.className   = "result-text";
  buttons.forEach(b => b.disabled = false);
}

modeBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    mode = btn.dataset.mode;
    modeBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    reset();
  });
});

buttons.forEach(b => b.addEventListener("click", () => play(b.dataset.choice)));
document.getElementById("resetBtn").addEventListener("click", reset);
