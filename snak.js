const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const gridSize = 20;
const tileCount = 20;
canvas.width =  tileCount * gridSize;
canvas.height =tileCount * gridSize;

let snake =[{ x: 9 * gridSize, y: 9 * gridSize}];
let food = getRandomFoodPosition();
let direction = 'RIGHT';
let score = 0;

document.addEventListener('keydown', changeDirection);

function gameLoop(){
    updateSnakePosition();
    checkCollisions();
    clearCanvas();
    drawFood();
    drawSnake();
    displayScore();
}

function updateSnakePosition(){
    const head = { ...snake[0] };
    if(direction ==='LIFT') head.x -=gridSize;
    if(direction === 'RIGHT') head.x += gridSize;
    if(direction === 'UP') head.y -= gridSize;
    if(direction === 'DOWN') head.y += gridSize;

    snake.unshift(head);
    
}