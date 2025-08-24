import { MAIN_TABLE } from "../config";

const {
  TOTAL_CELLS_IN_MONTH_DAY_MODEL,
  DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL,
} = MAIN_TABLE;
interface StoreData {
  [key: number]: {
    [key: number]: string | null;
  };
}

/** store format
 * 
 *     {
 *       '0-0': {
 *         '0-0': null,
 *         '0-1': null,
 *         '0-2': null,
 *         '0-3': null,
 *         '0-4': null,
 *         '0-5': [0-0, 0-5],
 *         '0-6': [0-0, 0-5],
 *         '0-7': [0-0, 0-5],
 *         '0-8': null,
 *         '0-9': null,
 *       },
 *       '0-1': {
 *         '0-1': null,
 *         '0-2': null,
 *         '0-3': null,
 *         '0-4': null,
 *         '0-5': null,
 *         '0-6': null,
 *         '0-7': null,
 *         '0-8': null,
 *         '0-9': null,
 *       },
 *     }
 * 
 */


const store = {} as StoreData;

// const initialize = (totalRows: number, totalColumns: number, todayColumnCoordinate: string): void => {
//   // console.log('>> initialize', totalRows, totalColumns, todayColumnCoordinate);
//   // store.totalColumns = totalColumns;
//   // store.totalRows = totalRows;
//   // store.todayColumnCoordinate = todayColumnCoordinate;

//   // Array.from({ length: totalRows }).forEach((_, rowIndex) => {
//   //   store[rowIndex] = {};
//   //   Array.from({ length: totalColumns }).forEach((_, columnIndex) => {
//   //     store[rowIndex][columnIndex] = null;
//   //   });
//   // });
// }

const createLink = (startCoordinate: string) => {
  const start = startCoordinate.split('-');

  // TODO: get the end coordinates to be used here, it is based on "today"
  const end = [start[0], `${TOTAL_CELLS_IN_MONTH_DAY_MODEL - DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL}`];

  // console.log('start', start);
  console.log('end', end);

  if (isNaN(+start[0]) || isNaN(+start[1]) || isNaN(+end[0]) || isNaN(+end[1])) {
    // user clicked on a cell that is not a link (the <Header> cells)
    return null;
  }

  const row = +start[0];
  const columnStart = +start[1];
  const columnEnd = +end[1];

  let endCoordinate = startCoordinate;
  for (let column = columnStart; column <= columnEnd; column++) {
    endCoordinate = `${row}-${column}`;
    if (store?.[row]?.[column]) {
      break;
    }
    if (!store?.[row]) {
      store[row] = {};
    }
    store[row][column] = startCoordinate;
  }

  return [startCoordinate, endCoordinate];
}

const deleteLink = (startCoordinate: string) => {
  const [row, column] = startCoordinate.split('-');

  // is there a link in the previous column?
  const content = store[+row]?.[+column - 1] || null;

  let lastColumn = null;
  
  for (let c = +column; c < TOTAL_CELLS_IN_MONTH_DAY_MODEL; c += 1) {
    if (store[+row]?.[c] !== startCoordinate) {
      lastColumn = c;
      break;
    }
    store[+row][c] = content;
  }

  if (lastColumn && lastColumn > TOTAL_CELLS_IN_MONTH_DAY_MODEL - DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL) {
    lastColumn = TOTAL_CELLS_IN_MONTH_DAY_MODEL - DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL;
  }

  // is there a link in the previous column?
  if (content) {
    return [content, `${row}-${lastColumn}`];
  }

  return null;
}

const virtualMainTable = {
  // initialize,
  createLink,
  deleteLink,
};

export default virtualMainTable;


// /** store format
//  * 
//  *     {
//  *       '0-0': {
//  *         '0-0': null,
//  *         '0-1': null,
//  *         '0-2': null,
//  *         '0-3': null,
//  *         '0-4': null,
//  *         '0-5': [0-0, 0-5],
//  *         '0-6': [0-0, 0-5],
//  *         '0-7': [0-0, 0-5],
//  *         '0-8': null,
//  *         '0-9': null,
//  *       },
//  *       '0-1': {
//  *         '0-1': null,
//  *         '0-2': null,
//  *         '0-3': null,
//  *         '0-4': null,
//  *         '0-5': null,
//  *         '0-6': null,
//  *         '0-7': null,
//  *         '0-8': null,
//  *         '0-9': null,
//  *       },
//  *     }
//  * 
//  */
// interface Store {
//   [key: number]: {
//     [key: number]: string | null;
//   };
// }

// class VirtualMainTable {
//   private static instance: VirtualMainTable | null = null;
//   private store: Store = {};
//   private totalColumns: number = 0;

//   private constructor() {
//     // private constructor to prevent direct instantiation
//   }

//   public static getInstance(): VirtualMainTable {
//     if (!VirtualMainTable.instance) {
//       VirtualMainTable.instance = new VirtualMainTable();
//     }
//     return VirtualMainTable.instance;
//   }

//   public initialize(totalRows: number, totalColumns: number): void {
//     if (totalRows <= 0 || totalColumns <= 0) {
//       throw new Error('Total rows and columns must be positive numbers');
//     }
//     this.totalColumns = totalColumns;
//     Array.from({ length: totalRows }).forEach((_, rowIndex) => {
//       this.store[rowIndex] = {};
//       Array.from({ length: totalColumns }).forEach((_, columnIndex) => {
//         this.store[rowIndex][columnIndex] = null;
//       });
//     });
//   }

//   public createLink(startCoordinate: string): [string, string] | null {
//     const start = startCoordinate.split('-');

//     // TODO: get the end coordinates to be used here, it is based on "today"
//     const end = [start[0], '22'];

//     if (isNaN(+start[0]) || isNaN(+start[1]) || isNaN(+end[0]) || isNaN(+end[1])) {
//       // user clicked on a cell that is not a link (the <Header> cells)
//       return null;
//     }

//     const row = +start[0];
//     const columnStart = +start[1];
//     const columnEnd = +end[1];

//     let endCoordinate = startCoordinate;
//     for (let column = columnStart; column <= columnEnd; column++) {
//       endCoordinate = `${row}-${column}`;
//       if (this.store[row][column]) {
//         break;
//       }
//       this.store[row][column] = startCoordinate;
//     }

//     return [startCoordinate, endCoordinate];
//   }

//   public deleteLink(startCoordinate: string): [string, string] | null {
//     const [row, column] = startCoordinate.split('-');

//     // is there a link in the previous column?
//     const content = this.store[+row]?.[+column - 1] || null;

//     let lastColumn = null;
//     for (let c = +column; c < this.totalColumns; c += 1) {
//       if (this.store[+row]?.[c] !== startCoordinate) {
//         lastColumn = c;
//         break;
//       }
//       this.store[+row][c] = content;
//     }

//     // is there a link in the previous column?
//     if (content) {
//       return [content, `${row}-${lastColumn}`];
//     }

//     return null;
//   }
// }

// export default VirtualMainTable.getInstance();
