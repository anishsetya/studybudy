// document.addEventListener("DOMContentLoaded", function () {
//   const loginForm = document.getElementById("loginForm");

//   if (!loginForm) {
//     console.error("Login form not found in DOM");
//     return;
//   }

//   loginForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     console.log("Login form submitted");
//     const username = document.getElementById("email").value;
//     const password = document.getElementById("password").value;
//     console.log(username)
//     console.log(password)
//     //window.location.href = "homepage.html";
//   });
// });


document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");
  if (!loginForm) {
    console.error("Login form not found");
    return;
  }
  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;
    fetch("http://127.0.0.1:8000/api/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
      if (data.token) {
        console.log("Login successful:", data.token);
        window.location.href = "homepage.html";
        // Save token to use for subsequent authenticated requests
      } else {
        console.error("Login failed:", data.error);
      }
    })
    .catch(error => console.error("Error:", error));
  });
});
