import Cell from '../Cell';
import './RowYear.css';

export interface RowYearProps {

}

const RowYear = (props: RowYearProps) => {
  return (
    <tr>
        <th className="columns" colSpan={12}>
          <Cell content="2025" rowIndex="year" columnIndex={0} />
        </th>
    </tr>
  );
}

export default RowYear;
