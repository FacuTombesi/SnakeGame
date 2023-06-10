// let inputDirection = { x: 0, y: 0, rotate: "" };
// let lastInputDirection = { x: 0, y: 0, rotate: "" };
let inputDirection = { x: 0, y: 0, rotate: 0 };
let lastInputDirection = { x: 0, y: 0, rotate: 0 };

window.addEventListener("keydown", e => { // addEventListener("keydown") escucha a cuando apreto en una tecla en el teclado
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection.y !== 0) break; // Este condicional va a chequear que mi ultimo input no haya sido ni arriba ni abajo en el eje y (izquierda o derecha en el eje x) para que no pueda usar ArrowUp o ArrowDown cuando este moviendome por el eje y
            inputDirection = { x: 0, y: -1, rotate: "rotate(270deg)" }; // En javascript, y es negativo para moverse para arriba
            break;
        case "ArrowDown":
            if (lastInputDirection.y !== 0) break;
            inputDirection = { x: 0, y: 1, rotate: "rotate(90deg)" };
            break;
        case "ArrowLeft":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: -1, y: 0, rotate: "rotate(180deg)" };
            break;
        case "ArrowRight":
            if (lastInputDirection.x !== 0) break;
            inputDirection = { x: 1, y: 0, rotate: "rotate(0deg)" };
            break;
    }
});

export function getInputDirection() { // Esta funcion solo va a retornar el input que reciba al apretar una tecla
    lastInputDirection = inputDirection;
    return inputDirection;
};