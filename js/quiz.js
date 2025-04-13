let index = 0;
let questions = [];
let userAnswers = [];
let selectedAnswer = null;
let score = 0;
let timer;
let timeLeft = 30 * 60;

const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const timerEl = document.getElementById("timer");

const notVisitedEl = document.getElementById("notVisited");
const notAnsweredEl = document.getElementById("notAnswered");
const answeredEl = document.getElementById("answered");
const markedReviewEl = document.getElementById("markedReview");
const answeredMarkedEl = document.getElementById("answeredMarked");
const questionNav = document.getElementById("questionNav");

const saveNextBtn = document.getElementById("saveNext");
const saveReviewBtn = document.getElementById("saveReview");
const clearResponseBtn = document.getElementById("clearResponse");
const markReviewBtn = document.getElementById("markReview");
const nextBtn = document.getElementById("nextBtn");
const backBtn = document.getElementById("backBtn");

const status = [];

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    const min = Math.floor(timeLeft / 60);
    const sec = timeLeft % 60;
    timerEl.textContent = `${min}:${sec < 10 ? "0" + sec : sec}`;
    if (timeLeft <= 0) {
      clearInterval(timer);
      submitQuiz();
    }
  }, 1000);
}

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function initQuiz() {
  questions = [
    { question: "What is the capital of France?", correctAnswer: "Paris", options: ["Paris", "London", "Berlin", "Madrid"] },
    { question: "What is 2 + 2?", correctAnswer: "4", options: ["4", "3", "5", "6"] },
    { question: "What is the largest planet?", correctAnswer: "Jupiter", options: ["Jupiter", "Mars", "Earth", "Saturn"] }
  ];

  questions.forEach(q => shuffle(q.options));
  shuffle(questions);
  userAnswers = new Array(questions.length).fill(null);

  for (let i = 0; i < questions.length; i++) {
    status[i] = "notVisited";
    const btn = document.createElement("button");
    btn.textContent = i + 1;
    btn.className = "btn btn-outline-secondary";
    btn.onclick = () => gotoQuestion(i);
    questionNav.appendChild(btn);
  }

  updateStatusPanel();
  startTimer();
  displayQuestion();
}

function displayQuestion() {
  const q = questions[index];
  questionEl.textContent = `Q${index + 1}: ${q.question}`;
  optionsEl.innerHTML = "";
  selectedAnswer = userAnswers[index];

  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = `btn w-100 ${selectedAnswer === opt ? "btn-info" : "btn-outline-primary"}`;
    btn.onclick = () => {
      selectedAnswer = opt;
      userAnswers[index] = opt;
      displayQuestion();
    };
    optionsEl.appendChild(btn);
  });
}

function gotoQuestion(i) {
  index = i;
  if (status[i] === "notVisited") status[i] = "notAnswered";
  displayQuestion();
  updateStatusPanel();
}

function updateStatusPanel() {
  const counts = {
    notVisited: 0,
    notAnswered: 0,
    answered: 0,
    marked: 0,
    answeredMarked: 0
  };

  status.forEach((s, i) => {
    counts[s]++;
    const btn = questionNav.children[i];
    btn.className = "btn btn-sm ";
    if (s === "notVisited") btn.classList.add("btn-outline-secondary");
    else if (s === "notAnswered") btn.classList.add("btn-danger");
    else if (s === "answered") btn.classList.add("btn-success");
    else if (s === "marked") btn.classList.add("btn-warning");
    else if (s === "answeredMarked") btn.classList.add("btn-primary");
  });

  notVisitedEl.textContent = counts.notVisited;
  notAnsweredEl.textContent = counts.notAnswered;
  answeredEl.textContent = counts.answered;
  markedReviewEl.textContent = counts.marked;
  answeredMarkedEl.textContent = counts.answeredMarked;
}

function saveAndNext(mark = false, review = false) {
  if (selectedAnswer) {
    status[index] = review ? "answeredMarked" : "answered";
  } else {
    status[index] = review ? "marked" : "notAnswered";
  }
  updateStatusPanel();
  index = (index + 1) % questions.length;
  displayQuestion();
}

function clearResponse() {
  userAnswers[index] = null;
  selectedAnswer = null;
  status[index] = "notAnswered";
  displayQuestion();
  updateStatusPanel();
}

function submitQuiz() {
  clearInterval(timer);
  window.location.href = "quiz_result.html";
}


saveNextBtn.onclick = () => saveAndNext(false, false);
saveReviewBtn.onclick = () => saveAndNext(true, true);
clearResponseBtn.onclick = clearResponse;
markReviewBtn.onclick = () => saveAndNext(false, true);
nextBtn.onclick = () => {
  index = (index + 1) % questions.length;
  displayQuestion();
};
backBtn.onclick = () => {
  index = (index - 1 + questions.length) % questions.length;
  displayQuestion();
};

initQuiz();
