const icons = { rock: "🪨", paper: "📄", scissors: "✂️" };
const choices = ["rock", "paper", "scissors"];
const wins = { rock: "scissors", paper: "rock", scissors: "paper" };

let playerScore = 0, computerScore = 0, draws = 0;

const playerPick = document.getElementById("playerPick");
const computerPick = document.getElementById("computerPick");
const resultText = document.getElementById("resultText");
const buttons = document.querySelectorAll(".choice-btn");

function animate(el) {
  el.classList.remove("pop");
  void el.offsetWidth;
  el.classList.add("pop");
}

function play(playerChoice) {
  const cpuChoice = choices[Math.floor(Math.random() * 3)];

  playerPick.textContent = icons[playerChoice];
  computerPick.textContent = icons[cpuChoice];
  animate(playerPick);
  animate(computerPick);

  resultText.className = "result-text";

  if (playerChoice === cpuChoice) {
    draws++;
    resultText.textContent = "It's a Draw! 🤝";
    resultText.classList.add("draw");
  } else if (wins[playerChoice] === cpuChoice) {
    playerScore++;
    resultText.textContent = "You Win! 🎉";
    resultText.classList.add("win");
  } else {
    computerScore++;
    resultText.textContent = "You Lose! 💀";
    resultText.classList.add("lose");
  }

  document.getElementById("playerScore").textContent = playerScore;
  document.getElementById("computerScore").textContent = computerScore;
  document.getElementById("draws").textContent = draws;

  if (playerScore === 3 || computerScore === 3) {
    const winner = playerScore === 3 ? "🏆 You Won the Match!" : "💀 CPU Won the Match!";
    resultText.textContent = winner;
    resultText.className = "result-text " + (playerScore === 3 ? "win" : "lose");
    buttons.forEach(b => b.disabled = true);
  }
}

function reset() {
  playerScore = computerScore = draws = 0;
  document.getElementById("playerScore").textContent = 0;
  document.getElementById("computerScore").textContent = 0;
  document.getElementById("draws").textContent = 0;
  playerPick.textContent = "❓";
  computerPick.textContent = "❓";
  resultText.textContent = "Make your move!";
  resultText.className = "result-text";
  buttons.forEach(b => b.disabled = false);
}

buttons.forEach(b => b.addEventListener("click", () => play(b.dataset.choice)));
document.getElementById("resetBtn").addEventListener("click", reset);
