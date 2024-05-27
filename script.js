document.addEventListener("DOMContentLoaded", () => {
  const canvas = document.getElementById("gameCanvas");
  const ctx = canvas.getContext("2d");

  // Tamaño de celda y lienzo
  const gridSize = 20;
  const canvasSize = 400;

  // Variables de juego
  let snake = [{ x: 10, y: 10 }];
  let food = {};
  let dx = 0;
  let dy = 0;

  // Función para dibujar una celda en el lienzo
  function drawCell(x, y) {
    ctx.fillRect(x * gridSize, y * gridSize, gridSize, gridSize);
  }

  // Función para dibujar la serpiente
  function drawSnake() {
    ctx.fillStyle = "green";
    snake.forEach(segment => drawCell(segment.x, segment.y));
  }

  // Función para dibujar la comida
  function drawFood() {
  const img = new Image();
  img.onload = () => {
    ctx.drawImage(img, food.x * gridSize, food.y * gridSize, gridSize, gridSize);
  };
  img.src = 'pear.png'; // Cambia 'pear.png' al nombre de tu archivo de imagen de pera
}


  // Función para mover la serpiente
  function moveSnake() {
    const head = { x: snake[0].x + dx, y: snake[0].y + dy };
    snake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      createFood();
    } else {
      snake.pop();
    }
  }

  // Función para crear nueva comida
  function createFood() {
    food.x = Math.floor(Math.random() * (canvasSize / gridSize));
    food.y = Math.floor(Math.random() * (canvasSize / gridSize));
  }

  // Función para verificar colisiones
  function checkCollision() {
    const head = snake[0];
    return (
      head.x < 0 ||
      head.x >= canvasSize / gridSize ||
      head.y < 0 ||
      head.y >= canvasSize / gridSize ||
      snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    );
  }

  // Función principal para actualizar el juego
  function update() {
    if (checkCollision()) {
      alert("Game over!");
      document.location.reload();
      clearInterval(interval);
      return;
    }

    ctx.clearRect(0, 0, canvasSize, canvasSize);
    moveSnake();
    drawSnake();
    drawFood();
  }

  // Función para cambiar la dirección de la serpiente
  function changeDirection(event) {
    const keyPressed = event.key;
    switch (keyPressed) {
      case "ArrowUp":
        if (dy !== 1) {
          dx = 0;
          dy = -1;
        }
        break;
      case "ArrowDown":
        if (dy !== -1) {
          dx = 0;
          dy = 1;
        }
        break;
      case "ArrowLeft":
        if (dx !== 1) {
          dx = -1;
          dy = 0;
        }
        break;
      case "ArrowRight":
        if (dx !== -1) {
          dx = 1;
          dy = 0;
        }
        break;
    }
  }

  // Inicialización del juego
  createFood();
  let interval = setInterval(update, 150);
  document.addEventListener("keydown", changeDirection);
});
