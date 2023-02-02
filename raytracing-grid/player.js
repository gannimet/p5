class Player {
  constructor(initialX, initialY, grid) {
    this.position = createVector(initialX, initialY);
    this.direction = createVector(config.playerSpeed, 0);
    this.grid = grid;
  }

  castRays() {
    const fieldOfView = radians(config.fieldOfViewDegrees);
    const rayInterval = radians(config.rayIntervalDegrees);
    const collisionPoints = [];
    const rayDirection = createVector(1, 0);
    const numberOfRays = fieldOfView / rayInterval;

    rayDirection.setHeading(this.direction.heading() - fieldOfView / 2);

    for (let i = 0; i < numberOfRays; i++) {
      const theta = rayDirection.heading();
      let nextBorderPoint = this._findNextBorderPoint(this.position, theta);
      let collisionCellValue = 0;
  
      while (true) {
        collisionCellValue = this.grid.getAdjacentCellValue(nextBorderPoint, theta);

        if (collisionCellValue === 0) {
          nextBorderPoint = this._findNextBorderPoint(nextBorderPoint, theta);
        } else {
          break;
        }
      }

      collisionPoints.push({
        point: nextBorderPoint,
        cellValue: collisionCellValue,
        theta,
      });
      rayDirection.rotate(rayInterval);
    }
    
    return collisionPoints;
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
    const tan = Math.tan(theta);
    const dx = isRayPointingRight ? successingInteger(x) - x : predecessingInteger(x) - x;
    const dy = isRayPointingDown ? successingInteger(y) - y : predecessingInteger(y) - y;
    const stepX = dy / tan;
    const stepY = dx * tan;
    const nearestVerticalCollision = createVector(x + dx, y + stepY);
    const nearestHorizontalCollision = createVector(x + stepX, y + dy);
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