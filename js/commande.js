console.log("Connected !");

const commandNumber = document.getElementById("commandNumber");
const commandEmail = document.getElementById("commandEmail");

const recupOrder = localStorage.getItem("orderReceived");

if (!recupOrder) {
  // si aucune orderReceived n'existe : retour à la page d'accueil :
  window.location.href = "/index.html";
} else {
  //si une orderReceived existe : donnez le numéro de commande + contact email
  let arrayOrder = [];
  arrayOrder = JSON.parse(recupOrder);
  commandNumber.innerText = arrayOrder.orderId;
  commandEmail.innerText = arrayOrder.contact.email;
}
