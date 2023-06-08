// Game Loop: va a hacer que el juego se actualize y renderize frame por frame constantemente
import { 
    update as updateSnake,
    draw as drawSnake,
    SNAKE_SPEED 
} from "./snake.js";
import { 
    update as updateFood,
    draw as drawFood 
} from "./food.js";

let lastRenderTime = 0; // Sirve para chequear cuando fue la ultima vez que se renderizo
const gameBoard = document.getElementById("game_board"); // Selecciono el div que defini como game_board y lo guardo en una constante

// main() es la funcion que se va a encargar del game loop renderizando una y otra vez los frames
function main(currentTime) {
    window.requestAnimationFrame(main); // Le pido al browser cuando puedo renderizar el proximo frame y le paso como argumento mi funcion main para que se ejecute una y otra vez
    const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000; // Esta resta nos va a dar la respuesta en milisegundos y lo que quiero es saber los segundos. Esto nos va a dar el delay del renderizado. Ej: 0.006seg de delay, es decir 6ms
    if (secondsSinceLastRender < 1 / SNAKE_SPEED) return; // El delay que nos da la operacion de arriba es demasiado rapido y no necesito que sea tan rapido, para eso este if que corta la operacion si los ms de delay son menores a 1 dividido por la velocidad de la serpiente. Ej: Si la velocidad de la serpiente es 2, la operacion quedaria: if (0.006seg < 1 / 2). Como 0.006seg es menor a 0.5seg, va a cortar la ejecucion
    
    lastRenderTime = currentTime; // Solo se va a renderizar cuando la condicion no se cumpla

    // update() se va a encargar de ver si la serpiente de movio, si comio la comida, si se agrando, etc.
    update();

    // draw() va a encargarse de renderizar la actualizaciones de update()
    draw();
};

window.requestAnimationFrame(main); // Inicio el loop

function update() {
    updateSnake();
    updateFood();
};

function draw() {
    gameBoard.innerHTML = ""; // Actualiza el tablero para que cuando se mueva la serpiente se borre su ubicacion pasada
    drawSnake(gameBoard);
    drawFood(gameBoard);
};