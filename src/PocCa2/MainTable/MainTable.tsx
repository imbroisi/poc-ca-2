import Body from '../components/Body';
// import Column from '../components/Column';
import Columns from '../components/Columns';
import Header from '../components/Header';
import RowBody from '../components/RowBody';
import Rows from '../components/Rows';
import Table from '../components/Table';
import './MainTable.css';
import { MainTableContextProvider } from '../context/MainTableContext';
export interface MainTableProps {
  totalRows: number;
  totalColumns: number;
  mode: 'year' | 'month';
}


const MainTable = (props: MainTableProps) => {
  return (
    <MainTableContextProvider mainProps={props}>
      <Table> 
        {/* <Header>
          <RowGroup mode={mode} />
        </Header> */}
        <Body>
          <Rows columns={Columns} />
        </Body>
      </Table>
    </MainTableContextProvider>
  );
};

export default MainTable;
