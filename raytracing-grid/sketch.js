let grid;
let player;
let scaleFactorX, scaleFactorY;

function setup() {
  grid = new Grid([
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    [0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 1],
    [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);
  player = new Player(0.5, 1.5, grid);
  scaleFactorX = config.gridWindowSize / grid.width;
  scaleFactorY = config.gridWindowSize / grid.height;

  createCanvas(1400, 600);
}

function draw() {
  if (keyIsDown(UP_ARROW)) {
    player.moveForward();
  }

  if (keyIsDown(DOWN_ARROW)) {
    player.moveBackward();
  }

  if (keyIsDown(LEFT_ARROW)) {
    player.turnLeft();
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    player.turnRight();
  }

  background(0);

  drawFirstPersonView();

  if (config.showGridWindow) {
    drawGridWindow();
  }
}

function drawFirstPersonView() {}

function drawGridWindow() {
  fill(100, 100, 100);
  stroke(255, 0, 0);
  strokeWeight(1);
  rect(0, 0, config.gridWindowSize, config.gridWindowSize);

  for (let x = 0; x < grid.width; x++) {
    for (let y = 0; y < grid.height; y++) {
      strokeWeight(0);
      fill(grid.getCellValueAt(x, y) === 0 ? 0 : 255);
      rect(
        x * scaleFactorX,
        y * scaleFactorY,
        scaleFactorX-1,
        scaleFactorY-1
      );
    }
  }

  drawPlayer();
}

function drawPlayer() {
  const playerX = player.position.x * scaleFactorX;
  const playerY = player.position.y * scaleFactorY;

  strokeWeight(2);
  stroke(0, 255, 0);
  line(playerX, playerY, playerX + player.direction.x * scaleFactorX * 10, playerY + player.direction.y * scaleFactorY * 10);
  
  fill(255, 0, 0);
  strokeWeight(0);
  circle(playerX, playerY, 6);
}