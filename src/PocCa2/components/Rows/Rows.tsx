import './Rows.css';
import { MAIN_TABLE } from '../../config';

const {
  TOTAL_CELLS_IN_MONTH_DAY_MODEL,
  TOTAL_ROWS
} = MAIN_TABLE;

export interface RowsProps {
  columns: React.ComponentType<any>;
}

const Rows = ({columns: Columns}: RowsProps) => {
  // console.log("33) ====== > TOTAL_CELLS_IN_MONTH_DAY_MODEL =", TOTAL_CELLS_IN_MONTH_DAY_MODEL);

  return (
    <>
      {Array.from({ length: TOTAL_ROWS }).map((_, rowIndex) => (
        <tr key={`row-${rowIndex}`} className="rows">
          <Columns rowIndex={rowIndex} />
        </tr>
      ))}
    </>
  );
}

export default Rows;
