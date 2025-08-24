import Cell from '../Cell';
import { MAIN_TABLE } from '../../config';
import './Columns.css';
import { daysArray } from '../../utils';

export interface ColumnsProps {

}

const {
  TOTAL_CELLS_IN_YEAR_MONTH_MODEL,
  MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL,
  CELL_MONTH_WIDTH_PX_SLICES,
} = MAIN_TABLE;

const Columns = ({ rowIndex, content }: any) => {

  // const getMonthDaynumber = (columnIndex: number) => {
  //   return columnIndex % MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL;
  // }



  // console.log("daysArray =", daysArray);

  return (
    <>
      {Array.from({ length: (TOTAL_CELLS_IN_YEAR_MONTH_MODEL + MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL) * CELL_MONTH_WIDTH_PX_SLICES }).map((_, columnIndex) => {
        // console.log("2) --->>> daysArray.length =", daysArray.length);
        // console.log("2)--->>> columnIndex =", columnIndex);

        if (columnIndex >= daysArray.length) {//} || (content && !daysArray?.[columnIndex]?.[0])) {
          return null;
        }
        return (
          <td key={`column-${columnIndex}`} className="columns">
            <Cell
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              content={content ? `${daysArray?.[columnIndex]?.[0]}` : columnIndex.toString()} />
          </td>
        )
      })}
    </>
  );
}

export default Columns;
