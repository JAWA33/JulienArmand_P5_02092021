console.log("connected!");
const postServer = "http://localhost:3000/api/cameras/order";

const result_Basket = document.getElementById("resultBasket");
const nbreTotal = document.getElementById("nbreTotal");
const priceTotal = document.getElementById("priceTotal");
const noBasket = document.getElementById("noBasket");
const clearBasket = document.getElementById("clearBasket");
const indexButton = document.getElementById("indexButton");
const alertMsg = document.getElementById("alertMsg");

let countPrice;
let actualPrice = 0;

//* Si le panier n'existe pas :  ---------------------------------------/
if (!myBasket) {
  noBasket.innerHTML = `<div class="noBasket">
    <p class="noBasket__text">Votre panier est actuellement vide</p>
  </div>
  `;
  indexButton.innerHTML = `<button class="btn btn--callToAction" id="goToIndex">Parcourir nos articles</button>
  `;
  //* Retour à l'index au click : ------------------------------/
  const goToIndex = document.getElementById("goToIndex");
  goToIndex.addEventListener("click", () => {
    window.location.href = "/index.html";
  });
  //* Suppression de l'adresse de livraison : ------------------------------/
  const deleteAdress = document.getElementById("deleteAdress");
  deleteAdress.innerHTML = "<div></div>";

  //* Si le panier existe :  ---------------------------------------/
} else {
  for (p = 0; p < actualBasket.length; p++) {
    result_Basket.insertAdjacentHTML(
      "beforeend",
      `
          <tr class="basketTable__row">
              <td class="basketTable__col basketTable__col--first">
                      ${actualBasket[p].name}
              </td>
              <td class="basketTable__col basketTable__col--second">${
                actualBasket[p].nbre
              }</td>
              <td class="basketTable__col basketTable__col--third">
              
              ${convertEuro(actualBasket[p].price) * actualBasket[p].nbre}€
              </td>
          </tr>
      `
    );

    countPrice =
      parseInt(actualPrice) +
      parseInt(actualBasket[p].nbre * actualBasket[p].price);
    actualPrice = countPrice;

    nbreTotal.innerText = actualNbre;
    priceTotal.innerText = convertEuro(actualPrice) + "€";
  }
}

//* Suppression du panier au click : ------------------------------/

clearBasket.addEventListener("click", (event) => {
  event.preventDefault();
  localStorage.removeItem("myBasket");
  window.location.href = "/html/panier.html";
});

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
    return true;
  } else {
    smallText.innerHTML =
      "Non valide : doit contenir une adresse valide de type : maxxxxxxx@adresse.xxx";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
    return false;
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
    return true;
  } else {
    smallText.innerHTML =
      "Non valide : doit contenir plus de 3 lettres minuscules ou/et Majuscules";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
    return false;
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
    return true;
  } else {
    smallText.innerHTML =
      "Non valide : doit contenir uniquement 10 chiffres sans espace ni séparateur";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
    return false;
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
    return true;
  } else {
    smallText.innerHTML = "Non valide : Doit être de type 39,rue du truc";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
    return false;
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
    return true;
  } else {
    smallText.innerHTML = "Non valide : uniquement un code de 5 chiffres";
    smallText.classList.remove("smallText__sucess");
    smallText.classList.add("smallText", "smallText__error");
    return false;
  }
};

//! -------------------------Fin REGEX ------------------------------------------/

//! ------------------ COMMANDE ------------------------------------------------/

//* Passage de la commande à la soumission du formulaire------------------------/

adressForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //* Si les regex sont tous validés : *****************************************/
  if (
    validEmail(adressForm.email) &&
    validName(adressForm.firstName) &&
    validName(adressForm.lastName) &&
    validName(adressForm.city) &&
    validAdress(adressForm.adress) &&
    validCode(adressForm.code) &&
    validPhone(adressForm.phone)
  ) {
    //console.log("inputs vérifiés");

    //* Création tableau les valeurs du formulaire à envoyer
    let contact = [];
    contact = {
      firstName: adressForm.firstName.value,
      lastName: adressForm.lastName.value,
      address: adressForm.city.value,
      city: adressForm.city.value,
      email: adressForm.email.value,
    };

    //* Création tableau les valeurs des produits à envoyer
    let productId = [];
    let addIdProduct = [];

    for (r = 0; r < actualBasket.length; r++) {
      (addIdProduct = actualBasket[r].id),
        // {
        //   _id:
        // };
        productId.push(addIdProduct);
    }

    //* on combine les deux précédents tableaux dans orderProducts
    let order = {
      contact: contact,
      products: productId,
    };

    //! ----- ENVOI DU FORMULAIRE A TRAITER ------------------/

    const postFetch = fetch(postServer, {
      method: "POST",
      body: JSON.stringify(order),

      headers: {
        "Content-type": "application/JSON",
      },
    })
      // Après envoi on traite la réponse :
      .then(function (res) {
        if (res.ok) {
          // Si réponse disponible :
          console.log("ok");
          // on enregistre order en .json dans le localStorage
          localStorage.setItem("orderSend", JSON.stringify(order));
          console.log(res);
          return res.json();
        } else {
          console.log(res);
          console.log("Mauvaise réponse du serveur.");
        }
      })
      .then((data) => {
        console.log(data);
        localStorage.setItem("orderReceived", JSON.stringify(data));
        localStorage.removeItem("orderSend");
        localStorage.removeItem("myBasket");
        window.location.href = "/html/commande.html";
      });

    //! ----- ENVOI DU FORMULAIRE A TRAITER ------------------/
  } else {
    //* Sinon on préviens de l'erreur : ********************************************/
    // Est-ce que le message existe ?
    const messageDetected = document.getElementById("message");
    //Si oui on ne fait rien :
    if (messageDetected) {
    } else {
      //sinon on insère le texte d'alerte dans alertMsg :
      alertMsg.insertAdjacentHTML(
        "afterbegin",
        `
      <div class="action__required" id="message">
        Merci de bien renseigner tous les champs comme demandé avant de passer la commande
      </div>
    `
      );
    }
  }
});

//? Message du Backend :
/**
 * Expects request to contain:
 * contact: {
 *   firstName: string,
 *   lastName: string,
 *   address: string,
 *   city: string,
 *   email: string
 * }
 * products: [string] <-- array of product _id
 */
//? Fin message du Backend :
