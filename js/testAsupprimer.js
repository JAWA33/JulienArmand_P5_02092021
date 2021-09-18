//! ----------------GESTION DU FORMULAIRE avec REGEX ------------------------------/
//* Selection du formulaire : --------------------------------------/
let adressForm = document.getElementById("deliveryAdress");

//* Action au remplissage des inputs "change" : selection dans le formulaire par name="xxxx" dans le HTML *****************/
adressForm.email.addEventListener("change", function () {
  validEmail(this);
});

adressForm.lastName.addEventListener("change", function () {
  validName(this);
});

adressForm.firstName.addEventListener("change", function () {
  validName(this);
});

adressForm.city.addEventListener("change", function () {
  validName(this);
});

adressForm.adress.addEventListener("change", function () {
  validAdress(this);
});

adressForm.phone.addEventListener("change", function () {
  validPhone(this);
});

adressForm.code.addEventListener("change", function () {
  validCode(this);
});

//console.log(adressForm.nom.value);

//* Vérification des inputs :*****************/
const validEmail = (inputEmail) => {
  let regexEmail = new RegExp(
    "^[A-Za-z0-9.-_--]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$",
    "g"
  );

  let testEmail = regexEmail.test(inputEmail.value);
  let smallText = inputEmail.nextElementSibling;
  console.log(testEmail);
  console.log(smallText);

  if (testEmail) {
    smallText.innerHTML = "Adresse valide";

    smallText.classList.remove("smallText__error");
    smallText.classList.add("smallText", "smallText__sucess");
  } else {
    smallText.innerHTML =
      "Non valide : doit contenir une adresse valide de type : maxxxxxxx@adresse.xxx";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
  }
};

const validName = (inputName) => {
  let regexName = new RegExp("^[A-Za-z--]{3,20}$", "g");

  let testName = regexName.test(inputName.value);
  let smallText = inputName.nextElementSibling;
  console.log(testName);
  console.log(smallText);

  if (testName) {
    smallText.innerHTML = "Validé ";

    smallText.classList.remove("smallText__error");
    smallText.classList.add("smallText", "smallText__sucess");
  } else {
    smallText.innerHTML =
      "Non valide : doit contenir plus de 3 lettres minuscules ou/et Majuscules";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
  }
};

const validPhone = (inputPhone) => {
  let regexPhone = new RegExp("^[0-9]{10}$", "g");
  let testPhone = regexPhone.test(inputPhone.value);
  let smallText = inputPhone.nextElementSibling;
  console.log(testPhone);
  console.log(smallText);

  if (testPhone) {
    smallText.innerHTML = "Validé ";

    smallText.classList.remove("smallText__error");
    smallText.classList.add("smallText", "smallText__sucess");
  } else {
    smallText.innerHTML =
      "Non valide : doit contenir uniquement 10 chiffres sans espace ni séparateur";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
  }
};

const validAdress = (inputAdress) => {
  let regexAdress = new RegExp("^[A-Za-z0-9.;,]{10,40}$", "g");
  let testAdress = regexAdress.test(inputAdress.value);
  let smallText = inputAdress.nextElementSibling;
  console.log(testAdress);
  console.log(smallText);

  if (testAdress) {
    smallText.innerHTML = "Validé ";

    smallText.classList.remove("smallText__error");
    smallText.classList.add("smallText", "smallText__sucess");
  } else {
    smallText.innerHTML = "Non valide : Doit être de type 39,rue du truc";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
  }
};

const validCode = (inputCode) => {
  let regexCode = new RegExp("^[0-9]{5}$", "g");
  let testCode = regexCode.test(inputCode.value);
  let smallText = inputCode.nextElementSibling;
  console.log(testCode);
  console.log(smallText);

  if (testCode) {
    smallText.innerHTML = "Validé ";

    smallText.classList.remove("smallText__error");
    smallText.classList.add("smallText", "smallText__sucess");
  } else {
    smallText.innerHTML = "Non valide : uniquement un code de 5 chiffres";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
  }
};

//! -------------------------REGEX ------------------------------/
