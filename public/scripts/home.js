/*
// Get the button:
let mybutton = document.getElementById("topLink");

// When the user scrolls down 20px from the top of the document, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    mybutton.style.opacity = "100";
  } else {
    mybutton.style.opacity = "0";
  }
}

// When the user clicks on the button, scroll to the top of the document
function topFunction() {
//   document.body.scrollTop = 0; // For Safari
  document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}
*/

// get the button element
const btnScrollToTop = document.querySelector("#topLink");

// add event listener to button
btnScrollToTop.addEventListener("click", () => {
  // scroll to top of the page
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
