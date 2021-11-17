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
            squareHTML.className = "square not-clicked " + squareClass(row, col); // classe dinamica quadrati
            squareHTML.innerHTML = `${row}${col}`;
            colHTML.append(squareHTML); // inserimento quadrato in colonna
            rowHTML.append(colHTML); // inserimento colonna in riga
        }
        document.getElementById("grid").append(rowHTML); // inserimento riga in griglia
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
        squares[randomArray[i]].innerHTML = "<span>bomba</span>";
        // squares[randomArray[i]].classList.remove("not-clicked"); // debug****************************
    }
}
// aggiunta click ai quadrati
function addClick (num) {
    for (row = 1; row <= num; row++) {
        for (col = 1; col <= num; col++) {
            square(row, col).addEventListener("click", function() { // richiamo della funzione per selezionare il quadrato e aggiunta del click
                this.classList.add("clicked");
                this.classList.remove("not-clicked");
                aroundCheck(this);
            });
        }
    }
    
    // controllo intorno ai quadrati
    function aroundCheck(div) {
        // const up = a - 1;
        // const right = b + 1;
        // const down = a + 1;
        // const left = b - 1;
        let bombsNum = 0;
        // if (square(up, b) != null) {
        //     if (square(up, b).innerHTML == "" + up + b + "" + "<span>bomba</span>") {
        //         bombsNum ++;
        //     }
        // }
        // if (square(up, right) != null) {
        //     if (square(up, right).innerHTML == "" + up + right + "" + "<span>bomba</span>") {
        //         bombsNum ++;
        //     }
        // }
        // if (square(a, right) != null) {
        //     if (square(a, right).innerHTML == "" + a + right + "" + "<span>bomba</span>") {
        //         bombsNum ++;
        //     }
        // }
        // if (square(down, right) != null) {
        //     if (square(down, right).innerHTML == "" + down + right + "" + "<span>bomba</span>") {
        //         bombsNum ++;
        //     }
        // }
        // if (square(down, b) != null) {
        //     if (square(down, b).innerHTML == "" + down + b + "" + "<span>bomba</span>") {
        //         bombsNum ++;
        //     }
        // }
        // if (square(down, left) != null) {
        //     if (square(down, left).innerHTML == "" + down + left + "" + "<span>bomba</span>") {
        //         bombsNum ++;
        //     }
        // }
        // if (square(a, left) != null) {
        //     if (square(a, left).innerHTML == "" + a + left + "" + "<span>bomba</span>") {
        //         bombsNum ++;
        //     }
        // }
        // if (square(up, left) != null) {
        //     if (square(up, left).innerHTML == "" + up + left + "" + "<span>bomba</span>") {
        //         bombsNum ++;
        //     }
        // }
        let a = parseInt(div.innerHTML[0]);
        let b = parseInt(div.innerHTML[1]);
        let r = a - 1;
        for (let i = 0; i < 3; i++) {
            let c = b - 1;
            for (let j = 0; j < 3; j++) {
                if (square(r, c) != null) {
                    if (square(r, c).innerHTML == "<span>bomba</span>") {
                        bombsNum ++;
                        // div.innerHTML = bombsNum;
                    } // else if (square(c, d).innerHTML == "" + c + d + "") {
                    //     div.innerHTML = bombsNum;
                    //     square(c, d).classList.add("clicked");
                    //     square(c, d).classList.remove("not-clicked");
                    // }
                }
                c++;
            }
            r++;
        }
        if (div.innerHTML == "<span>bomba</span>") {
            console.log("Clicked: bomba");
        } else if (bombsNum != 0) {
            console.log("Clicked: riga " + a + " colonna " + b + " con " + bombsNum + " bombe intorno");
        } else {
            console.log("Clicked: riga " + a + " colonna " + b);
        }
        if (div.innerHTML == "" + a + b + "") {
            div.innerHTML = bombsNum;
        }

        // PROVARE A SCRIVERE INTORNO ALLE BOMBE
    }
}




// +++ codice +++

// variabli
let gridDim = 0;
let level = parseInt(prompt("Livello: 0, 1 o 2")); // prova inserimento difficoltà
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
const squareClass = (a, b) => "square" + a + "_" + b; // funzione per creare una classe dinamica da utilizzare per i quadrati
const square = (a, b) => document.querySelector("." + squareClass(a, b)); // funzione per selezionare un quadrato con classe dinamica
createGrid(gridDim); // funzione che crea la griglia di gioco
addBombs(bombs); // funzione per aggiungere le bombe
addClick(gridDim); // funzione che aggiunge il click ai quadrati