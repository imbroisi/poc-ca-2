import Body from '../Body';
import Columns from '../Columns';
// import Header from '../Header';
// import RowBody from '../RowBody';
import Rows from '../Rows';
import Table from '../Table';
import './MainTable.css';
import { MainTableContextProvider } from '../../context/MainTableContext';
import { useEffect } from 'react';
import VirtualMainTable from '../../virtual/virtualMainTable';
import { CellManagerProvider } from '../../context/CellManagerContext';
export interface MainTableProps {
  totalRows: number;
  totalColumns: number;
  mode: 'year' | 'month';
}


const MainTable = (props: MainTableProps) => {

  useEffect(() => {
    const virtualMainTable = new VirtualMainTable(props.totalRows, props.totalColumns);

    console.log('virtualMainTable', virtualMainTable);
  }, [props.totalRows, props.totalColumns]);

  return (
    <CellManagerProvider mainProps={props}>
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
    </CellManagerProvider>
  );
};

export default MainTable;
