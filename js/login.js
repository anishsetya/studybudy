document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("loginForm");

  if (!loginForm) {
    console.error("Login form not found in DOM");
    return;
  }

  loginForm.addEventListener("submit", function (e) {
    e.preventDefault();
    console.log("Login form submitted");

    window.location.href = "homepage.html";
  });
});
