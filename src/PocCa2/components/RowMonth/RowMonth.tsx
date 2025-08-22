import { useMainTableContext } from '../../context/MainTableContext';
import Cell from '../Cell';
import './RowMonth.css';

const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec',
]

const RowMonth = () => {
  const { mainProps } = useMainTableContext();

  return (
    <>
      {mainProps.model === 'month-day' && (
        <tr>
          <th className="columns" colSpan={31}>
            <Cell content="August" rowIndex="month" columnIndex={0} />
          </th>
        </tr>
      )}

      {mainProps.model === 'year-month' && (
        <tr key={`row-day`} className="rows">
          {Array.from({ length: mainProps.totalColumns }).map((_, columnIndex) => (
            <th key={`day-column-${columnIndex}`} className="columns">
              <Cell content={MONTHS[columnIndex]} rowIndex="day" columnIndex={columnIndex} />
            </th>
          ))}
        </tr>
      )}
    </>
  );
}

export default RowMonth;
