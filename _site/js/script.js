// PASTE THIS ENTIRE BLOCK TO REPLACE EVERYTHING IN YOUR SCRIPT.JS FILE

console.log("hello, world!");
console.log("sup bitch?");

//COPYRIGHT
const copyrightYearSpan = document.getElementById('copyright-year');
const currentYear = new Date().getFullYear();
copyrightYearSpan.textContent = currentYear;

//NAVBAR Hide links after click on small screens
// Find the checkbox element by its ID
const menuToggle = document.getElementById('menu-toggle');

// Find all the navigation links within your menu
const navLinks = document.querySelectorAll('a.nav-links');

// Loop through each of the navigation links
navLinks.forEach(link => {
    // Add a 'click' event listener to each one
    link.addEventListener('click', () => {
        // When a link is clicked, set the checkbox to 'unchecked'
        // This will trigger your CSS to hide the menu again! ✨
        if (menuToggle) {
            menuToggle.checked = false;
        }
    });
});
  
//BACK TO TOP BUTTON
// Get the button:
let mybutton = document.getElementById("back-to-top-bttn");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (mybutton && (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20)) {
    mybutton.style.display = "block";
  } else if (mybutton) {
    mybutton.style.display = "none";
  }
}

// When the user clicks on the button, scroll to the top of the document
function backToTop() {
  document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
// END UNIVERSAL PAGE FX
