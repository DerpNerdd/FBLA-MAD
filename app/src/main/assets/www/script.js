
// All is for the login/signup
let signup = document.querySelector(".signup");
let login = document.querySelector(".login");
let slider = document.querySelector(".slider");
let formSection = document.querySelector(".form-section");

signup.addEventListener("click", () => {
    slider.classList.add("moveslider");
    formSection.classList.add("form-section-move");
});

login.addEventListener("click", () => {
    slider.classList.remove("moveslider");
    formSection.classList.remove("form-section-move");
});

// Once user logins or creates an account redirects to the homepage

function auth (){
    var email = document.getElementById('email').value;
    var password = document.getElementById('password').value;

    if(email == 'admin@gmail.com' && password == 1234){
        window.location.assign('homepage.html');
    }
    else{
        alert('Invalid information');
        return;
    }
}

// When the user scrolls the page, execute myFunction
window.onscroll = function() {myFunction()};

// Get the navigation
var navigation = document.getElementById("navigation");

// Get the offset position of the navigation
var sticky = navigation.offsetTop;

// Add the sticky class to the navigation when you reach its scroll position. Remove "sticky" when you leave the scroll position
function myFunction() {
  if (window.scrollY >= sticky) {
    navigation.classList.add("sticky")
  } else {
    navigation.classList.remove("sticky");
  }
}