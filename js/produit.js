const selectedProduct = localStorage.getItem("idProduct");
//console.log(selectedProduct);

const adressServer = "http://localhost:3000/api/cameras";

const findProduct = () => {
  fetch(adressServer)
    .then((res) => res.json())
    .then((data) => {
      for (i = 0; i < data.length; i++) {
        if (data[i]._id == selectedProduct) {
          document.getElementById("nameProduct").innerText = data[i].name;
          document.getElementById("descriptionProduct").innerText =
            data[i].description;
          document.getElementById("priceProduct").innerText =
            convertEuro(data[i].price) + "€";
          document.getElementById("imageProduct").src = data[i].imageUrl;
          for (a = 0; a < data[i].lenses.length; a++) {
            document
              .getElementById("optionProduct")
              .insertAdjacentHTML(
                "beforeend",
                '<option value="option[a]">' + data[i].lenses[a] + "</option>"
              );
          }
          //console.log("j'ai trouvé votre produit");
        } else {
          console.log("produit non trouvé");
        }
      }
    });
};
findProduct();

function convertEuro(x) {
  return (x = x / 100);
}
