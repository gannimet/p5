let viewer;
let walls = [];

function setup() {
  createCanvas(1400, 600);
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

  const scene = viewer.rayTrace(walls);

  push();
  stroke('red');
  line(width/2, 0, width/2, height);
  pop();

  const availableWidth = width / 2;
  const maxDistance = sqrt(2 * availableWidth * availableWidth);
  const rectW = availableWidth / scene.length;

  translate(availableWidth, 0);

  for (let i = 0; i < scene.length; i++) {
    const d = scene[i].d;
    const brightness = map(d, 0, maxDistance, 255, 30);
    const rectH = d * Math.cos(viewer.lookingAngle - scene[i].angle);
    const rectHCorrected = 20000 / rectH;

    rectMode(CENTER);
    stroke(brightness);
    fill(brightness);
    rect(i * rectW + rectW / 2, availableWidth / 2, rectW, rectHCorrected);
  }
}
