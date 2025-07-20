// game.js
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const box = 20;
const canvasSize = 400;
let snake = [{ x: 160, y: 200 }];
let direction = "RIGHT";
let score = 0;
let game;

const firms = ["Apple", "Google", "Meta", "Amazon", "Tesla", "Nvidia"];
let target = spawnTarget();

function draw() {
  ctx.fillStyle = "#000";
  ctx.fillRect(0, 0, canvasSize, canvasSize);

  // Draw snake
  for (let i = 0; i < snake.length; i++) {
    ctx.fillStyle = i === 0 ? "#0f0" : "#050";
    ctx.fillRect(snake[i].x, snake[i].y, box, box);
  }

  // Draw target
  ctx.fillStyle = "red";
  ctx.font = "16px monospace";
  ctx.fillText(firms[score % firms.length], target.x + 2, target.y + 16);

  // Move snake
  let head = { x: snake[0].x, y: snake[0].y };
  if (direction === "LEFT") head.x -= box;
  if (direction === "RIGHT") head.x += box;
  if (direction === "UP") head.y -= box;
  if (direction === "DOWN") head.y += box;

  // Game over conditions
  if (
    head.x < 0 || head.x >= canvasSize ||
    head.y < 0 || head.y >= canvasSize ||
    collision(head, snake)
  ) {
    clearInterval(game);
    alert("💀 Game Over – Hacker wurde gefasst!");
    return;
  }

  // Eat target
  if (head.x === target.x && head.y === target.y) {
    score++;
    document.getElementById("score").innerText = `Punkte: ${score}`;
    target = spawnTarget();
  } else {
    snake.pop();
  }
  
  snake.unshift(head);
}

function collision(head, array) {
  return array.some(segment => head.x === segment.x && head.y === segment.y);
}

function spawnTarget() {
  return {
    x: Math.floor(Math.random() * (canvasSize / box)) * box,
    y: Math.floor(Math.random() * (canvasSize / box)) * box,
  };
}

function changeDirection(event) {
  const key = event.keyCode;
  if (key === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (key === 38 && direction !== "DOWN") direction = "UP";
  else if (key === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (key === 40 && direction !== "UP") direction = "DOWN";
}

document.addEventListener("keydown", changeDirection);

function startGame() {
  snake = [{ x: 160, y: 200 }];
  direction = "RIGHT";
  score = 0;
  target = spawnTarget();
  document.getElementById("score").innerText = `Punkte: 0`;
  clearInterval(game);
  game = setInterval(draw, 100);
}

startGame();
