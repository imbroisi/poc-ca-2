import { useRef } from 'react';
import { MAIN_TABLE } from '../../config';
import { daysArray, getMonthNameLong, getMonthNameShort, getNDaysAfterToday, getTotalColumns, today } from '../../utils';

import Cell from '../Cell';

const { CELL_BORDER_COLOR, CELL_MONTH_WIDTH_PX_SLICES, CELL_MONTH_SPLITED_WIDTH_PX, NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL } = MAIN_TABLE;

const RowMonthAsSubGroup = () => {
  const lastMonth = useRef(-1);
  // const lastMonth = (today.month + MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL) % 12;

  // const daysAfterToday = getNDaysAfterToday(4);

  // console.log("1) ===> today =", today.isoString);
  // console.log("2) ===> daysAfterToday.day =", daysAfterToday.day);

  // const firstDayToShow = getNDaysAfterToday(-30 * MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL);

  // console.log("2) ===> firstDayToShow.day =", firstDayToShow.day);
  // console.log("2) ===> firstDayToShow.month =", firstDayToShow.month);
  // console.log("2) ===> firstDayToShow.year =", firstDayToShow.year);

  // const lastDayToShow = getEpochDayToYMD(lastDayToShowEpoch);

  // const uniqueMonths: string[] = Array.from(new Set(daysArray.map((item: any) => item[1])));

  // const totalMonths = MAIN_TABLE.NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL * 12;

  // const yearCounts: any = Array.from(new Set(daysArray.map((item: any) => item[2]))).map(year => ({
  //   year,
  //   count: daysArray.filter((item: any) => item[2] === year).length
  // }));

  // console.log("100) --->>> yearCounts =", yearCounts);

  // const monthCounts: any = Array.from(new Set(daysArray.map((item: any) => item[1]))).map(month => ({
  //   month: getMonthNameShort((month as number) - 1),
  //   count: daysArray.filter((item: any) => item[1] === month).length
  // }));

  const monthCounts: any = [];
  let currentMonth = daysArray[0][1];
  console.log("0) ===>> currentMonth", currentMonth);


  let currentCount = 1;

  for (let i = 0; i < daysArray.length; i += 1) {
    console.log("1) ===>> daysArray[i][1] currentMonth", daysArray[i][1], '----', currentMonth, '----', i);
    if (daysArray[i][1] !== currentMonth) {
      console.log("1.1 ===>> currentMonth", currentMonth);
      monthCounts.push({ month: getMonthNameShort((currentMonth as number) - 1), count: currentCount });
      currentMonth = daysArray[i][1];
      currentCount = 1;
    } else {
      currentCount += 1;
    }
  }

  monthCounts.push({ month: getMonthNameShort((currentMonth as number) - 1), count: currentCount });

  console.log("12.5) ===>> monthCounts", monthCounts);


  /**ß
   * {Boa
   * 
   *  month: 'Jan',
   *  count: 11 // simulating that the stats for this month starts at day 20 (so 11 days left in this month)
   * },
   * {
   *  month: 'Feb',
   *  count: 28
   * }
   */

  // console.log("2) ---------------->>> monthCounts.length * NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL + 1 =", monthCounts.length * NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL + 1);


  const totalColumns = getTotalColumns();


  return (
      <tr key={`row-month`}>
        {Array.from({ length: totalColumns }).map((_, columnIndex) => {

          // console.log("\n12) ===>> columnIndex", columnIndex);

          if(!monthCounts[(columnIndex)]) {
            return null;
          }


          // console.log("\n20) --->>> daysArray =", daysArray);
          // console.log("21--->>> columnIndex =", columnIndex, monthCounts[columnIndex % 12].month);
          // console.log("22--->>> monthCounts[columnIndex % 12].month =", monthCounts[columnIndex % 12].month);

          // return Array.from({ length: 1 }).map((_, index) => {
          // console.log("21--->>> columnIndex =", columnIndex, monthCounts[columnIndex % 12].month);

          // let borderVisible = false;

          // const day = daysArray[columnIndex][0];
          // const month = daysArray[columnIndex][1];



          // if (month !== lastMonth.current && day === 3) {
          //   lastMonth.current = month;
          //   borderVisible = true;
          // }

          const colSpan = (monthCounts[(columnIndex)].count) ;

          console.log("13) ===>> monthCounts", monthCounts);
          console.log("14) ===>> monthCounts[(columnIndex)]", monthCounts[(columnIndex)]);


          // const colSpan = (monthCounts[(columnIndex) % 12].count);

          console.log("15) ===>> month, colSpan", monthCounts[columnIndex].month, colSpan);


          // console.log("13) ===>> monthCounts[columnIndex % 12].count", monthCounts[columnIndex % 12].count);

          return (
            <th key={`month-column-${columnIndex}-${0}`} colSpan={colSpan} className="columns" style={{ borderTop: `1px solid ${CELL_BORDER_COLOR}` }}>
            {/* <th key={`month-column-${columnIndex}-${0}`} colSpan={monthCounts[columnIndex % 12].count + 1} className="columns" style={{ width: CELL_MONTH_SPLITED_WIDTH_PX }}> */}
              <Cell
                content={monthCounts[columnIndex % 12].month}
                rowIndex="month"
                columnIndex={columnIndex}
                colSpaned={colSpan}//monthCounts[columnIndex % 12].count / 6}// / 12}//CELL_MONTH_WIDTH_PX_SLICES} 
                borderVisible//={borderVisible}
                // isHeader
              />
            </th>
          )

          // })
        })}
      </tr>
  );
}

export default RowMonthAsSubGroup;
