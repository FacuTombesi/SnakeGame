import { onSnake, expandSnake } from "./snake.js";
import { randomGridPosition } from "./grid.js";

let food = getRandomFoodPosition();
const EXPANSION_RATE = 1; // Esta constante va a definir cuanto crece la serpiente cada vez que come

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = getRandomFoodPosition();
    }
};

export function draw(gameBoard) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
};

function getRandomFoodPosition() { // Funcion encargada de mover la comidad a un lugar al azar dentro del grid cada vez que la serpiente la come
    let newFoodPosition;
    while (newFoodPosition == null || onSnake(newFoodPosition)) { // Mientras que la nueva posicion sea null o este en alguna posicion donde se encuentre la serpiente, va a entrar al while
        newFoodPosition = randomGridPosition(); // randomGridPosition() va a buscar una nueva posicion continuamente hasta que encuentre un lugar en el grid donde aparecer
    };
    return newFoodPosition;
};