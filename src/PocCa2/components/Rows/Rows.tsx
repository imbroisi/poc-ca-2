// import { useMainTableContext } from '../../context/MainTableContext';
import './Rows.css';
import { MAIN_TABLE } from '../../config';

const {
  TOTAL_CELLS_IN_MONTH_DAY_MODEL,
} = MAIN_TABLE;

export interface RowsProps {
  columns: React.ComponentType<any>;
}

const Rows = ({columns: Columns}: RowsProps) => {
  // const { mainProps } = useMainTableContext();

  return (
    <>
      {Array.from({ length: TOTAL_CELLS_IN_MONTH_DAY_MODEL }).map((_, rowIndex) => (
        <tr key={`row-${rowIndex}`} className="rows">
          <Columns rowIndex={rowIndex} />
        </tr>
      ))}
    </>
  );
}

export default Rows;
