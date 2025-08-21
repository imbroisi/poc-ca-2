import { useMainTableContext } from '../../context/MainTableContext';
import Cell from '../Cell';
import './Columns.css';

export interface ColumnsProps {

}

const Columns = ({rowIndex}: any) => {
  const { mainProps } = useMainTableContext();

  return (
    <>
      {Array.from({ length: mainProps.totalColumns }).map((_, columnIndex) => (
        <td key={`column-${columnIndex}`} className="columns">
          <Cell rowIndex={rowIndex} columnIndex={columnIndex} />
        </td>
      ))}
    </>
  );
}

export default Columns;
