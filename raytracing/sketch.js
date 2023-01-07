let viewer;
let walls = [];

function setup() {
  createCanvas(1000, 600);
  background(0);

  viewer = new Viewer(80, 80);

  walls.push(new Wall(createVector(50, 250), createVector(300, 100)));
  walls.push(new Wall(createVector(400, 130), createVector(210, 500)));
  walls.push(new Wall(createVector(150, 400), createVector(480, 550)));

  // Add walls at the edges of the canvas
  walls.push(new Wall(createVector(0, 0), createVector(width / 2, 0)));
  walls.push(new Wall(createVector(0, 0), createVector(0, height)));
  walls.push(new Wall(createVector(width / 2, 0), createVector(width / 2, height)));
  walls.push(new Wall(createVector(0, height), createVector(width / 2, height)));
}

function draw() {
  if (keyIsDown(LEFT_ARROW)) {
    viewer.rotate(-0.02);
  }
  
  if (keyIsDown(RIGHT_ARROW)) {
    viewer.rotate(0.02);
  }

  if (keyIsDown(UP_ARROW)) {
    viewer.move(1);
  }

  if (keyIsDown(DOWN_ARROW)) {
    viewer.move(-1);
  }

  background(0);

  for (let wall of walls) {
    wall.draw();
  }

  viewer.draw();

  viewer.rayTrace(walls);

  push();
  stroke('red');
  line(width/2, 0, width/2, height);
  pop();
}
