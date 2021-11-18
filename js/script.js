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
            squareHTML.innerHTML = `<span class="x">${row}</span><span class="y">${col}</span>`;
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
        let randomNum = Math.floor(Math.random() * totalSquares); // numero casuale
        if (randomArray.indexOf(randomNum) == -1) { // se il numero casuale non è presente nell'array
            randomArray.push(randomNum) // inserimento numero casuale nell'array
        }
    }
    // ciclo per aggiungere le bombe
    const squares = document.getElementsByClassName("square"); // selezione di tutti i quadrati
    for (let i = 0; i < num; i++) {
        let j = randomArray[i];
        squares[j].classList.add("bomb");
        squares[j].innerHTML += `${bombHTML}`;
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
        let bombsNum = 0;
        let a = parseInt(div.querySelector(".x").innerHTML);
        console.log(a);
        let b = parseInt(div.querySelector(".y").innerHTML);
        let r = a - 1;
        for (let i = 0; i < 3; i++) {
            let c = b - 1;
            for (let j = 0; j < 3; j++) {
                if (square(r, c) != null) {
                    if (square(r, c).innerHTML == `<span class="x">${r}</span><span class="y">${c}</span>${bombHTML}`) {
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
        console.log(square(a, b).innerHTML);
        if (square(a, b).innerHTML == `<span class="x">${a}</span><span class="y">${b}</span>${bombHTML}`) {
            console.log("Clicked: bomba");
            square(a, b).style.background = "red";
            bombsArray = document.getElementsByClassName("bomb");
            for (let i = 0; i < bombsArray.length; i++) {
                bombsArray[i].classList.add("clicked");
                bombsArray[i].classList.remove("not-clicked");
            }
        } else if (bombsNum != 0) {
            console.log("Clicked: riga " + a + " colonna " + b + " con " + bombsNum + " bombe intorno");
        } else {
            console.log("Clicked: riga " + a + " colonna " + b);
        }
        if (square(a, b).innerHTML == `<span class="x">${a}</span><span class="y">${b}</span>`) {
            if (bombsNum != 0) {
                square(a, b).innerHTML = bombsNum;
            }
            switch (bombsNum) {
                case 0:
                    square(a, b).style.background = "lightgrey";
                    break;
                case 1:
                    square(a, b).style.color = "blue";
                    break;
                case 2:
                    square(a, b).style.color = "green";
                    break;
                case 3:
                    square(a, b).style.color = "red";
                    break;
                case 4:
                    square(a, b).style.color = "violet";
                    break;
                case 5:
                    square(a, b).style.color = "purple";
                    break;
            }
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
let bombs = Math.floor((gridDim * gridDim) / 4);
console.log(bombs);
const squareClass = (a, b) => "square" + a + "_" + b; // funzione per creare una classe dinamica da utilizzare per i quadrati
const square = (a, b) => document.querySelector("." + squareClass(a, b)); // funzione per selezionare un quadrato con classe dinamica
const bombHTML = `<span><i class="fas fa-bomb"></i></span>`;
createGrid(gridDim); // funzione che crea la griglia di gioco
addBombs(bombs); // funzione per aggiungere le bombe
addClick(gridDim); // funzione che aggiunge il click ai quadrati