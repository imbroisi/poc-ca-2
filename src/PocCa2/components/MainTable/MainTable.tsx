import Body from '../Body';
import Columns from '../Columns';
import Rows from '../Rows';
import Table from '../Table';
import './MainTable.css';
import { MainTableContextProvider, MainTableProps } from '../../context/MainTableContext';
import { CellManagerProvider } from '../../context/CellManagerContext';
import Header from '../Header';
import RowYear from '../RowYear';
import RowMonth from '../RowMonth';
import RowDay from '../RowDay';

const MainTable = (props: MainTableProps) => {

  console.log('props', props)

  return (
    <CellManagerProvider mainProps={props}>
      <MainTableContextProvider mainProps={props}>
        <Table>
          <Header>
            {props.model === 'year-month' && <RowYear />}
            <RowMonth />  
            {props.model === 'month-day' && <RowDay />}
          </Header>
          <Body>
            <Rows columns={Columns} />
          </Body>
        </Table>
      </MainTableContextProvider>
    </CellManagerProvider>
  );
};

export default MainTable;
