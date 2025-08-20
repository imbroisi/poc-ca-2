import Cell, { CellProps } from '../Cell/Cell';
import './Column.css';

const Column = ({ coordinates }: CellProps) => {
  return (
    <td className="column">
      <Cell coordinates={coordinates} />
    </td>
  );
}

export default Column;
