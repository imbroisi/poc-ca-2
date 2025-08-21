import { useMainTableContext } from '../../context/MainTableContext';
import './Rows.css';

export interface RowsProps {
  columns: React.ComponentType<any>;
}

const Rows = ({columns: Columns}: RowsProps) => {
  const { mainProps } = useMainTableContext();

  return (
    <>
      {Array.from({ length: mainProps.totalRows }).map((_, rowIndex) => (
        <tr key={`row-${rowIndex}`} className="rows">
          <Columns rowIndex={rowIndex} />
        </tr>
      ))}
    </>
  );
}

export default Rows;
