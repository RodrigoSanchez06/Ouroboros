const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");
const difficultySelect = document.getElementById("difficulty");

let attempts = 0;
let flipped = [];
let lockBoard = false;
let matchedPairs = 0;
let currentDifficulty = "dificil"; // por defecto

difficultySelect.addEventListener("change", (e) => {
  currentDifficulty = e.target.value;
});

function generateCards(difficulty) {
  let totalPairs;
  let folderA, folderB;
  let extA, extB;

  if (difficulty === "facil") {
    totalPairs = 19; // tus imágenes van del 1 al 19
    folderA = "AFacil";
    folderB = "BFacil";
    extA = "png";   // AFacil/A.1.png
    extB = "PNG";   // BFacil/B.1.PNG
  } else {
    totalPairs = 20;
    folderA = "A";
    folderB = "B";
    extA = "jpg";   // A/A.1.jpg
    extB = "jpg";   // B/B.1.jpg
  }

  const cards = [];
  for (let i = 1; i <= totalPairs; i++) {
    cards.push({ id: i, img: `${folderA}/A.${i}.${extA}` });
    cards.push({ id: i, img: `${folderB}/B.${i}.${extB}` });
  }

  return shuffle(cards);
}

function shuffle(array) {
  return array.sort(() => 0.5 - Math.random());
}

function startGame() {
  board.innerHTML = "";
  message.textContent = "";
  attempts = 0;
  matchedPairs = 0;
  flipped = [];
  scoreDisplay.textContent = `Intentos: ${attempts}`;

  // Ajustar grid según dificultad
  board.className = "board " + currentDifficulty;

  const cards = generateCards(currentDifficulty);
  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.dataset.id = card.id;

    cardElement.innerHTML = `
      <div class="card-inner">
        <div class="card-front" style="background-image: url('${card.img}')"></div>
        <div class="card-back"></div>
      </div>
    `;

    cardElement.addEventListener("click", () => flipCard(cardElement));
    board.appendChild(cardElement);
  });
}

function flipCard(card) {
  if (lockBoard || card.classList.contains("flip")) return;

  card.classList.add("flip");
  flipped.push(card);

  if (flipped.length === 2) {
    lockBoard = true;
    attempts++;
    scoreDisplay.textContent = `Intentos: ${attempts}`;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flipped;
  const isMatch = card1.dataset.id === card2.dataset.id;

  if (isMatch) {
    matchedPairs++;
    flipped = [];
    lockBoard = false;

    const totalNeeded = currentDifficulty === "facil" ? 19 : 20;
    if (matchedPairs === totalNeeded) {
      message.textContent = "¡Felicidades! Completaste el memorama 🎉";
    }
  } else {
    setTimeout(() => {
      card1.classList.remove("flip");
      card2.classList.remove("flip");
      flipped = [];
      lockBoard = false;
    }, 1000);
  }
}

function resetGame() {
  startGame();
}
