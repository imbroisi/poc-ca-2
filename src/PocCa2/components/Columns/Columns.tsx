import { useMainTableContext } from '../../context/MainTableContext';
import Cell from '../Cell';
import './Columns.css';

export interface ColumnsProps {

}

const Columns = ({rowIndex}: any) => {
  const { props } = useMainTableContext();

  return (
    <>
      {Array.from({ length: props.totalColumns }).map((_, columnIndex) => (
        <td key={`column-${columnIndex}`} className="columns">
          <Cell coordinates={{ rowIndex, columnIndex }} />
        </td>
      ))}
    </>
  );
}

export default Columns;
