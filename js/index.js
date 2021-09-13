console.log("i'm connected !");

const resultsCards = document.getElementById("insertCards");
let allCameras;

const adressServer = "http://localhost:3000/api/cameras";

//! vérification de connexion au serveur *//
const checkConnection = fetch(adressServer).then((res) => {
  if (res.ok) {
    console.log("Connexion réussie");
  } else {
    console.log("Erreur de connexion");
    resultsCards.innerHTML = `<p> Erreur de connexion </p>`;
  }
});

//! Appel de l'API en asynchrone:
const fetchCameras = async () => {
  allCameras = await fetch(adressServer).then((res) => res.json());
};

//! Insertion dans le HTML des cartes (sans images):
const showCameras = async () => {
  await fetchCameras();

  resultsCards.innerHTML = allCameras
    .map(
      (camera) =>
        `
            <div class="cardProduct">
                <a class="cardProduct__link" onclick="saveID('${
                  camera._id
                }')" href="./html/produit.html">
                    <canvas id="canvas${camera._id}" class="dontShow"></canvas>
                    <img
                        id="img${camera._id}"
                        src="${camera.imageUrl}"
                        alt="Photo de ${camera.name}"
                        class="cardProduct__picture"
                    />
                    <div class="cardProduct__info">
                        <h3 class="cardProduct__title">${camera.name}</h3>
                        <p class="cardProduct__description">Description :</p>
                        <p class="cardProduct__text">${camera.description}</p>
                        <p class="cardProduct__price">${convertEuro(
                          camera.price
                        )}€</p>
                    </div>
                </a>
            </div>
        `
    )
    .join("");
};
showCameras();

//! insertion des images dans le canvas
// const canvasURL = async () => {
//   await showCameras();

//   fetch(adressServer)
//     .then((res) => res.json())
//     .then((data) => {
//       for (i = 0; i < data.length; i++) {
//         let canvasID = document.getElementById("canvas" + data[i]._id);
//         console.log(canvasID);
//         let contexte = canvasID.getContext("2d");
//         console.log(contexte);
//         let imageID = document.getElementById("img" + data[i]._id);
//         console.log(imageID);
//         let widthMax = 400;
//         //console.log(widthMax);
//         let scaleSizeID = widthMax / imageID.width;
//         //console.log(scaleSizeID);
//         canvasID.width = widthMax;
//         canvasID.height = imageID.height * scaleSizeID;

//         contexte.drawImage(
//           imageID,
//           0,
//           0,
//           widthMax,
//           imageID.height * scaleSizeID
//         );
//       }
//     });
// };

// canvasURL();

//! fonction pour convertir le prix de centimes en euros
function convertEuro(x) {
  return (x = x / 100);
}

//!sauvegarde de l'ID du produit dans le local storage pour utilisation dans page produit.html
function saveID(idProduct) {
  console.log(idProduct);
  localStorage.setItem("idProduct", idProduct);
}
