let grid;
let player;
let scaleFactorX, scaleFactorY;

function setup() {
  // 0 = free, 1 = wall, 2 = item, 3 = out of bounds
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
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1],
    // [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
    // [1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ]);
  player = new Player(0.5, 1.5, grid);
  scaleFactorX = config.gridWindowSize / grid.width;
  scaleFactorY = config.gridWindowSize / grid.height;

  createCanvas(windowWidth, windowHeight);
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

  const collisionPoints = player.castRays();

  drawFirstPersonView(collisionPoints);

  if (config.showGridWindow) {
    drawGridWindow(collisionPoints);
  }
}

function drawFirstPersonView(collisionPoints) {
  // Sky
  fill('skyblue');
  rect(0, 0, width, height / 2);

  // Floor
  fill('green');
  rect(0, height / 2, width, height / 2);

  rectMode(CENTER);

  const numberOfLines = collisionPoints.length;
  const rectW = width / numberOfLines;

  collisionPoints.forEach(({ point, cellValue, theta }, index) => {
    const dist = player.position.dist(point);
    const rectX = index * rectW + rectW / 2;
    const rectH = height / (dist * Math.cos(player.direction.heading() - theta));

    if (cellValue === 1) {
      // Wall
      fill(160 - (dist * 6));
    } else if (cellValue === 2) {
      fill(40, 100 - (dist * 10), 255 - (dist * 10));
    } else if (cellValue === 3) {
      // Door
      fill(255 - (dist * 6), 0, 0);
    }

    rect(
      rectX,
      height / 2,
      rectW + 1,
      rectH
    );

    if (cellValue === 1) {
      fill(155 - (dist * 6));
    } else if (cellValue === 2) {
      fill(40, 90 - (dist * 10), 245 - (dist * 10));
    }

    if (cellValue === 1 || cellValue === 2) {
      const stripeH = (rectH / 20);
      const lowStripeY = (height / 2) - (rectH / 6);
      const highStripeY = (height / 2) + (rectH / 6);
  
      rect(rectX, lowStripeY, rectW + 1, stripeH);
      rect(rectX, highStripeY, rectW + 1, stripeH);
    }
  });
  
  rectMode(CORNER);
}

function drawGridWindow(collisionPoints) {
  fill(100, 100, 100);
  stroke(255, 0, 0);
  strokeWeight(1);
  rect(0, 0, config.gridWindowSize, config.gridWindowSize);

  for (let x = 0; x < grid.width; x++) {
    for (let y = 0; y < grid.height; y++) {
      const cellValue = grid.getCellValueAt(x, y);

      strokeWeight(0);
      
      if (cellValue === 0) {
        fill(0);
      } else if (cellValue === 1) {
        fill(255);
      } else if (cellValue === 2) {
        fill(80, 100, 255);
      }

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

  drawPlayer(collisionPoints);
}

function drawPlayer(collisionPoints) {
  const playerX = player.position.x * scaleFactorX;
  const playerY = player.position.y * scaleFactorY;

  // Direction hint
  strokeWeight(2);
  stroke(0, 255, 0);
  line(playerX, playerY, playerX + player.direction.x * scaleFactorX * 15, playerY + player.direction.y * scaleFactorY * 15);

  // Cast rays
  collisionPoints.forEach(({ point }) => {
    stroke('yellow');
    strokeWeight(1);
    line(playerX, playerY, point.x * scaleFactorX, point.y * scaleFactorY);
    strokeWeight(2);
    stroke('blue');
    fill('white');
    circle(point.x * scaleFactorX, point.y * scaleFactorY, 6);
  });
  
  fill(255, 0, 0);
  strokeWeight(0);
  circle(playerX, playerY, 6);
}

function mouseClicked() {
  if (config.showGridWindow && mouseX <= config.gridWindowSize && mouseY <= config.gridWindowSize) {
    const gridX = Math.floor(mouseX / scaleFactorX);
    const gridY = Math.floor(mouseY / scaleFactorY);

    grid.toggleCellValueAt(gridX, gridY);
  }
}