let inputDirection = { x: 0, y: 0, rotate: 0 };
let lastInputDirection = { x: 0, y: 0, rotate: 0 };

// Movimientos
const moveUp = { x: 0, y: -1, rotate: "rotate(270deg)" };
const moveDown = { x: 0, y: 1, rotate: "rotate(90deg)" };
const moveLeft = { x: -1, y: 0, rotate: "rotate(180deg)" };
const moveRight = { x: 1, y: 0, rotate: "rotate(0deg)" };

// Botones del D-pad
const upButton = document.getElementById("up");
const downButton = document.getElementById("down");
const leftButton = document.getElementById("left");
const rightButton = document.getElementById("right");

// Event listeners para cada boton
upButton.addEventListener("click", () => {
    if (lastInputDirection.y !== 0) return;
    inputDirection = moveUp;
});

downButton.addEventListener("click", () => {
    if (lastInputDirection.y !== 0) return;
    inputDirection = moveDown;
});

leftButton.addEventListener("click", () => {
    if (lastInputDirection.x !== 0) return;
    inputDirection = moveLeft;
});

rightButton.addEventListener("click", () => {
    if (lastInputDirection.x !== 0) return;
    inputDirection = moveRight;
});

window.addEventListener("keydown", e => { // addEventListener("keydown") escucha a cuando apreto en una tecla en el teclado
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection.y !== 0) break; // Este condicional va a chequear que mi ultimo input no haya sido ni arriba ni abajo en el eje y (izquierda o derecha en el eje x) para que no pueda usar ArrowUp o ArrowDown cuando este moviendome por el eje y
            inputDirection = moveUp; // En javascript, y es negativo para moverse para arriba
            break;
        case "ArrowDown":
            if (lastInputDirection.y !== 0) break;
            inputDirection = moveDown;
            break;
        case "ArrowLeft":
            if (lastInputDirection.x !== 0) break;
            inputDirection = moveLeft;
            break;
        case "ArrowRight":
            if (lastInputDirection.x !== 0) break;
            inputDirection = moveRight;
            break;
    }
});

export function getInputDirection() { // Esta funcion solo va a retornar el input que reciba al apretar una tecla
    lastInputDirection = inputDirection;
    return inputDirection;
};