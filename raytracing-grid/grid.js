class Grid {
  constructor(cells) {
    this.cells = cells;
    this.width = cells[0].length;
    this.height = cells.length;
    console.log('width:', this.width);
    console.log('height:', this.height);
  }

  getCellValueAt(x, y) {
    return this.cells[y][x];
  }

  isPointLegal(point) {
    console.log(point);
    const x = Math.floor(point.x);
    const y = Math.floor(point.y);

    return (
      x >= 0 && x < this.width &&
      y >= 0 && y < this.height &&
      this.cells[y][x] === 0
    );
  }
}