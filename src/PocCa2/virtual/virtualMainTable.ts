class VirtualMainTable {
  private store: any = {};
  private totalColumns: number;

  constructor(totalRows: number, totalColumns: number) {
    this.totalColumns = totalColumns;
    for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {  
      this.store[rowIndex] = {};
      for (let columnIndex = 0; columnIndex < totalColumns; columnIndex++) {
        this.store[rowIndex][columnIndex] = null;
      }
    };
  }

  public createLink(startCoordinate: string) {
    const start = startCoordinate.split('-');
    // TODO: end coordinates (today as default)
    const end = [start[0], '20'] ;
    
    const row = +start[0];
    const columnStart = +start[1];
    const columnEnd = +end[1];

    let endCoordinate = startCoordinate;
    for (let column = columnStart; column <= columnEnd; column++) {
      endCoordinate = `${row}-${column}`;
      if (this.store[row][column]) {
        break;
      }
      this.store[row][column] = startCoordinate;
    }

    return [startCoordinate, endCoordinate];
  }

  public deleteLink(startCoordinate: string) {
    const [row, column] = startCoordinate.split('-');

    // is there a link in the previous column?
    const content = this.store[row][+column - 1] || null;

    let lastColumn = null;
    for (let c = +column; c < this.totalColumns; c += 1) {
      if (this.store[row][c] !== startCoordinate) {
        lastColumn = c;
        break;
      }
      this.store[row][c] = content;
    }

    // is there a link in the previous column?
    if (content) {
      return [content, `${row}-${lastColumn}`];
    }

    return null;
  }
}

export default VirtualMainTable;
