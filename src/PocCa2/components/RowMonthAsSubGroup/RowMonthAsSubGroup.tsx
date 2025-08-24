import { MAIN_TABLE } from '../../config';
import { daysArray, getMonthNameLong, getMonthNameShort, getNDaysAfterToday, today } from '../../utils';

import Cell from '../Cell';

const { CELL_MONTH_WIDTH_PX, NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL } = MAIN_TABLE;

const RowMonthAsSubGroup = () => {

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

  const yearCounts: any = Array.from(new Set(daysArray.map((item: any) => item[2]))).map(year => ({
    year,
    count: daysArray.filter((item: any) => item[2] === year).length
  }));

  console.log("100) --->>> daysArray =", daysArray);

  const monthCounts: any = Array.from(new Set(daysArray.map((item: any) => item[1]))).map(month => ({
    month: getMonthNameShort((month as number) - 1),
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

  console.log("2) --->>> monthCounts =", monthCounts);

  return (
    <>
      {/* {mainProps.model === 'month-day' && ( */}
      <tr key={`row-month`}>
        {Array.from({ length: monthCounts.length * NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL + 1}).map((_, columnIndex) => {

          // console.log("\n20) --->>> daysArray =", daysArray);
          // console.log("21--->>> columnIndex =", columnIndex);
          console.log("22--->>> monthCounts[columnIndex % 12].month =", monthCounts[columnIndex % 12].month);

          return (
            <th key={`month-column-${columnIndex}`} className="columns" style={{ width: CELL_MONTH_WIDTH_PX }}>
              <Cell content={monthCounts[columnIndex % 12].month} rowIndex="month" columnIndex={columnIndex} />
            </th>
          )
        })}
      </tr>
      {/* )} */}
      {/* 
      {mainProps.model === 'year-month' && (
        <tr key={`row-day`} className="rows">
          {Array.from({ length: TOTAL_CELLS_IN_MONTH_DAY_MODEL }).map((_, columnIndex) => (
            <th key={`day-column-${columnIndex}`} className="columns">
              <Cell content={MONTHS[columnIndex]} rowIndex="day" columnIndex={columnIndex} />
            </th>
          ))}
        </tr>
      )} */}
    </>
  );
}

export default RowMonthAsSubGroup;
