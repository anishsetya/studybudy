const questions = [
    {
      question: "What is the capital of France?",
      correctAnswer: "Paris",
      userAnswer: "Paris",
      options: ["Paris", "London", "Berlin", "Madrid"]
    },
    {
      question: "What is 2 + 2?",
      correctAnswer: "4",
      userAnswer: "5",
      options: ["3", "4", "5", "6"]
    }
  ];
  
  let currentIndex = 0;
  
  function renderQuestion(index) {
    const q = questions[index];
    document.getElementById("question").textContent = `Q${index + 1}: ${q.question}`;
    const optionsEl = document.getElementById("options");
    optionsEl.innerHTML = "";
  
    q.options.forEach(opt => {
      const btn = document.createElement("button");
      btn.className = "btn w-100";
  
      if (opt === q.correctAnswer && opt === q.userAnswer) {
        btn.classList.add("btn-success");
      } else if (opt === q.userAnswer && opt !== q.correctAnswer) {
        btn.classList.add("btn-danger");
      } else if (opt === q.correctAnswer) {
        btn.classList.add("btn-success");
      } else {
        btn.classList.add("btn-outline-primary");
      }
  
      btn.textContent = opt;
      btn.disabled = true;
      optionsEl.appendChild(btn);
    });
  
    highlightNav();
  }
  
  function updateStats() {
    const correct = questions.filter(q => q.correctAnswer === q.userAnswer).length;
    const incorrect = questions.length - correct;
    document.getElementById("correctCount").textContent = correct;
    document.getElementById("incorrectCount").textContent = incorrect;

    const scoreDisplay = document.getElementById("finalScore");
    scoreDisplay.textContent = `Score = ${correct} / ${questions.length} `;
  }
  
  
  function createNav() {
    const nav = document.getElementById("questionNav");
    nav.innerHTML = "";
    questions.forEach((q, i) => {
      const btn = document.createElement("button");
      btn.textContent = i + 1;
      btn.className = "btn";
      btn.classList.add(q.userAnswer === q.correctAnswer ? "btn-success" : "btn-danger");
      btn.onclick = () => {
        currentIndex = i;
        renderQuestion(i);
      };
      nav.appendChild(btn);
    });
  }
  
  function highlightNav() {
    const navBtns = document.querySelectorAll("#questionNav .btn");
    navBtns.forEach((btn, i) => {
      btn.style.borderWidth = i === currentIndex ? "2px" : "1px";
    });
  }
  
  document.getElementById("backBtn").onclick = () => {
    if (currentIndex > 0) {
      currentIndex--;
      renderQuestion(currentIndex);
    }
  };
  
  document.getElementById("nextBtn").onclick = () => {
    if (currentIndex < questions.length - 1) {
      currentIndex++;
      renderQuestion(currentIndex);
    }
  };
  
  updateStats();
  createNav();
  renderQuestion(currentIndex);
  