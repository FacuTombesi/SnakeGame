// Game Loop: va a hacer que el juego se actualize y renderize frame por frame constantemente
import { 
    update as updateSnake,
    draw as drawSnake,
    getSnakeHead,
    snakeIntersection
} from "./snake.js";
import { 
    update as updateFood,
    draw as drawFood 
} from "./food.js";
import { outsideGrid } from "./grid.js";

let lastRenderTime = 0; // Sirve para chequear cuando fue la ultima vez que se renderizo
let gameOver = false;
// Me traigo el modal y el boton de reinicio a traves de sus IDs
const gameOverModal = document.getElementById("gameOver_Modal");
const restartButton = document.getElementById("restartButton");
const gameBoard = document.getElementById("game_board"); // Selecciono el div que defini como game_board y lo guardo en una constante
const difficultyButtons = document.querySelectorAll("[difficulty]"); // Selecciono todos los botones con el query difficulty
let SNAKE_SPEED = 0; // Movi el SNAKE_SPEED al js principal para no tener problemas al intentar modificarlo

function selectDifficulty (button) { // Funcion para elegir dificultad a la que le paso por parametro cada boton
    const difficultySelect = document.getElementById("difficulty_select"); // Selecciono por ID al div al que voy a esconder

    switch (button) { // switch para cada uno de los casos
        case "EASY":
            console.log("Selected difficulty: EASY");
            SNAKE_SPEED = 5; // Modifico la velocidad,...
            difficultySelect.style.visibility = "hidden"; // ... escondo el div...
            startGame(); // ... y empiezo el juego
            break;
        case "NORMAL":
            console.log("Selected difficulty: NORMAL");
            SNAKE_SPEED = 12;
            difficultySelect.style.visibility = "hidden";
            startGame();
            break;
        case "HARD":
            console.log("Selected difficulty: HARD");
            SNAKE_SPEED = 30;
            difficultySelect.style.visibility = "hidden";
            startGame();
            break;
    };
};

function startGame() { // Nueva funcion encargada de iniciar el loop
    window.requestAnimationFrame(main);
}

// main() es la funcion que se va a encargar del game loop renderizando una y otra vez los frames
function main(currentTime) {
    if (gameOver) {
        showGameOverModal(); // Nueva funcion que se encarga de mostrar el modal y reiniciar el juego
        return;
    };

    window.requestAnimationFrame(main); // Le pido al browser cuando puedo renderizar el proximo frame y le paso como argumento mi funcion main para que se ejecute una y otra vez
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; // Esta resta nos va a dar la respuesta en milisegundos y lo que quiero es saber los segundos. Esto nos va a dar el delay del renderizado. Ej: 0.006seg de delay, es decir 6ms

    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; // El delay que nos da la operacion de arriba es demasiado rapido y no necesito que sea tan rapido, para eso este if que corta la operacion si los ms de delay son menores a 1 dividido por la velocidad de la serpiente. Ej: Si la velocidad de la serpiente es 2, la operacion quedaria: if (0.006seg < 1 / 2). Como 0.006seg es menor a 0.5seg, va a cortar la ejecucion
    
    lastRenderTime = currentTime; // Solo se va a renderizar cuando la condicion no se cumpla

    // update() se va a encargar de ver si la serpiente de movio, si comio la comida, si se agrando, etc.
    update();

    // draw() va a encargarse de renderizar la actualizaciones de update()
    draw();
};

// window.requestAnimationFrame(main); // Inicio el loop

function update() {
    updateSnake();
    updateFood();
    checkDeath();
};

function draw() {
    gameBoard.innerHTML = ""; // Actualiza el tablero para que cuando se mueva la serpiente se borre su ubicacion pasada
    drawSnake(gameBoard);
    drawFood(gameBoard);
};

function checkDeath() { // Esta funcion va a fijarse si la serpiente se choca contra una pared o contra si misma
    gameOver = outsideGrid(getSnakeHead()) || snakeIntersection();
};

function showGameOverModal() { // Funcion que se encarga de mostrar el modal
    gameOverModal.style.visibility = "visible";
};
  
function hideGameOverModal() { // Funcion que se encarga de esconder el modal
    gameOverModal.style.visibility = "hidden";
};
  
restartButton.addEventListener("click", () => { // Agrego un eventListener para que cuando se haga click en el boton para reiniciar el juego, se esconda el modal y recarge la pagina
    hideGameOverModal();
    window.location = "/";
});

difficultyButtons.forEach(button => { // Hago un forEach a todos mis botones para agregarles el eventListener con el texto que poseen
    button.addEventListener("click", () => {
        selectDifficulty(button.innerText);
    });
});