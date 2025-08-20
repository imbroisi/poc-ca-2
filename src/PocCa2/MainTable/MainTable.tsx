import Column from '../components/Column';
import Row from '../components/Row';
import Table from '../components/Table';
import './MainTable.css';

export interface MainTableProps {
  totalRows: number;
  totalColumns: number;
}

const MainTable = ({ totalRows, totalColumns }: MainTableProps) => {
  return (
    <Table>
      {Array.from({ length: totalRows }).map((_, rowIndex) => (
        <Row key={`row-${rowIndex}`}>
          {Array.from({ length: totalColumns }).map((_, columnIndex) => (
            <Column key={`column-${columnIndex}`} coordinates={{ rowIndex, columnIndex }} />
          ))}
        </Row>
      ))}
    </Table>
  );
}

export default MainTable;
