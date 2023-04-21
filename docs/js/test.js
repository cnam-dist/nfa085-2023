/* Intégration du test d'existence */
function addEvt(objId, evt, fn) {
    let obj= document.getElementById(objId);
    obj && obj.addEventListener(evt, fn);
}

/* background-color */
// Changer la couleur de fond
let body = document.querySelector("body");
// let bg_orange = document.getElementById("btn1");
// let bg_greenyellow = document.getElementById("btn2");
// let bg_indianred = document.getElementById("btn3");
addEvt("btn1", "click", function (){
    body.style.backgroundColor = "coral"
});
addEvt("btn2","click", function (){
    body.style.backgroundColor = "greenyellow"
});
addEvt("btn3","click", function (){
    body.style.backgroundColor = "indianred"
});

/* Add-select */
// Action de cliquer sur le bouton lié à une fonction
// let addbutton = document.getElementById("add-button");
addEvt("add-button","click", function (){
    // Récupération de la valeur saisie dans la zone de texte
    let value = document.getElementById("msg-input").value;
    // Création d'un élément option
    let option = document.createElement("option");
    // Ajout de la valeur saisie dans l'élément option
    option.appendChild(document.createTextNode(value));
    // Ajout de l'élément option au menu déroulant
    document.getElementById("select-menu").appendChild(option);
    // Effacement de la zone de texte
    input.value = "";
});

/* Addition*/
// let btn5 = document.getElementById("btn5");
addEvt("btn5","click", function (){
    let num1 = document.getElementById("box1").value;
    let num2 = document.getElementById("box2").value;
    let sum = parseFloat(num1) + parseFloat(num2);
    document.getElementById("result").innerHTML = sum;

});

/* Images*/

addEvt("images","click", function() {
    let selectBox = document.getElementById("images");
    let index = selectBox.selectedIndex; //[0][1][2]
    let selectedValue = selectBox.options[index].value;
    let image = document.getElementById("image");
    if (selectedValue == "groupe") {
        image.src = "../../../assets/images/seance8/blog-img1.jpg";
        image.alt = "groupe";
    } else if (selectedValue == "homme") {
        image.src = "../../../assets/images/seance8/blog-img7.jpg";
        image.alt = "homme";
    } else if (selectedValue == "bureau") {
        image.src = "../../../assets/images/seance8/blog-img8.jpg";
        image.alt = "bureau";
    }
});

/* Alert-mouse-hover*/
// Ajouter un événement "mouseover" à l'élément sélectionné
addEvt("alerte","mouseover", function(){
    alert("Vous avez survolé le texte !");
});

/* Horloge */
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    const hoursElement = document.querySelector(".hours");
    const minutesElement = document.querySelector(".minutes");
    const secondsElement = document.querySelector(".seconds");

    hoursElement.textContent = hours.toString().padStart(2, "0");
    minutesElement.textContent = minutes.toString().padStart(2, "0");
    secondsElement.textContent = seconds.toString().padStart(2, "0");
}
if(document.querySelector(".hours")){
    updateClock();
    setInterval(updateClock, 1000);
}

/* Delete-conf */
let deleteBtn = document.getElementById("delete-btn");
let cancelBtn = document.getElementById("cancel-btn");
let deleteMe = document.getElementById("delete-me");

addEvt("deleteBtn","click", function () {
    let confirmDelete = confirm('Etes-vous sûr de vouloir supprimer ce paragraphe?');
    if (confirmDelete) {
        deleteMe.remove();
        alert("Paragraphe supprimé!");
    } else {
        alert("Annuler.");
    }
});

addEvt("cancelBtn","click", function () {
    alert('Suppression annulée.');
});

/* Toggle-check */
let toggle = document.getElementById("toggle");
let element = document.getElementById("element");

addEvt("toggle","change", function() {
    if (toggle.checked) {
        element.style.display = "block";
    } else {
        element.style.display = "none";
    }
});

/* Form-contact*/
let form = document.getElementById("contact-form");

addEvt("form","submit", function(event) {
    event.preventDefault();
    let name = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let message = document.getElementById("message").value;

    console.log(`Nom: ${name}`);
    console.log(`Adresse e-mail: ${email}`);
    console.log(`Message: ${message}`);

    form.reset();
});