document.getElementById("flashcardForm").addEventListener("submit", function (e) {
    e.preventDefault();
  
    const fileInput = document.getElementById("pdfFile");
    const numQuestions = parseInt(document.getElementById("numQuestions").value);
    const difficulty = document.getElementById("difficulty").value;
  
    if (!fileInput.files.length) {
      alert("Please upload a PDF file.");
      return;
    }
  
    const fileName = fileInput.files[0].name;
    const query = `file=${encodeURIComponent(fileName)}&num=${numQuestions}&difficulty=${difficulty}`;
  
    // In real app: upload file via FormData or let backend handle it on submission
  
    // Redirect to flashcards page
    window.location.href = `flashcards.html?${query}`;
  });
  