document.addEventListener("DOMContentLoaded", async function() {
    console.log("quiz.js loaded and DOMContentLoaded fired");
  
    const questionEl = document.getElementById("question");
    const optionsEl = document.getElementById("options");
    const checkBtn = document.querySelector(".check-btn");
    const nextBtn = document.querySelector(".next-btn");
    const resultEl = document.getElementById("result");
    const scoreEl = document.getElementById("score");
    const totalEl = document.getElementById("total");
  
    if (!questionEl || !optionsEl || !checkBtn || !nextBtn || !resultEl || !scoreEl || !totalEl) {
      console.error("Required elements not found in DOM");
      if (questionEl) questionEl.textContent = "Error: Elements not found";
      return;
    }
  
    let index = 0;
    let questions = [];
    let userAnswers = [];
    let score = 0;
    let selectedAnswer = null;
  
    // Shuffle function to randomize array order
    function shuffle(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      console.log("Shuffled array:", array);
    }
  
    // Fetch questions from backend
    try {
      const response = await fetch("http://your-backend-api/quizzes"); // Replace with your actual backend endpoint
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      questions = await response.json();
      console.log("Fetched questions from backend:", questions);
  
      if (!Array.isArray(questions) || questions.length === 0) {
        throw new Error("Invalid or empty questions data from backend");
      }
  
      // Shuffle the options for each question
      questions.forEach(question => {
        if (question.options && Array.isArray(question.options)) {
          shuffle(question.options);
        }
      });
  
      // Shuffle the questions array
      if (questions.length > 1) {
        shuffle(questions);
      }
    } catch (e) {
      console.error("Error fetching questions:", e);
      // Fallback to default questions if backend fails
      questions = [
        {
          question: "What is the capital of France?",
          correctAnswer: "Paris",
          options: ["Paris", "London", "Berlin", "Madrid"]
        },
        {
          question: "What is 2+2?",
          correctAnswer: "4",
          options: ["4", "3", "5", "6"]
        },
        {
          question: "What is the largest planet?",
          correctAnswer: "Jupiter",
          options: ["Jupiter", "Mars", "Earth", "Saturn"]
        }
      ];
      console.warn("Using default questions due to fetch error");
  
      // Shuffle default questions and options
      questions.forEach(question => {
        if (question.options && Array.isArray(question.options)) {
          shuffle(question.options);
        }
      });
      if (questions.length > 1) {
        shuffle(questions);
      }
    }
  
    console.log("Final questions array (after shuffle):", questions);
  
    function displayQuestion() {
      if (index >= questions.length) {
        showResult();
        return;
      }
  
      const currentQuestion = questions[index];
      questionEl.textContent = `Question ${index + 1}: ${currentQuestion.question}`;
      optionsEl.innerHTML = "";
      selectedAnswer = null;
  
      currentQuestion.options.forEach((option, i) => {
        const btn = document.createElement("button");
        btn.className = "btn btn-outline-primary w-100";
        btn.textContent = option;
        btn.addEventListener("click", () => selectAnswer(option));
        optionsEl.appendChild(btn);
      });
  
      checkBtn.disabled = true;
      nextBtn.disabled = true;
    }
  
    function selectAnswer(selected) {
      selectedAnswer = selected;
  
      // Highlight the selected answer (but don't reveal correct/incorrect yet)
      const buttons = optionsEl.querySelectorAll("button");
      buttons.forEach(btn => {
        if (btn.textContent === selected) {
          btn.classList.remove("btn-outline-primary");
          btn.classList.add("btn-info");
        } else {
          btn.classList.remove("btn-info");
          btn.classList.add("btn-outline-primary");
        }
      });
  
      checkBtn.disabled = false;
    }
  
    function checkAnswer() {
      if (!selectedAnswer) return;
  
      const currentQuestion = questions[index];
      userAnswers[index] = selectedAnswer;
      if (selectedAnswer === currentQuestion.correctAnswer) {
        score++;
      }
  
      // Highlight correct and incorrect answers
      const buttons = optionsEl.querySelectorAll("button");
      buttons.forEach(btn => {
        if (btn.textContent === currentQuestion.correctAnswer) {
          btn.classList.remove("btn-outline-primary", "btn-info");
          btn.classList.add("btn-success");
        } else if (btn.textContent === selectedAnswer && selectedAnswer !== currentQuestion.correctAnswer) {
          btn.classList.remove("btn-outline-primary", "btn-info");
          btn.classList.add("btn-danger");
        }
        btn.disabled = true;
      });
  
      checkBtn.disabled = true;
      nextBtn.disabled = false;
    }
  
    function showResult() {
      questionEl.style.display = "none";
      optionsEl.style.display = "none";
      checkBtn.style.display = "none";
      nextBtn.style.display = "none";
      resultEl.style.display = "block";
      scoreEl.textContent = score;
      totalEl.textContent = questions.length;
    }
  
    checkBtn.addEventListener("click", checkAnswer);
  
    nextBtn.addEventListener("click", () => {
      index++;
      displayQuestion();
    });
  
    // Initial display
    displayQuestion();
  });