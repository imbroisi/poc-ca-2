import { useMainTableContext } from '../../context/MainTableContext';
import Cell from '../Cell';
import Columns from '../Columns';
import './RowDay.css';

const RowDay = () => {
  const { mainProps } = useMainTableContext();

  return (
    <tr key={`row-day`} className="rows">
      {Array.from({ length: mainProps.totalColumns }).map((_, columnIndex) => (
        <th key={`day-column-${columnIndex}`} className="columns">
          <Cell content={`${columnIndex + 1}`} rowIndex="day" columnIndex={columnIndex} />
        </th>
      ))}
    </tr>
  );
}

export default RowDay;
