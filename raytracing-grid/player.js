class Player {
  constructor(initialX, initialY, grid) {
    this.position = createVector(initialX, initialY);
    this.direction = createVector(config.playerSpeed, 0);
    this.grid = grid;
  }

  moveForward() {
    const newPosition = p5.Vector.add(this.position, this.direction);
    
    if (this.grid.isPointLegal(newPosition)) {
      this.position = newPosition;
    }
  }

  moveBackward() {
    const newPosition = p5.Vector.sub(this.position, this.direction);
    
    if (this.grid.isPointLegal(newPosition)) {
      this.position = newPosition;
    }
  }

  turnLeft() {
    this.direction.rotate(-config.turnAngle);
  }

  turnRight() {
    this.direction.rotate(config.turnAngle);
  }
}