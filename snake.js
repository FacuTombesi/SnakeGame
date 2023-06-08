export const SNAKE_SPEED = 2; // Este numero va a definir cuantas veces se mueve la serpiente por segundo
const snakeBody = [{ x: 21, y: 21 }]; // Seteo las coordenadas donde se va a renderizar la serpiente inicialmente. En este caso, como el grid es de 41x41, seteo la serpiente en 21x21 siendo estas coordenadas el medio de la pantalla

export function update() {
    console.log("The snake is about to move")
};

export function draw(gameBoard) { // Le paso por parametro donde se va a renderizar
    console.log("The snake moved!")
    snakeBody.forEach(segment => {
        const snakeElement = document.createElement("div"); // Creo un div por cada segmento de la serpiente
        snakeElement.style.gridRowStart = segment.x;
        snakeElement.style.gridColumnStart = segment.y;
        snakeElement.classList.add("snake"); // Le agrego la clase que defini en el index.html
        gameBoard.appendChild(snakeElement); // Y por ultimo agrego los elementos de la serpiente al gameBoard donde se va a renderizar
    })
};