document.addEventListener("DOMContentLoaded", function() {
  console.log("flashcard.js loaded and DOMContentLoaded fired");

  const flashcard = document.querySelector(".flashcard");
  const front = document.querySelector(".front");
  const back = document.querySelector(".back");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  if (!flashcard || !front || !back || !prevBtn || !nextBtn) {
    console.error("Required elements not found in DOM", { flashcard, front, back, prevBtn, nextBtn });
    if (front) front.textContent = "Error: Elements not found";
    if (back) back.textContent = "";
    return;
  }

  console.log("Elements found:", { flashcard, front, back, prevBtn, nextBtn });

  let index = 0;
  let cards = [];

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const questionsParam = urlParams.get("questions");
  const numQuestions = parseInt(urlParams.get("num")) || 3;
  const difficulty = urlParams.get("difficulty") || "medium";

  console.log("URL Parameters:", { questionsParam, numQuestions, difficulty });

  try {
    if (questionsParam) {
      const decodedQuestions = decodeURIComponent(questionsParam);
      console.log("Decoded questions:", decodedQuestions);
      cards = JSON.parse(decodedQuestions);
      console.log("Parsed cards:", cards);

      if (!Array.isArray(cards) || cards.length === 0) {
        throw new Error("Invalid or empty questions data");
      }
      cards = cards.slice(0, numQuestions);
    } else {
      console.warn("No questions provided in URL, using default cards");
      cards = [
        { front: "What is the powerhouse of the cell?", back: "Mitochondria" },
        { front: "What planet is known as the Red Planet?", back: "Mars" },
        { front: "What is the capital of Japan?", back: "Tokyo" }
      ];
    }
  } catch (e) {
    console.error("Error parsing questions:", e);
    cards = [
      { front: "Error", back: "Failed to load questions" }
    ];
  }

  console.log("Final cards array:", cards);

  function updateCard() {
    console.log("updateCard called with index:", index);
    if (cards.length === 0) {
      console.warn("No cards available to display");
      front.textContent = "No cards available";
      back.textContent = "";
      return;
    }

    const currentCard = cards[index];
    if (currentCard) {
      front.textContent = currentCard.front || "No question";
      back.textContent = currentCard.back || "No answer";
      flashcard.classList.remove("flipped");
      console.log("Updated card:", index, currentCard);
    } else {
      console.warn("Card at index not found:", index);
      front.textContent = "Card not found";
      back.textContent = "";
    }
  }

  function flipCard() {
    console.log("flipCard called");
    flashcard.classList.toggle("flipped");
  }

  function nextCard() {
    console.log("nextCard called");
    index = (index + 1) % cards.length;
    updateCard();
  }

  function prevCard() {
    console.log("prevCard called");
    index = (index - 1 + cards.length) % cards.length;
    updateCard();
  }

  // Attach event listeners
  flashcard.addEventListener("click", flipCard);
  nextBtn.addEventListener("click", nextCard);
  prevBtn.addEventListener("click", prevCard);

  // Initial update
  console.log("Calling initial updateCard");
  updateCard();
});