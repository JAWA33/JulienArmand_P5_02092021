//* Extraction de la chaine de requete voulue après adresse : ?id=xxxxx dans l'URL ----/
const urlExtract = window.location.search;

//* Extraction de la valeur recherchée (id)
const urlSearch = new URLSearchParams(urlExtract);
const idCamera = urlSearch.get("id");

//* transformation de la valeur de "allProducts" du localStorage en tableau "arrayProducts"
const valueLocalStorage = localStorage.getItem("allProducts");
let arrayProducts = [];
arrayProducts = JSON.parse(valueLocalStorage);

//* récupération des valeurs dans le tableau "arrayProducts" correspondant à mon id selectionné (idCamera)
const selectedProduct = arrayProducts.find(
  (element) => element._id === idCamera
);

//* intégration des données de "selectedProduct" dans la page web

const nameProduct = document.getElementById("nameProduct");
const descriptionProduct = document.getElementById("descriptionProduct");
const priceProduct = document.getElementById("priceProduct");
const imageProduct = document.getElementById("imageProduct");
const optionProduct = document.getElementById("optionProduct");
const titleProduct = document.getElementById("titleProduct");

const showProduct = () => {
  titleProduct.innerText = "OrinoCam - " + selectedProduct.name;
  nameProduct.innerText = selectedProduct.name;
  descriptionProduct.innerText = selectedProduct.description;
  priceProduct.innerText = convertEuro(selectedProduct.price) + "€";
  imageProduct.src = selectedProduct.imageUrl;
  for (a = 0; a < selectedProduct.lenses.length; a++) {
    optionProduct.insertAdjacentHTML(
      "beforeend",
      '<option value="option[a]">' + selectedProduct.lenses[a] + "</option>"
    );
  }
};

showProduct();

//* MISE AU PANIER DES ARTICLES -----------------------------------------------*/

//* Récupération des valeurs qui seront mises dans le panier sous forme de tableau au clic sur le bouton
const button_addToBasket = document.getElementById("addToBasket");
const button_changeButton = document.getElementById("changeButton");
let itemSelected = [];

const saveNewBasket = () => {
  // On créer un nouveau panier vide
  let saveItem = [];
  //On y insére l'élément sélectionné
  saveItem.push(itemSelected);
  // On créer un nouveau panier
  localStorage.setItem("myBasket", JSON.stringify(saveItem));
};

const addNewProduct = () => {
  // On ajoute l'élément selectionné au panier existant
  actualBasket.push(itemSelected);
  localStorage.setItem("myBasket", JSON.stringify(actualBasket));
};

const addToSameProduct = () => {
  // On calcul le nbre total de ce produit :
  let nbTotal = parseInt(nbProducts) + parseInt(actualBasket.find(testID).nbre);
  // On remplace l'ancien nombre par le nouveau :
  actualBasket.find(testID).nbre = nbTotal;

  // On réintégre le panier modifié :
  localStorage.setItem("myBasket", JSON.stringify(actualBasket));
};

const newItemSelection = () => {
  //* Récupérer la valeur du nombre de produits voulus :
  const nbProducts = document.getElementById("quantitySelected").value;

  //* Création du tableau des éléments sélectionnés à envoyer au panier :
  itemSelected = {
    id: idCamera,
    name: selectedProduct.name,
    nbre: nbProducts,
    price: selectedProduct.price,
  };
};

//! Validation commande et modification du bouton d'ajout ------------------------------------
const validConfirm = () => {
  button_changeButton.innerHTML = `
      <button class="btn btn--validAction" id="seeBasket">
        Article(s) ajouté(s) <br>
        Cliquez pour voir le panier
        <i class="basketMenu__iconBlock--icon fas fa-shopping-cart"></i>
      </button>
    `;
  const goToBasket = document.getElementById("seeBasket");
  goToBasket.addEventListener("click", () => {
    window.location.href = "/html/panier.html";
  });
  refreshCounter(); //fonction dans lib.js
};

//* on choisit la valeur de l'ID à tester retourne true or false)
const testID = (test) => {
  return test.id === idCamera;
};

//* Quand on clique sur le bouton, on sauvegarde dans le localStorage :

button_addToBasket.addEventListener("click", (event) => {
  //* On évite d'actualiser la page au click
  event.preventDefault();

  newItemSelection();

  // Vérification dans le localStorage de la présence d'un panier
  // (fait dans le libs.js) :

  //* Si un panier existe :   -------------------------------------------/
  if (myBasket) {
    //* Et si l'ID du produit existe déjà dans le panier : **************/
    if (actualBasket.find(testID)) {
      addToSameProduct();
      validConfirm();

      //* Et si l'ID du produit n'existe pas dans le panier : ***********/
    } else {
      addNewProduct();
      validConfirm();
    }
    //* Si aucun panier n'existe : -------------------------------------------/
  } else {
    saveNewBasket();
    validConfirm();
  }
});
