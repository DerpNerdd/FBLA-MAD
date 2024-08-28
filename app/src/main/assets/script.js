document.addEventListener("DOMContentLoaded", () => {
  console.log("Script loaded successfully");

  // Setting up event listeners
  let signup = document.querySelector(".signup");
  let login = document.querySelector(".login");
  let slider = document.querySelector(".slider");
  let formSection = document.querySelector(".form-section");

  if (signup && login && slider && formSection) {
    signup.addEventListener("click", () => {
      slider.classList.add("moveslider");
      formSection.classList.add("form-section-move");
    });

    login.addEventListener("click", () => {
      slider.classList.remove("moveslider");
      formSection.classList.remove("form-section-move");
    });
  }
});

// Define the auth function globally
window.auth = function () {
  console.log("Auth function called");

  // Correct the selectors for email and password fields
  let emailInput = document.getElementById("login-email") || document.getElementById("signup-email");
  let passwordInput = document.getElementById("login-password") || document.getElementById("signup-password");

  if (!emailInput || !passwordInput) {
    console.error("Email or Password input not found");
    return;
  }

  let email = emailInput.value;
  let password = passwordInput.value;

  if (email === "admin@gmail.com" && password === "1234") {
    window.location.assign("homepage.html");
  } else {
    alert("Invalid information");
  }
};



let level = document.getElementById("level");
let counter = 0;


setInterval(() => {
    if(counter == 65){
        clearInterval();
    }
    else{
        counter += 1;
        level.innerHTML = "Level " + counter 
    }

}, 30);
