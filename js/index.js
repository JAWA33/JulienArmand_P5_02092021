console.log("I'm connected !");

//* Définition des constantes du projet --------------------------------------------------------//

const resultsCards = document.getElementById("insertCards");
const adressServer = "http://localhost:3000/api/cameras";

//* Définition des variables du projet --------------------------------------------------------//
let cameraData = [];

//*1) Vérification de connexion au serveur ---------------------------------------------------//
const checkConnection = () =>
  fetch(adressServer).then((res) => {
    if (res.ok) {
      console.log("Connexion réussie");
      return res.json();
    } else {
      console.log("Erreur de connexion");
      resultsCards.innerHTML = `<p> Erreur de connexion </p>`;
    }
  });

//*2) Récupération et sauvgarde des données de l'API avec vérification (1)---------------------------------------------------//
const fetchCameras = async () => {
  await checkConnection().then((data) => (cameraData = data)), // en remplit la variable "cameraData" avec les données (data) sont forme de tableau (array)
    console.log(cameraData);
  console.log(JSON.stringify(cameraData));
  // enregistrement dans le localStorage, avec le key "allProducts", de la variable "cameraData" transformée en format JSON
  // car on ne peut pas enregistrer de tableau dans le localStorage : Pour affichage des futures pages
  localStorage.setItem("allProducts", JSON.stringify(cameraData));
};

//*3) Affichage des données (camera) dans le HTML --------------------------------------//
const cameraDisplay = async () => {
  await fetchCameras();

  resultsCards.innerHTML = cameraData
    .map(
      (camera) =>
        `
        <div class="cardProduct">
            <a class="cardProduct__link" href="./html/produit.html?id=${
              camera._id
            }&name=${camera.name}">
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

cameraDisplay();
