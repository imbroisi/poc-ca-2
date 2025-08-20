import Body from '../components/Body';
import Column from '../components/Column';
import Header from '../components/Header';
import RowBody from '../components/RowBody';
import Table from '../components/Table';
import './MainTable.css';

export interface MainTableProps {
  totalRows: number;
  totalColumns: number;
}

const MainTable = ({ totalRows, totalColumns }: MainTableProps) => {
  return (
    <Table>
      <Header>
        TODO
        {/* <RowGroup />
        <RowSubGroup /> */}
      </Header>
      <Body>
        {Array.from({ length: totalRows }).map((_, rowIndex) => (
          <RowBody key={`row-${rowIndex}`}>
            {Array.from({ length: totalColumns }).map((_, columnIndex) => (
              <Column key={`column-${columnIndex}`} coordinates={{ rowIndex, columnIndex }} />
            ))}
          </RowBody>
        ))}
      </Body>
    </Table>
  );
};

export default MainTable;
