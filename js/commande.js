console.log("Connected !");

const commandNumber = document.getElementById("commandNumber");
const commandEmail = document.getElementById("commandEmail");

const recupOrder = localStorage.getItem("orderReceived");

let arrayOrder = [];
arrayOrder = JSON.parse(recupOrder);
commandNumber.innerText = arrayOrder.orderId;
commandEmail.innerText = arrayOrder.contact.email;
