const flashcard = document.querySelector(".flashcard");
const front = document.querySelector(".front");
const back = document.querySelector(".back");

let index = 0;

const cards = [
  { front: "What is the powerhouse of the cell?", back: "Mitochondria" },
  { front: "What planet is known as the Red Planet?", back: "Mars" },
  { front: "What is the capital of Japan?", back: "Tokyo" }
];

function updateCard() {
  front.textContent = cards[index].front;
  back.textContent = cards[index].back;
  flashcard.classList.remove("flipped");
}

function flipCard() {
  flashcard.classList.toggle("flipped");
}

function nextCard() {
  index = (index + 1) % cards.length;
  updateCard();
}

function prevCard() {
  index = (index - 1 + cards.length) % cards.length;
  updateCard();
}

updateCard();
