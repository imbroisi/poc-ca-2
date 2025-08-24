import { MAIN_TABLE } from '../../config';
import { daysArray } from '../../utils';
import Cell from '../Cell';

const { NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL } = MAIN_TABLE;

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


  const yearCounts: any = Array.from(new Set(daysArray.map((item: any) => item[2]))).map(year => ({
    year,
    count: daysArray.filter((item: any) => item[2] === year).length
  }));

  // console.log("2) --->>> daysArray =", daysArray);

  console.log("21) --->>> yearCounts =", yearCounts);


  // return <div>RowYear</div>;

  return (
    <>
      <tr>
        {Array.from({ length: yearCounts.length }).map((_, columnIndex) => {

          // console.log("\n20) --->>> daysArray =", daysArray);
          // console.log("21--->>> columnIndex =", columnIndex);
          // console.log("22--->>> monthCounts[columnIndex].month =", monthCounts[columnIndex].month);

          return (
            <th key={`year-column-${columnIndex}`} className="columns" colSpan={Math.round(yearCounts[columnIndex].count / 30)}>
              <Cell content={yearCounts[columnIndex].year} rowIndex="year" columnIndex={columnIndex} />
            </th>
          )
        })}
      </tr>
    </>
  );
}

export default RowYear;
