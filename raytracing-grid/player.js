class Player {
  constructor(initialX, initialY, grid) {
    this.position = createVector(initialX, initialY);
    this.direction = createVector(config.playerSpeed, 0);
    this.grid = grid;
  }

  projectRay() {
    const { x, y } = this.position;
    const theta = this.direction.heading();
    const gridX = Math.floor(x);
    const gridY = Math.floor(y);
    const dx = x - gridX;
    const dy = y - gridY;
    const yStep = (1 - dx) * Math.tan(theta);
    const xStep = (1 - dy) / Math.tan(theta);
    const nearestVerticalCollision = createVector(x + (1 - dx), y + yStep);
    const nearestHorizontalCollision = createVector(x + xStep, y + (1 - dy));
    const verticalDist = this.position.dist(nearestVerticalCollision);
    const horizontalDist = this.position.dist(nearestHorizontalCollision);

    return verticalDist < horizontalDist ? nearestVerticalCollision : nearestHorizontalCollision;
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
    console.log('angle:', this.direction.heading());
  }

  turnRight() {
    this.direction.rotate(config.turnAngle);
    console.log('angle:', this.direction.heading());
  }
}