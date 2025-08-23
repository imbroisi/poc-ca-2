import { MAIN_TABLE } from '../../config';
import { getMonthNameLong } from '../../utils';
import Cell from '../Cell';
import './RowYear.css';

export interface RowYearProps {

}

const RowYear = (props: RowYearProps) => {
  return (
    <>
        <tr key={`row-month`}>
          {Array.from({ length: MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL }).map((_, columnIndex) => (
            <th key={`year-column-${columnIndex}`} className="columns" colSpan={31}>
              <Cell content={getMonthNameLong(columnIndex)} rowIndex="month" columnIndex={columnIndex} />
            </th>
          ))}
        </tr>
    </>
  );
}

export default RowYear;
