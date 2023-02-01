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
  player = new Player(7.3, 7.7, grid);
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
      const cellValue = grid.getCellValueAt(x, y);

      strokeWeight(0);
      fill(cellValue === 0 ? 0 : 255);
      rect(
        x * scaleFactorX,
        y * scaleFactorY,
        scaleFactorX-1,
        scaleFactorY-1
      );

      if (config.outputCellCoords) {
        textAlign(CENTER, CENTER);
        textSize(8);
        fill(cellValue === 0 ? 255 : 0);
        text(`(${x}, ${y})`, x * scaleFactorX + (scaleFactorX/2), y * scaleFactorY + (scaleFactorY/2));
      }
    }
  }

  drawPlayer();
}

function drawPlayer() {
  const playerX = player.position.x * scaleFactorX;
  const playerY = player.position.y * scaleFactorY;

  // Direction hint
  strokeWeight(2);
  stroke(0, 255, 0);
  line(playerX, playerY, playerX + player.direction.x * scaleFactorX * 15, playerY + player.direction.y * scaleFactorY * 15);

  const collisionPoints = player.projectRays();

  // Cast rays
  collisionPoints.forEach((collisionPoint) => {
    stroke('yellow');
    strokeWeight(1);
    line(playerX, playerY, collisionPoint.x * scaleFactorX, collisionPoint.y * scaleFactorY);
    strokeWeight(2);
    stroke('blue');
    fill('white');
    circle(collisionPoint.x * scaleFactorX, collisionPoint.y * scaleFactorY, 6);
  });
  
  fill(255, 0, 0);
  strokeWeight(0);
  circle(playerX, playerY, 6);
}