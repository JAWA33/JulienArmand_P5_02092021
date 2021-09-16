console.log("connected!");

const result_Basket = document.getElementById("resultBasket");
console.log(result_Basket.value);

let myBasket = localStorage.getItem("myBasket"); //. JSON
let actualBasket = JSON.parse(myBasket); // version JS de myBasket
console.log(actualBasket);

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
}

{
  /* <tr class="basketTable__row basketTable__row--description">
    <th class="basketTable__col basketTable__col--first">
        Total du panier
    </th>
    <th class="basketTable__col basketTable__col--second">3</th>
    <th class="basketTable__col basketTable__col--third">
        299,50€
    </th>
    </tr> */
}
