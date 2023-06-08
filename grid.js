const GRID_SIZE = 41;

export function randomGridPosition() {
    return {
        x: Math.floor(Math.random() * GRID_SIZE) + 1,
        y: Math.floor(Math.random() * GRID_SIZE) + 1
    };
};

export function outsideGrid(position) { // Se fija si la posicion esta afuera del grid
    return (
        position.x < 1 || position.x > GRID_SIZE || position.y < 1 || position.y > GRID_SIZE
    )
};