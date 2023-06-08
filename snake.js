import { getInputDirection } from "./input.js";

export const SNAKE_SPEED = 5; // Este numero va a definir cuantas veces se mueve la serpiente por segundo
const snakeBody = [{ x: 21, y: 21 }]; // Seteo las coordenadas donde se va a renderizar la serpiente inicialmente. En este caso, como el grid es de 41x41, seteo la serpiente en 21x21 siendo estas coordenadas el medio de la pantalla
let newSegments = 0; // Determina la cantidad de segmentos iniciales de la serpiente

export function update() {
    const inputDirection = getInputDirection(); // Llamo a la funcion para recibir los inputs

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    };

    // La serpiente se mueve en los ejes x e y segun los inputs que reciba
    snakeBody[0].x += inputDirection.x;
    snakeBody[0].y += inputDirection.y;
};

export function draw(gameBoard) { // Le paso por parametro donde se va a renderizar
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div"); // Creo un div por cada segmento de la serpiente
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake"); // Le agrego la clase que defini en el index.html
        gameBoard.appendChild(snakeElement); // Y por ultimo agrego los elementos de la serpiente al gameBoard donde se va a renderizar
    })
};

export function expandSnake(amount) {
    newSegments += amount; // Aumento la cantidad de segmentos cada vez que se expande segun la cantidad que defina
};

export function onSnake(position) { // Esta funcion va a chequear que la posicion de la serpiente sea igual o no a la de la comida
    return snakeBody.some(segment => { 
        return equalPositions(segment, position);
    })
};

function equalPositions() { // Funcion para chequear posiciones

};