import Cell from '../Cell';
import { MAIN_TABLE } from '../../config';
import './Columns.css';
import { daysArray } from '../../date';
import { useRef } from 'react';

export interface ColumnsProps {

}

const {
  TOTAL_MONTHS_IN_YEAR_MONTH_MODEL,
  MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL,
  CELL_MONTH_WIDTH_PX_SLICES,
  CELL_BORDER_COLOR,
} = MAIN_TABLE;

const Columns = ({ rowIndex, content }: any) => {
  const lastMonth = useRef(daysArray[0][1]);
  // const getMonthDaynumber = (columnIndex: number) => {
  //   return columnIndex % MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL;
  // }



  // console.log("daysArray =", daysArray);

  return (
    <>
      {/* {Array.from({ length: (TOTAL_MONTHS_IN_YEAR_MONTH_MODEL + MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL) * CELL_MONTH_WIDTH_PX_SLICES }).map((_, columnIndex) => { */}
      {Array.from({ length: daysArray.length }).map((_, columnIndex) => {
        if (columnIndex >= daysArray.length) {
          return null;
        }

        let borderVisible = false;
        
        const day = daysArray[columnIndex][0];
        const month = daysArray[columnIndex][1];

        if (month !== lastMonth.current && day === 2) {
          lastMonth.current = month;
          borderVisible = true;
        }


        // console.log("16) ===>> columnIndex", columnIndex);
// 
        return (
          <td key={`column-${columnIndex}`} className="columns" style={{ borderTop: `1px solid ${CELL_BORDER_COLOR}` }}>
            <Cell
              rowIndex={rowIndex}
              columnIndex={columnIndex}
              content={content ? `${daysArray?.[columnIndex]?.[0]}` : '' /*columnIndex.toString()*/}
              borderVisible={borderVisible}
            />
          </td>
        )
      })}
    </>
  );
}

export default Columns;
