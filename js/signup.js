// document.addEventListener("DOMContentLoaded", function () {
//     const loginForm = document.getElementById("singupForm");
  
//     if (!loginForm) {
//       console.error("Login form not found in DOM");
//       return;
//     }
  
//     loginForm.addEventListener("submit", function (e) {
//       e.preventDefault();
//       console.log("Login form submitted");
//       const username = document.getElementById("name").value;
//       const password = document.getElementById("password").value;
//       const email = document.getElementById("email").value;
//       console.log(username,password,email)
//       //window.location.href = "homepage.html";
//     });
//   });
  



document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
  
    if (!signupForm) {
      console.error("Signup form not found in DOM");
      return;
    }
  
    signupForm.addEventListener("submit", function (e) {
      e.preventDefault();
      const username = document.getElementById("username").value;
      const password = document.getElementById("password").value;
      const email = document.getElementById("email").value;
      fetch("http://127.0.0.1:8000/api/register/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ username, password, email })
      })
        .then(response => response.json())
        .then(data => {
          if (data.message === "User created successfully") {
            console.log("Signup successful");
            window.location.href = "login.html"; // Redirect to homepage on success
          } else {
            console.error("Signup failed:", data.error);
          }
        })
        .catch(error => console.error("Error:", error));
    });
});
  