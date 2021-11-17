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
            squareHTML.className = "square not-clicked " + squareClass(); // classe dinamica quadrati
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
                this.classList.remove("not-clicked");
            });
        }
    }
}
// aggiunta bombe
function addBombs(num) {
    // ciclo per numeri random univoci
    let randomArray = [];
    while (randomArray.length < num) { // sviluppo numeri random fino al numero di bombe
        const totalSquares = gridDim * gridDim; // numero di quadrati in totale
        let randomNum = Math.floor(Math.random() * totalSquares) + 1; // numero casuale
        if (randomArray.indexOf(randomNum) == -1) { // se il numero casuale non è presente nell'array
            randomArray.push(randomNum) // inserimento numero casuale nell'array
        }
    }
    // ciclo per aggiungere le bombe
    const squares = document.getElementsByClassName("square"); // selezione di tutti i quadrati
    for (let i = 0; i < num; i++) {
        squares[randomArray[i]].classList.add("bomb");
        squares[randomArray[i]].innerHTML = "bomba";
    }
}


// +++ codice +++

// variabli
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
        gridDim = 7;
        break
}
let row; // contatore delle righe da utilizzare nelle classi dinamiche
let col; // contatore delle colonne da utilizzare nelle classi dinamiche
const bombs = 16;
const squareClass = () => "square" + row + "_" + col; // funzione per creare una classe dinamica da utilizzare per i quadrati
const square = () => document.querySelector("." + squareClass()); // funzione per selezionare un quadrato con classe dinamica
createGrid(gridDim); // funzione che crea la griglia di gioco
addClick(gridDim); // funzione che aggiunge il click ai quadrati
addBombs(bombs); // funzione per aggiungere le bombe