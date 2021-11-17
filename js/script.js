// +++ funzioni +++

// creazione griglia
function createGrid(num) {
    for (row = 1; row <= num; row++) { // ciclo per le righe
        const rowHTML = document.createElement("div"); // creazione div riga
        rowHTML.className = "row row-" + row; // classe dinamica righe
        for (col = 1; col <= num; col++) { // ciclo per le colonne
            const colHTML = document.createElement("div"); // creazione div colonna
            colHTML.className = "col col-" + col; // classe dinamica colonne
            const squareHTML = document.createElement("div"); // creazione div quadrato 
            squareHTML.className = "square " + squareClass(); // classe dinamica quadrati
            colHTML.append(squareHTML); // inserimento quadrato in colonna
            rowHTML.append(colHTML); // inserimento colonna in riga
        }
        document.getElementById("grid").append(rowHTML); // inserimento riga in griglia
    }
}
// aggiunta click ai quadrati
function addClick (num) {
    for (row = 1; row <= num; row++) {
        for (col = 1; col <= num; col++) {
            square().addEventListener("click", function() { // richiamo della funzione per selezionare il quadrato e aggiunta del click
                this.classList.add("clicked");
            });
        }
    }
}




// +++ codice +++

let gridDim = 0;
let level = parseInt(prompt("Livello")); // prova inserimento difficoltà
switch (level) { // dimensioni griglia dinamica con difficoltà
    case 0:
        gridDim = 10;
        break
    case 1:
        gridDim = 9;
        break
    case 2:
        gridDim = 8;
        break
}
let row; // contatore delle righe da utilizzare nelle classi dinamiche
let col; // contatore delle colonne da utilizzare nelle classi dinamiche
const squareClass = () => "square" + row + "_" + col; // funzione per creare una classe dinamica da utilizzare per i quadrati
const square = () => document.querySelector("." + squareClass()); // funzione per selezionare un quadrato con classe dinamica
createGrid(gridDim); // funzione che crea la griglia di gioco
addClick(gridDim); // funzione che aggiunge il click ai quadrati