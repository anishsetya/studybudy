document.addEventListener("DOMContentLoaded", function() {
    console.log("login.js loaded and DOMContentLoaded fired");
  
    // Get the login form
    const loginForm = document.querySelector("form");
  
    if (!loginForm) {
      console.error("Login form not found in DOM");
      return;
    }
  
    // Add submit event listener to the form
    loginForm.addEventListener("submit", function(e) {
      e.preventDefault(); // Prevent default form submission
      console.log("Login form submitted");
  
      // Redirect to the StudyBuddy homepage (homepage.html with tile carousel)
      window.location.href = "homepage.html";
    });
  });