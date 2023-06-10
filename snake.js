import { getInputDirection } from "./input.js";

// export const SNAKE_SPEED = 5; // Este numero va a definir cuantas veces se mueve la serpiente por segundo
const snakeBody = [{ x: 21, y: 21, rotate: "" }]; // Seteo las coordenadas donde se va a renderizar la serpiente inicialmente. En este caso, como el grid es de 41x41, seteo la serpiente en 21x21 siendo estas coordenadas el medio de la pantalla
let newSegments = 0; // Determina la cantidad de segmentos iniciales de la serpiente
let score = 0;

export function update() {
    addSegments();

    const inputDirection = getInputDirection(); // Llamo a la funcion para recibir los inputs

    for (let i = snakeBody.length - 2; i >= 0; i--) {
        snakeBody[i + 1] = { ...snakeBody[i] }
    };

    // La serpiente se mueve en los ejes x e y segun los inputs que reciba
    // snakeBody[0].x += inputDirection.x;
    // snakeBody[0].y += inputDirection.y;

    // Guardo la posicion de head para saber cuando rota y poder aplicarlo a los demas segmentos
    const head = snakeBody[0];
    head.x += inputDirection.x;
    head.y += inputDirection.y;
    head.rotate = inputDirection.rotate;
};

export function draw(gameBoard) { // Le paso por parametro donde se va a renderizar
    gameBoard.innerHTML = "";

    snakeBody.forEach((segment, index) => {
        const snakeElement = document.createElement("div"); // Creo un div por cada segmento de la serpiente
        snakeElement.style.gridRowStart = segment.y;
        snakeElement.style.gridColumnStart = segment.x;
        snakeElement.classList.add("snake"); // Le agrego la clase que defini en el index.html
        
        if (index === 0) { // Agrego un condicional para saber cual es el principio y el final de la serpiente
            snakeElement.classList.add("head"); // Si el index es 0, le doy el estilo de la cabeza
        }  // else if (index === snakeBody.length - 1) {
        //     snakeElement.classList.add("tail"); // Si el index es el ultimo del array, le doy el de la cola
        // };

        snakeElement.style.transform = segment.rotate; // Tomo el valor de rotate de input.js para actualizar el estilo
        gameBoard.appendChild(snakeElement); // Y por ultimo agrego los elementos de la serpiente al gameBoard donde se va a renderizar
    });
};

export function expandSnake(amount) {
    newSegments += amount; // Aumento la cantidad de segmentos cada vez que se expande segun la cantidad que defina
    score += amount;
    updateScore();
};

export function onSnake(position, { ignoreHead = false } = {}) { // Esta funcion va a chequear que la posicion de la serpiente sea igual o no a la de la comida
    return snakeBody.some((segment, index) => { 
        if (ignoreHead && index == 0) return false; // ignoreHead se setea default en false para evitar que la posicion de la cabeza sea ignorada
        return equalPositions(segment, position);
    });
};

function equalPositions(pos1, pos2) { // Funcion para chequear posiciones
    return (pos1.x === pos2.x && pos1.y === pos2.y) // Retorna una condicion que se fija si las posiciones de pos1 y pos2 son exactas en ambos ejes
};

function addSegments() { // Funcion encargada de agregar segmentos cada vez que la serpiente come
    for (let i = 0; i < newSegments; i++) {
        snakeBody.push({ ... snakeBody[snakeBody.length - 1] }); // Toma el ultimo elemento de la serpiente y lo duplica
    };

    newSegments = 0; // Vuelvo a setear newSegments en 0 para que agregue 1 solo segmento y no agregue indefinidamente
};

export function getSnakeHead() {
    return snakeBody[0];
};

export function snakeIntersection() { // Se fija si la serpiente se choca con si misma
    return onSnake(snakeBody[0], { ignoreHead: true }); // En este caso ignoreHead es true ya que si la dejo en false marcaria como que se esta chocando con tu propia cabeza desde el principio y siempre daria game over
};

function updateScore() {
    const scoreElement = document.querySelector(".score_num");
    scoreElement.textContent = score;
};