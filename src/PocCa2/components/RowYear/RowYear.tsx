import { MAIN_TABLE } from '../../config';
import { daysArray } from '../../date';
import Cell from '../Cell';

const { CELL_BORDER_COLOR, CELL_MONTH_SPLITED_WIDTH_PX } = MAIN_TABLE;

const RowYear = () => {
  // const yearCounts: any = Array.from(new Set(daysArray.map((item: any) => item[1]))).map(month => ({
  //   month,
  //   count: daysArray.filter((item: any) => item[1] === month).length
  // }));

  // /**
  //  *  monthCounts:
  //  * {
  //  *  month: 'Jan',
  //  *  count: 11 // simulating that the stats for this month starts at day 20 (so 11 days left in this month)
  //  * },
  //  * {
  //  *  month: 'Feb',
  //  *  count: 28
  //  * }
  //  */


  // const yearCounts: any = Array.from(new Set(daysArray.map((item: any) => item[2]))).map(year => ({
  //   year,
  //   count: daysArray.filter((item: any) => item[2] === year).length
  // }));

  console.log("2) --->>> daysArray =", daysArray);

  let yearCounts: any = [];
  let currentYear = daysArray[0][2];
  let currentCount = 1;

  for (let i = 0; i < daysArray.length; i += 1) {
    console.log("1) ===>> daysArray[i][2] currentMonth", daysArray[i][2], '----', currentYear, '----', i);
    if (daysArray[i][2] !== currentYear) {
      console.log("1.1 ===>> currentMonth", currentYear);
      yearCounts.push({ year: currentYear, count: currentCount });
      currentYear = daysArray[i][2];
      currentCount = 1;
    } else {
      currentCount += 1;
    }
  }
  yearCounts.push({ year: currentYear, count: currentCount });

  console.log("21) --->>> yearCounts =", yearCounts);

  // const firstMonth = daysArray[0][2];
  // // console.log("21--->>> firstMonth =", firstMonth);

  // const firstColSpan = (12 - firstMonth + 1) * 6;
  // // console.log("212-->>> firstColSpan =", firstColSpan);

  return (
    <tr>
      {Array.from({ length: yearCounts.length }).map((_, columnIndex) => {

        // console.log("\n20) --->>> daysArray =", daysArray);
        // console.log("21--->>> columnIndex =", columnIndex);
        // console.log("22--->>> monthCounts[columnIndex].month =", monthCounts[columnIndex].month);


        /*
           118 -> 24
           366 -> 72
           266 -> 52
        */
        // const months1 = Math.round(yearCounts[columnIndex].count);

        // console.log("21--->>> months1 =", months1);

        const colSpan = (yearCounts[(columnIndex)].count);


        // const colSpan = columnIndex === 0 ? firstColSpan : 12 * 6;
        // console.log("21--->>> colSpan =", colSpan);





        return (
          <th key={`year-column-${columnIndex}`} colSpan={colSpan} style={{ borderTop: `1px solid ${CELL_BORDER_COLOR}` }}>
            <Cell content={yearCounts[columnIndex].year} rowIndex="year" columnIndex={columnIndex} />
          </th>
        )
      })}
    </tr>
  );
}

export default RowYear;
