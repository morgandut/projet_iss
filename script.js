var consoleOutput = document.getElementById("consoleOutput");
var commandHistory = [];

function checkEnterKey(event) {
    if (event.key === "Enter") {
        processCommand();
    }
}

function typeWriter(text, index) {
    if (index < text.length) {
        consoleOutput.innerHTML += text.charAt(index);
        index++;
        setTimeout(function() {
            typeWriter(text, index);
        }, 25); // Ajustez le délai ici (plus le délai est court, plus l'effet sera rapide)
    }
}

function simulate56kLoad(imageSrc) {
    var loadingImageContainer = document.getElementById("loadingImageContainer");
    loadingImageContainer.innerHTML = "<img src='" + imageSrc + "' class='loading-image'>";
    
    var loadingImage = document.querySelector(".loading-image");
    var imageCanvas = document.createElement("canvas");
    var imageContext = imageCanvas.getContext("2d");

    loadingImage.onload = function() {
        var imageWidth = loadingImage.width;
        var imageHeight = loadingImage.height;

        imageCanvas.width = imageWidth;
        imageCanvas.height = imageHeight;

        loadingImageContainer.appendChild(imageCanvas);

        var imageData = imageContext.getImageData(0, 0, imageWidth, imageHeight);
        var pixels = imageData.data;
        var row = 0;

        function loadRow() {
            if (row < imageHeight) {
                for (var i = row * imageWidth * 4; i < (row + 1) * imageWidth * 4; i += 4) {
                    pixels[i] = pixels[i + 1] = pixels[i + 2] = 255;
                }

                imageContext.putImageData(imageData, 0, 0, 0, 0, imageWidth, row + 1);

                row++;
                setTimeout(loadRow, 10);
            }
        }

        setTimeout(loadRow, 10);
    };
}

function processCommand() {
var inputElement = document.getElementById("consoleInput");
var inputValue = inputElement.value.toLowerCase();

// Ajouter la commande à l'historique
commandHistory = [inputValue];

// Afficher la commande
consoleOutput.innerHTML += "> " + inputValue + "\n";


if (inputValue === "help") {
typeWriter("Voici une série de commandes utiles :\n1. Carte\n2. Clear\n3. Information 3\n", 0);
} else if (inputValue === "clear") {
setTimeout(function() {
    consoleOutput.innerHTML = "";
}, 500); // Effacez après un délai de 0.5 seconde
} else if (inputValue === "carte") {
consoleOutput.innerHTML += '<img src="./iss.jpg" alt="Carte">\n';
} else if (inputValue === "hell") {
// Ajouter la classe pour changer la couleur du texte en rouge
consoleOutput.classList.add("cathode-effect", "red-text");

// Ajouter la classe au titre et au label
document.querySelector("h1").classList.add("cathode-effect", "red-text");
document.getElementById("consoleLabel").classList.add("cathode-effect", "red-text");
document.getElementById("consoleInput").classList.add("cathode-effect", "red-text");

typeWriter("Bienvenue en Enfer !\n", 0);
} else {
typeWriter("Commande inconnue : " + inputValue + "\n", 0);
}

inputElement.value = "";
}
