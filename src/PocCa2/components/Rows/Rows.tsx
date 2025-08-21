import { useMainTableContext } from '../../context/MainTableContext';
import Columns from '../Columns';
import './Rows.css';

export interface RowsProps {
  children: React.ComponentType<any>;
}

const Rows = ({children: Component}: RowsProps) => {
  const { props } = useMainTableContext();

  return (
    <>
      {Array.from({ length: props.totalRows }).map((_, rowIndex) => (
        <tr key={`row-${rowIndex}`} className="rows">
          {/* <Columns rowIndex={rowIndex} /> */}
          {/* {children({ rowIndex })} */}
          <Component rowIndex={rowIndex} />
        </tr>
      ))}
    </>
  );
}

export default Rows;
