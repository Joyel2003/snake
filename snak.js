const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
const tileCount = 20;

canvas.width = tileCount * gridSize;
canvas.height = tileCount * gridSize;

let snake = [{ x: 9 * gridSize, y: 9 * gridSize }];
let food = getRandomFoodPosition();
let direction = 'RIGHT';
let score = 0;

document.addEventListener('keydown', changeDirection);

function gameLoop() {
    updateSnakePosition();
    checkCollisions();
    clearCanvas();
    drawFood();
    drawSnake();
    displayScore();
}

function updateSnakePosition() {
    const head = { ...snake[0] };
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;

    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = getRandomFoodPosition();
    } else {
        snake.pop();
    }
}

function checkCollisions() {
    const head = snake[0];

    // Check wall collisions
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
    }

    // Check self-collisions
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
        }
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawSnake() {
    ctx.fillStyle = 'lime';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, gridSize, gridSize);
    }
}

function drawFood() {
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function getRandomFoodPosition() {
    const x = Math.floor(Math.random() * tileCount) * gridSize;
    const y = Math.floor(Math.random() * tileCount) * gridSize;
    return { x, y };
}

function displayScore() {
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

function changeDirection(event) {
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') {
        direction = 'LEFT';
    }
    if (event.key === 'ArrowRight' && direction !== 'LEFT') {
        direction = 'RIGHT';
    }
    if (event.key === 'ArrowUp' && direction !== 'DOWN') {
        direction = 'UP';
    }
    if (event.key === 'ArrowDown' && direction !== 'UP') {
        direction = 'DOWN';
    }
}

function gameOver() {
    alert('Game Over! Your Score: ' + score);
    snake = [{ x: 9 * gridSize, y: 9 * gridSize }];
    food = getRandomFoodPosition();
    direction = 'RIGHT';
    score = 0;
}

setInterval(gameLoop, 100);
