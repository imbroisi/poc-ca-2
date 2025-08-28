import { MAIN_TABLE } from '../../config';
import { daysArray } from '../../date';

import Cell from '../Cell';

const RowMonthAsGroup = () => {

  // const lastMonth = (today.month + MAIN_TABLE.MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL) % 12;

  // const daysAfterToday = getNDaysAfterToday(4);

  // console.log("1) ===> today =", today.isoString);
  // console.log("2) ===> daysAfterToday.day =", daysAfterToday.day);

  // const firstDayToShow = getNDaysAfterToday(-30 * MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL);

  // console.log("2) ===> firstDayToShow.day =", firstDayToShow.day);
  // console.log("2) ===> firstDayToShow.month =", firstDayToShow.month);
  // console.log("2) ===> firstDayToShow.year =", firstDayToShow.year);

  // const lastDayToShow = getEpochDayToYMD(lastDayToShowEpoch);

  // const uniqueMonths: string[] = Array.from(new Set(daysArray.map((item: any) => item[1])));

  const monthCounts: any = Array.from(new Set(daysArray.map((item: any) => item[1]))).map(month => ({
    month,
    count: daysArray.filter((item: any) => item[1] === month).length
  }));

  /**
   *  monthCounts:
   * {
   *  month: 'Jan',
   *  count: 11 // simulating that the stats for this month starts at day 20 (so 11 days left in this month)
   * },
   * {
   *  month: 'Feb',
   *  count: 28
   * }
   */

  // console.log("2) --->>> monthCounts =", monthCounts);

  return (
    <>
      <tr>
        {Array.from({ length: monthCounts.length }).map((_, columnIndex) => {

          // console.log("\n20) --->>> daysArray =", daysArray);
          // console.log("21--->>> columnIndex =", columnIndex);
          // console.log("22--->>> monthCounts[columnIndex].month =", monthCounts[columnIndex].month);

          return (
            <th key={`month-column-${columnIndex}`} className="columns" colSpan={monthCounts[columnIndex].count}>
              <Cell content={monthCounts[columnIndex].month} rowIndex="month" columnIndex={columnIndex} />
            </th>
          )
        })}
      </tr>
    </>
  );
}

export default RowMonthAsGroup;
