// document.getElementById("flashcardForm").addEventListener("submit", function (e) {
//     e.preventDefault();
  
//     const fileInput = document.getElementById("pdfFile");
//     const numQuestions = parseInt(document.getElementById("numQuestions").value);
//     const difficulty = document.getElementById("difficulty").value;
  
//     if (!fileInput.files.length) {
//       alert("Please upload a PDF file.");
//       return;
//     }
  
//     const fileName = fileInput.files[0].name;
//     const query = `file=${encodeURIComponent(fileName)}&num=${numQuestions}&difficulty=${difficulty}`;
    
//     window.location.href = `flashcards.html?${query}`;
//   });

document.getElementById("flashcardForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const fileInput = document.getElementById("pdfFile");
  const numQuestions = document.getElementById("numQuestions").value;
  const difficulty = document.getElementById("difficulty").value;

  if (!fileInput.files.length) {
    alert("Please upload a PDF file.");
    return;
  }

  const formData = new FormData();
  formData.append("pdfFile", fileInput.files[0]);
  formData.append("num", numQuestions);
  formData.append("difficulty", difficulty);

  fetch("http://127.0.0.1:8000/api/flashcards/", {
    method: "POST",
    body: formData
  })
  .then(response => response.json())
  .then(data => {
    if (data.cards && Array.isArray(data.cards)) {
      // Pass the cards as a URL parameter (encode as JSON)
      const questionsParam = encodeURIComponent(JSON.stringify(data.cards));
      const query = `?questions=${questionsParam}&num=${numQuestions}&difficulty=${encodeURIComponent(difficulty)}`;
      window.location.href = "flashcards.html" + query;
    } else {
      alert("Flashcard generation failed: " + (data.error || "Unknown error"));
    }
  })
  .catch(error => alert("Error: " + error));
});

