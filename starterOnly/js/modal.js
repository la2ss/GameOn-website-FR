function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));

// launch modal form
function launchModal() {
  modalbg.style.display = "block";
}


// TODO 1 fermer la modale avec le bouton X en haut a droite (Évènement click utilise)
const modalBtnX = document.querySelector(".close");

modalBtnX.addEventListener("click", function() {    
  modalbg.style.display = "none";                        
});