let food = { x: 10, y: 10 };
const EXPANSION_RATE = 1; // Esta constante va a definir cuanto crece la serpiente cada vez que come

export function update() {
    if (onSnake(food)) {
        expandSnake(EXPANSION_RATE);
        food = { x: -10, y: -10 };
    }
};

export function draw(gameBoard) {
    const foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add("food");
    gameBoard.appendChild(foodElement);
};