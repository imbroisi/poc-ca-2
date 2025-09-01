import Columns from '../Columns';
import Rows from '../Rows';
import Table from '../Table';
import './MainTable.css';
import { MainTableContextProvider } from '../../context/MainTableContext';
import { CellManagerProvider } from '../../context/CellManagerContext';
import Header from '../Header';
import RowYear from '../RowYear';
import RowMonthAsSubGroup from '../RowMonthAsSubGroup';
import RowDay from '../RowDay';
import RowMonthAsGroup from '../RowMonthAsGroup';
import RowHeaderGroup from '../RowHeaderGroup';
import RowHeaderSubGroup from '../RowHeaderSubGroup';
import RowsHeader from '../RowsHeader';
import Body from '../Body';

interface Model {
  model: 'year-month' | 'month-day';
}

const MainTable = ({ model }: Model) => (

  <MainTableContextProvider model={model}>
    <CellManagerProvider model={model}>
      <Table>
        <Header>
          <RowsHeader />
          {/* <RowHeaderSubGroup /> */}
        </Header>
        <Body>
          <Rows columns={Columns} />
        </Body>
      </Table>
    </CellManagerProvider>
  </MainTableContextProvider>

);

export default MainTable;
