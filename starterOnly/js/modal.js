function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
      x.className += " responsive";
  } else {
      x.className = "topnav";
  }
}

//Declaration const global
const modalbg = document.querySelector(".bground");           //.bground correspond au modal
const modalBtn = document.querySelectorAll(".modal-btn");     //.modal-btn correspond au btn je m'inscrit ce qui permet d'ouvrir le modal
const modalBtnX = document.querySelector(".close");            //ferme le modal avc le btn X en haut a droite
const formData = document.querySelectorAll(".formData");        //formData correspond a chaque saisi (input checkbox et radio)
const form = document.getElementById("form");                   //represente le formulaire
const validForm = document.querySelector(".validationForm");    //validationForm represente la cloture du modal avc le btn feremr

//  Implémenter entrées du formulaire
const prenom = document.getElementById("first");
const nom = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const locationTournament = document.getElementsByName("location");
const condition = document.getElementById("checkbox1");
const validMessage = document.getElementById("validMessage");
const btnValid = document.getElementById("btnValid");

// Div de verification des champs
const firstVerif = document.getElementById("firstVerif");
const lastVerif = document.getElementById("lastVerif");
const emailVerif = document.getElementById("emailVerif");


// Parametre Modal ouverture, fermeture ...
modalBtn.forEach((btn) => btn.addEventListener("click", openModal));


function openModal() {
  modalbg.style.display = "block";
}

function hideModal() {
  modalbg.style.display = "none";
};


//  fermeture du modale avec le bouton X en haut a droite (Évènement click utilise)
modalBtnX.addEventListener("click", function() {modalbg.style.display = "none";});


// RegExp et controle
let regExText = new RegExp('^([A-Za-z]{2,20})?([-]{0,1})?([A-Za-z]{2,20})$');

let regExEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}$');


//  style const Sucess

const setSuccess = (element)  => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  const errorInput = inputControl.querySelector('input');
  errorDisplay.innerText = '';
  errorDisplay.classList.add('text-succes');
  errorInput.classList.add('border-succes');
};


// style const Error

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorDisplay = inputControl.querySelector('.error');
  const errorInput = inputControl.querySelector('input');
 errorDisplay.innerText = message;
  errorDisplay.classList.add('text-danger');
  errorInput.classList.add('border-danger');
}

// verifie nom prenom email
function dataValidate(input,regEx,msg,label,border) {

  let testValid = regEx.test(input.value);

  if(testValid) {
      label.innerHTML = "";
      label.classList.remove('text-danger');
      label.classList.add('text-succes');
      border.classList.remove('border-danger');
      border.classList.add('border-succes');
      return true;
  }else {
      label.innerHTML = msg;
      label.classList.remove('text-succes');
      label.classList.add('text-danger');
      border.classList.remove('border-succes');
      border.classList.add('border-danger');
      return false;
  }
}


// verifie date de naissance
birthdate.addEventListener('change', function() {
  validBirthdate(this);
});

const validBirthdate = function() {
  const date = new Date(birthdate.value);
  const ageDif = Date.now() - date.getTime();
  const ageDate = new Date(ageDif);
  const age = Math.abs(ageDate.getUTCFullYear() - 1970);


  if( birthdate == null || birthdate.value == '') {
      setError(birthdate, 'Veuillez entrer une date de naissance valide');
      return false;
  }
  else if (age < 16){
       setError(birthdate, 'Vous devez avoir au moins 16 ans');
      return false;
  }
  else {
      setSuccess(birthdate);
      return true;
  };
}


// verifie nb de tournoi
quantity.addEventListener('change', function() {
  validQuantity(this);
});

const validQuantity = function() {
  if( quantity == null || quantity.value == '') {
     setError(quantity, 'Merci d\'indiquer le nombre de tournois');
      return false;
  }else
      setSuccess(quantity);
  return true;

};


//  Verification des villes la boucle for permet de parcourrir la liste des villes
function verifLocationTournament() {
  let locTournamentCheck = false;
  for(let i = 0; i < locationTournament.length; i++) {
      const isCheck = locationTournament[i].checked;
      if(isCheck) {
          locTournamentCheck = true;
          return true;
      }
  }
  return false;
}

locationTournament.forEach((checkedBoxInput) => checkedBoxInput.addEventListener('change', function() {
  validLocationTournament();
}));

function validLocationTournament() {
if(! verifLocationTournament()) {
  locationVerif.innerHTML = "Merci de cocher une ville";
  locationVerif.classList.add('text-danger');
    return false;
} else {
  locationVerif.innerHTML = "";
    return true;
}
}


// condition general
condition.addEventListener('change', function() {
  validCondition(this);
});

// Vérifie si les conditions sont biens cochées ou non
const validCondition = function() {
  if(condition.checked == false ) {

      setError(checkbox1, "Merci d'accepter les conditions d'utilisations saiyan");
      return false;

  }else {
      setSuccess(checkbox1);
      return true;
  
  }
};


const  modalFormulaireEnd = () => {
  form.style.display = "none";
  validForm.style.display = "flex";
  validMessage.innerHTML = "Merci pour votre inscription";

}


function validate() {
  // Condition qui vérifie si tous les autres conditions retourne true
  if (dataValidate(prenom, regExText, "Veuillez saisir un prénom avec au moins 2 caractères", firstVerif, prenom)
      && dataValidate(nom, regExText, "Veuillez saisir un nom avec au moins 2 caractères", lastVerif, nom)
      && dataValidate(email, regExEmail, "Veuillez entrer un email valide", emailVerif, email)
      && validBirthdate(birthdate)
      && validQuantity(quantity)
      && validLocationTournament()
      && validCondition(condition)) {

      modalFormulaireEnd();
      modalBtnX.addEventListener("click", function() {
          window.location.reload();
      });
      
  }

}



//Rechargement du formulaire

btnValid.addEventListener("click", function() {
  window.location.reload();
});

