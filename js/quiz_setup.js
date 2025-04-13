document.getElementById("quizSetupForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const file = document.getElementById("notesPdf").files[0];
  const difficulty = document.getElementById("difficulty").value;

  if (!file) {
    alert("Please upload a PDF file.");
    return;
  }

  // Simulate backend processing
  console.log("PDF uploaded:", file.name, "Difficulty:", difficulty);
  window.location.href = "quiz.html";
});
