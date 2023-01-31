class Grid {
  constructor(cells) {
    this.cells = cells;
    this.width = cells[0].length;
    this.height = cells.length;
  }

  getCellValueAt(x, y) {
    return this.cells[y][x];
  }

  isPointLegal(point) {
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);

    return (
      x >= 0 && x < this.width &&
      y >= 0 && y < this.height &&
      this.cells[y][x] === 0
    );
  }

  isAdjacentPointLegal(point, theta) {
    const isRayPointingRight = Math.abs(theta) < HALF_PI;
    const isRayPointingDown = theta > 0;
    const x = Number.isInteger(point.x) && !isRayPointingRight ? predecessingInteger(point.x) : Math.floor(point.x);
    const y = Number.isInteger(point.y) && !isRayPointingDown ? predecessingInteger(point.y) : Math.floor(point.y);

    return (
      x >= 0 && x < this.width &&
      y >= 0 && y < this.height &&
      this.cells[y][x] === 0
    );
  }
}