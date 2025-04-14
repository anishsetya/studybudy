// document.addEventListener("DOMContentLoaded", function() {
//   console.log("flashcard.js loaded and DOMContentLoaded fired");

//   const flashcard = document.querySelector(".flashcard");
//   const front = document.querySelector(".front");
//   const back = document.querySelector(".back");
//   const prevBtn = document.querySelector(".prev-btn");
//   const nextBtn = document.querySelector(".next-btn");
//   const reshuffleBtn = document.querySelector(".reshuffle-btn");

//   if (!flashcard || !front || !back || !prevBtn || !nextBtn || !reshuffleBtn) {
//     console.error("Required elements not found in DOM", { flashcard, front, back, prevBtn, nextBtn, reshuffleBtn });
//     if (front) front.textContent = "Error: Elements not found";
//     if (back) back.textContent = "";
//     return;
//   }

//   console.log("Elements found:", { flashcard, front, back, prevBtn, nextBtn, reshuffleBtn });

//   let index = 0;
//   let cards = [];

//   // Shuffle function to randomize array order
//   function shuffle(array) {
//     for (let i = array.length - 1; i > 0; i--) {
//       const j = Math.floor(Math.random() * (i + 1));
//       [array[i], array[j]] = [array[j], array[i]];
//     }
//     console.log("Shuffled cards:", array);
//   }

//   // Get URL parameters
//   const urlParams = new URLSearchParams(window.location.search);
//   const questionsParam = urlParams.get("questions");
//   const numQuestions = parseInt(urlParams.get("num")) || 3;
//   const difficulty = urlParams.get("difficulty") || "medium";

//   console.log("URL Parameters:", { questionsParam, numQuestions, difficulty });

//   try {
//     if (questionsParam) {
//       const decodedQuestions = decodeURIComponent(questionsParam);
//       console.log("Decoded questions:", decodedQuestions);
//       cards = JSON.parse(decodedQuestions);
//       console.log("Parsed cards:", cards);

//       if (!Array.isArray(cards) || cards.length === 0) {
//         throw new Error("Invalid or empty questions data");
//       }
//       cards = cards.slice(0, numQuestions);
//     } else {
//       console.warn("No questions provided in URL, using default cards");
//       cards = [
//         { front: "What is the powerhouse of the cell?", back: "Mitochondria" },
//         { front: "What planet is known as the Red Planet?", back: "Mars" },
//         { front: "What is the capital of Japan?", back: "Tokyo" }
//       ];
//     }
//   } catch (e) {
//     console.error("Error parsing questions:", e);
//     cards = [
//       { front: "Error", back: "Failed to load questions" }
//     ];
//   }

//   // Shuffle the cards after loading
//   if (cards.length > 1) {
//     shuffle(cards);
//   }

//   console.log("Final cards array (after initial shuffle):", cards);

//   function updateCard() {
//     console.log("updateCard called with index:", index);
//     if (cards.length === 0) {
//       console.warn("No cards available to display");
//       front.textContent = "No cards available";
//       back.textContent = "";
//       return;
//     }

//     const currentCard = cards[index];
//     if (currentCard) {
//       front.textContent = currentCard.front || "No question";
//       back.textContent = currentCard.back || "No answer";
//       console.log("Updated card:", index, currentCard);
//     } else {
//       console.warn("Card at index not found:", index);
//       front.textContent = "Card not found";
//       back.textContent = "";
//     }
//   }

//   function flipCard() {
//     console.log("flipCard called");
//     // Ensure transition is enabled for manual flips
//     flashcard.style.transition = "transform 0.6s ease, scale 0.3s ease";
//     flashcard.classList.toggle("flipped");
//   }

//   function navigateToCard(newIndex) {
//     // Disable transition to make the change instantaneous
//     flashcard.style.transition = "none";
//     // Ensure the card is unflipped
//     flashcard.classList.remove("flipped");
//     // Update the index and content
//     index = newIndex;
//     updateCard();
//     // Re-enable transition for future manual flips
//     setTimeout(() => {
//       flashcard.style.transition = "transform 0.6s ease, scale 0.3s ease";
//     }, 0);
//   }

//   function nextCard() {
//     console.log("nextCard called");
//     const newIndex = (index + 1) % cards.length;
//     navigateToCard(newIndex);
//   }

//   function prevCard() {
//     console.log("prevCard called");
//     const newIndex = (index - 1 + cards.length) % cards.length;
//     navigateToCard(newIndex);
//   }

//   function reshuffleCards() {
//     console.log("reshuffleCards called");
//     if (cards.length > 1) {
//       shuffle(cards);
//       navigateToCard(0); // Reset to the first card after shuffling
//     }
//   }

//   // Attach event listeners
//   flashcard.addEventListener("click", flipCard);
//   nextBtn.addEventListener("click", nextCard);
//   prevBtn.addEventListener("click", prevCard);
//   reshuffleBtn.addEventListener("click", reshuffleCards);

//   // Initial update
//   console.log("Calling initial updateCard");
//   updateCard();
// });

document.addEventListener("DOMContentLoaded", function() {
  const flashcard = document.querySelector(".flashcard");
  const front = document.querySelector(".front");
  const back = document.querySelector(".back");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");
  const reshuffleBtn = document.querySelector(".reshuffle-btn");

  if (!flashcard || !front || !back || !prevBtn || !nextBtn || !reshuffleBtn) {
    if (front) front.textContent = "Error: Elements not found";
    if (back) back.textContent = "";
    return;
  }

  let index = 0;
  let cards = [];

  // Shuffle function
  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }

  // Get URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const questionsParam = urlParams.get("questions");
  const numQuestions = parseInt(urlParams.get("num")) || 3;

  try {
    if (questionsParam) {
      const decodedQuestions = decodeURIComponent(questionsParam);
      cards = JSON.parse(decodedQuestions);
      if (!Array.isArray(cards) || cards.length === 0) {
        throw new Error("Invalid or empty questions data");
      }
      cards = cards.slice(0, numQuestions);
    } else {
      cards = [
        { front: "What is the powerhouse of the cell?", back: "Mitochondria" },
        { front: "What planet is known as the Red Planet?", back: "Mars" },
        { front: "What is the capital of Japan?", back: "Tokyo" }
      ];
    }
  } catch (e) {
    cards = [
      { front: "Error", back: "Failed to load questions" }
    ];
  }

  if (cards.length > 1) {
    shuffle(cards);
  }

  function updateCard() {
    if (cards.length === 0) {
      front.textContent = "No cards available";
      back.textContent = "";
      return;
    }
    const currentCard = cards[index];
    front.textContent = currentCard.front || "No question";
    back.textContent = currentCard.back || "No answer";
  }

  function flipCard() {
    flashcard.style.transition = "transform 0.6s ease, scale 0.3s ease";
    flashcard.classList.toggle("flipped");
  }

  function navigateToCard(newIndex) {
    flashcard.style.transition = "none";
    flashcard.classList.remove("flipped");
    index = newIndex;
    updateCard();
    setTimeout(() => {
      flashcard.style.transition = "transform 0.6s ease, scale 0.3s ease";
    }, 0);
  }

  function nextCard() {
    const newIndex = (index + 1) % cards.length;
    navigateToCard(newIndex);
  }

  function prevCard() {
    const newIndex = (index - 1 + cards.length) % cards.length;
    navigateToCard(newIndex);
  }

  function reshuffleCards() {
    if (cards.length > 1) {
      shuffle(cards);
      navigateToCard(0);
    }
  }

  // Attach event listeners
  flashcard.addEventListener("click", flipCard);
  nextBtn.addEventListener("click", nextCard);
  prevBtn.addEventListener("click", prevCard);
  reshuffleBtn.addEventListener("click", reshuffleCards);

  // Initial update
  updateCard();
});

