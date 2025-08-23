import { useMainTableContext } from '../../context/MainTableContext';
import Cell from '../Cell';
import { RowsProps } from '../Rows/Rows';
import './RowDay.css';

const RowDay = ({ columns: Columns }: RowsProps) => {
  const { mainProps } = useMainTableContext();

  return (
    // <tr key={`row-day`} className="rows">
    //   {Array.from({ length: mainProps.totalColumns }).map((_, columnIndex) => (
    //     <th key={`day-column-${columnIndex}`} className="columns">
    //       <Cell content={'X'} rowIndex="day" columnIndex={columnIndex} />
    //     </th>
    //   ))}
    // </tr>
    // <>
    //   {Array.from({ length: mainProps.totalRows }).map((_, rowIndex) => (
        <tr key={`row-day`} className="rows">
          <Columns content={true} />
        </tr>
    //   ))}
    // </>
  );
}

export default RowDay;
