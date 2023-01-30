class Player {
  constructor(initialX, initialY, grid) {
    this.position = createVector(initialX, initialY);
    this.direction = createVector(config.playerSpeed, 0);
    this.grid = grid;
  }

  projectRay() {
    let theta = this.direction.heading();
    let nextBorderPoint = this._findNextBorderPoint(this.position, theta);
    let loopCount = 0;

    while (this.grid.isPointLegal(nextBorderPoint) && loopCount < 1000) {
      nextBorderPoint = this._findNextBorderPoint(nextBorderPoint, theta);
      loopCount++;
    }
    
    return nextBorderPoint;
  }

  /**
   * Find the point at the border to the next cell in the direction given by theta
   * @param {*} startingPosition Point to start measuring the distance from
   * @param {*} theta Angle of the ray projected from startingPosition to the border of the cell
   * @returns 
   */
  _findNextBorderPoint(startingPosition, theta) {
    const { x, y } = startingPosition;
    const isRayPointingRight = Math.abs(theta) < HALF_PI;
    const isRayPointingDown = theta > 0;
    const gridX = Math.floor(x);
    const gridY = Math.floor(y);
    const dx = x - gridX;
    const dy = y - gridY;
    const yStep = isRayPointingRight ? (1 - dx) * Math.tan(theta) : dx * Math.tan(PI - theta);
    const xStep = isRayPointingDown ? (1 - dy) / Math.tan(theta) : dy * Math.tan(theta - HALF_PI);

    // Calculate next collision point with vertical cell border
    const nearestVerticalCollision = createVector(
      isRayPointingRight ? x + (1 - dx) : x - dx,
      y + yStep
    );

    // Calculate next collision point with horizontal cell border
    const nearestHorizontalCollision = createVector(
      x + xStep,
      isRayPointingDown ? y + (1 - dy) : y - dy
    );

    const verticalDist = this.position.dist(nearestVerticalCollision);
    const horizontalDist = this.position.dist(nearestHorizontalCollision);

    // Return whichever collision point is closest
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
  }

  turnRight() {
    this.direction.rotate(config.turnAngle);
  }
}