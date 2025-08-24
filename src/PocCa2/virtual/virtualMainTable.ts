/** store format
 * 
 *     {
 *       '0-0': {
 *         '0-0': null,
 *         '0-1': null,
 *         '0-2': null,
 *         '0-3': null,
 *         '0-4': null,
 *         '0-5': [0-0, 0-5], // Link start coordinate, it is the reference to the Link (like an id)
 *         '0-6': [0-0, 0-5], // All cells of a Link have the same reference
 *         '0-7': [0-0, 0-5], // All cells of a Link have the same reference 
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
import { MAIN_TABLE } from "../config";

const {
  TOTAL_CELLS_IN_MONTH_DAY_MODEL,
  DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL,
  TOTAL_CELLS_IN_YEAR_MONTH_MODEL,
  MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL,
  CELL_MONTH_WIDTH_PX_SLICES,
} = MAIN_TABLE;
interface StoreData {
  [key: number]: {
    [key: number]: string | null;
  };
}

const store = {} as StoreData;

const createLink = (startCoordinate: string) => {
  // Parse coordinates once and use the numeric values
  const [rowStr, colStr] = startCoordinate.split('-');
  const row = +rowStr;
  const columnStart = +colStr;
  
  // Calculate end column directly
  const columnEnd = 
    (TOTAL_CELLS_IN_YEAR_MONTH_MODEL + MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL) 
    * CELL_MONTH_WIDTH_PX_SLICES - CELL_MONTH_WIDTH_PX_SLICES;

  if (isNaN(row) || isNaN(columnStart) || isNaN(columnEnd)) {
    // Invalid coordinates
    return null;
  }

  const linkReference = startCoordinate;

  console.log("221) ===>> startCoordinate", startCoordinate);
  console.log("222) ===>> columnEnd", columnEnd);

  // console.log("228) ===>> startCoordinate", startCoordinate);

  // is there a Link already in place? (so using today's column)
  let endCoordinate = startCoordinate;
  for (let column = columnStart; column < columnEnd; column += 1) {
    // Removed console.log for performance
    endCoordinate = `${row}-${column}`;
    if (store?.[row]?.[column]) {
      // yes, there is a Link in place, so this cell is the end of the Link to be created
      break;
    }
    if (!store?.[row]) {
      store[row] = {};
    }

    // all cells of the Link have the same reference (see example at the top of the file)
    store[row][column] = linkReference;
  }

  console.log("223) ===>> endCoordinate", endCoordinate);

  return [startCoordinate, endCoordinate];
}

const deleteLink = (startCoordinate: string) => {
  // Parse coordinates once
  const [rowStr, colStr] = startCoordinate.split('-');
  const row = +rowStr;
  const column = +colStr;

  if (isNaN(row) || isNaN(column)) {
    return null;
  }

  // Get previous cell content
  const cellContent = store[row]?.[column - 1] || null;
  let lastColumn = null;
  
  // Use pre-calculated limit
  // const maxColumn = TOTAL_CELLS_IN_MONTH_DAY_MODEL - DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL * 30;

  const maxColumn = (TOTAL_CELLS_IN_YEAR_MONTH_MODEL + 1) * CELL_MONTH_WIDTH_PX_SLICES - 1;

  // console.log("235) ===>> TOTAL_CELLS_IN_YEAR_MONTH_MODEL", TOTAL_CELLS_IN_YEAR_MONTH_MODEL);
  // console.log("236) ===>> MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL", MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL);
  console.log("237) ===>> maxColumn", maxColumn);

  
  // Optimize the loop by avoiding repeated property access and type conversion
  for (let c = column; c < maxColumn; c += 1) {
    if (store[row]?.[c] !== startCoordinate) {
      lastColumn = c - 1;
      break;
    }
    store[row][c] = cellContent;
  }

  // console.log("235) ===>> (TOTAL_CELLS_IN_YEAR_MONTH_MODEL + 1) * CELL_MONTH_WIDTH_PX_SLICES", (TOTAL_CELLS_IN_YEAR_MONTH_MODEL + 1) * CELL_MONTH_WIDTH_PX_SLICES);

  console.log("235) ===>> lastColumn", lastColumn);

  // is there a link in the previous cell?
  if (cellContent) {
    // yes
    return [cellContent, `${row}-${lastColumn}`];
  }

  return null;
}

const virtualMainTable = {
  createLink,
  deleteLink,
};

export default virtualMainTable;
