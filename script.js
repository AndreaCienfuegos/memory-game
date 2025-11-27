const cardsArray = ['🍎','🍌','🍇','🍉','🍓','🥝','🍍','🍑','🍎','🍌','🍇','🍉','🍓','🥝','🍍','🍑'];
let moves = 0;
let flippedCards = [];
let matchedPairs = 0;
let time = 0;
let timerInterval;

const gameContainer = document.querySelector('.game-container');
const movesCounter = document.getElementById('moves');
const timeCounter = document.getElementById('time');
const confettiContainer = document.getElementById('confetti');

// Función para mezclar cartas
function shuffle(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Iniciar temporizador
function startTimer() {
  timerInterval = setInterval(() => {
    time++;
    timeCounter.textContent = time;
  }, 1000);
}

// Crear cartas en el DOM
function createCards() {
  shuffle(cardsArray).forEach(symbol => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.innerHTML = `
      <div class="card-inner">
        <div class="card-front">${symbol}</div>
        <div class="card-back"></div>
      </div>
    `;
    card.addEventListener('click', () => flipCard(card, symbol));
    gameContainer.appendChild(card);
  });
}

// Función para girar carta
function flipCard(card, symbol) {
  if (!timerInterval) startTimer();
  if (flippedCards.length < 2 && !card.classList.contains('flipped') && !card.classList.contains('match')) {
    card.classList.add('flipped');
    flippedCards.push({card, symbol});
    if (flippedCards.length === 2) checkMatch();
  }
}

// Verificar si las cartas coinciden
function checkMatch() {
  moves++;
  movesCounter.textContent = moves;
  const [first, second] = flippedCards;

  if (first.symbol === second.symbol) {
    // Añadir clase match y destello
    first.card.classList.add('match');
    second.card.classList.add('match');

    matchedPairs++;
    flippedCards = [];

    // Si todas las parejas se han encontrado
    if (matchedPairs === cardsArray.length / 2) gameWon();
  } else {
    setTimeout(() => {
      first.card.classList.remove('flipped');
      second.card.classList.remove('flipped');
      flippedCards = [];
    }, 1000);
  }
}

// Función al ganar
function gameWon() {
  clearInterval(timerInterval);
  animateBackground();
  generateConfetti();
  setTimeout(() => {
    alert(`¡Ganaste! Movimientos: ${moves}, Tiempo: ${time} segundos`);
  }, 500);
}

// Animar fondo al ganar
function animateBackground() {
  document.body.style.background = 'linear-gradient(135deg, #fddb92, #d1fdff)';
}

// Generar confeti
function generateConfetti() {
  for (let i = 0; i < 100; i++) {
    const piece = document.createElement('div');
    piece.classList.add('confetti-piece');
    piece.style.backgroundColor = `hsl(${Math.random()*360}, 100%, 50%)`;
    piece.style.left = `${Math.random()*100}%`;
    piece.style.animationDuration = `${Math.random()*2 + 1}s`;
    confettiContainer.appendChild(piece);
    setTimeout(() => piece.remove(), 3000);
  }
}

// Inicializar juego
createCards();
