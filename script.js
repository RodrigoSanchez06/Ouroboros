const board = document.getElementById("game-board");
const scoreDisplay = document.getElementById("score");
const message = document.getElementById("message");

let attempts = 0;
let flipped = [];
let lockBoard = false;
let matchedPairs = 0;

function generateCards() {
  const totalPairs = 20;
  const cards = [];

  for (let i = 1; i <= totalPairs; i++) {
    cards.push({
      id: i,
      // RUTA CORREGIDA
      img: `A/A.${i}.jpg`,
    });
    cards.push({
      id: i,
      // RUTA CORREGIDA
      img: `B/B.${i}.jpg`,
    });
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

  const cards = generateCards();
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
    if (matchedPairs === 20) {
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
