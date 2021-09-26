console.log("connected!");

//* Récupération dans le localStorage de la clé "myBasket"
let myBasket = localStorage.getItem("myBasket"); //. JSON
let actualBasket = JSON.parse(myBasket); // version JS de myBasket
//console.log(myBasket);

//* incrémentation compteur d'articles
let countNbre;
let actualNbre = 0;

const myCounter = document.getElementById("myCounter");
//console.log(myCounter);

//* Actualisation du compteur du panier --------------------------/
const refreshCounter = () => {
  //* Si le panier n'existe pas :  **************/
  if (!myBasket) {
    myCounter.innerText = "0";
    //* Si le panier existe :  *************/
  } else {
    actualNbre = 0;
    for (p = 0; p < actualBasket.length; p++) {
      countNbre = parseInt(actualNbre) + parseInt(actualBasket[p].nbre);
      actualNbre = countNbre;

      myCounter.innerText = actualNbre;
    }
  }
};
refreshCounter();

//* transformation en Euro des prix

function convertEuro(x) {
  return (x = x / 100);
}
