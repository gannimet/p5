class Player {
  constructor(initialX, initialY, grid) {
    this.position = createVector(initialX, initialY);
    this.direction = createVector(config.playerSpeed, 0);
    this.grid = grid;
  }

  moveForward() {
    this.position.add(this.direction);
  }

  moveBackward() {
    this.position.sub(this.direction);
  }

  turnLeft() {
    this.direction.rotate(-config.turnAngle);
  }

  turnRight() {
    this.direction.rotate(config.turnAngle);
  }
}