console.log("connected!");

const result_Basket = document.getElementById("resultBasket");
const nbreTotal = document.getElementById("nbreTotal");
const priceTotal = document.getElementById("priceTotal");
const noBasket = document.getElementById("noBasket");
const clearBasket = document.getElementById("clearBasket");
const indexButton = document.getElementById("indexButton");

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
  const deliveryAdress = document.getElementById("deliveryAdress");
  deliveryAdress.innerHTML = "<div></div>";

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

clearBasket.addEventListener("click", () => {
  localStorage.removeItem("myBasket");
  window.location.href = "/html/panier.html";
});
