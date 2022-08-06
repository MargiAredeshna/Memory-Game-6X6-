const cards = document.querySelectorAll('.card');

let hasFlippedCard = false; 
let lockBoard = false;
let firstCard, secondCard;

function flipCard() {
  if (lockBoard) return; // exit if already two cards
  if (this === firstCard) return; // exit if the same card

  this.classList.add('flip');

  if (!hasFlippedCard) { // if not cards
    hasFlippedCard = true;
    firstCard = this; // set first card
    return;
  }

  secondCard = this; // one card already, set second to this card
  lockBoard = true; // lock board for already two cards

  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.logo === secondCard.dataset.logo; // check if data-logo match
  isMatch ? disableCards() : unflipCards(); // if match, disable card events from game, else reset both cards
}

function disableCards() { // remove events for cards that matched
  firstCard.removeEventListener('click', flipCard);
  secondCard.removeEventListener('click', flipCard);

  resetBoard();
}

function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

(function shuffle() {
  cards.forEach(card => {
    let ramdomPos = Math.floor(Math.random() * cards.length);
    card.style.order = ramdomPos;
  });
})();

cards.forEach(card => card.addEventListener('click', flipCard));