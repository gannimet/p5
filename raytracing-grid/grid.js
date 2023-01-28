class Grid {
  constructor(cells) {
    this.cells = cells;
    this.width = cells[0].length;
    this.height = cells.length;
  }

  getCellValueAt(x, y) {
    return this.cells[y][x];
  }
}