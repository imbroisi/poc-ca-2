import Body from '../Body';
import Columns from '../Columns';
import Rows from '../Rows';
import Table from '../Table';
import './MainTable.css';
import { MainTableContextProvider } from '../../context/MainTableContext';
import { CellManagerProvider } from '../../context/CellManagerContext';
import Header from '../Header';
import RowYear from '../RowYear';
import RowMonth from '../RowMonth';
import RowDay from '../RowDay';

interface MainTableProps {
  model: 'year-month' | 'month-day';
}

const MainTable = (props: MainTableProps) => {
  console.log('>> MainTable props', props);
  return (
    <MainTableContextProvider mainProps={props}>
      <CellManagerProvider mainProps={props}>
        <Table>
          <Header>
            {props.model === 'year-month' && <RowYear />}
            <RowMonth />
            {props.model === 'month-day' && <RowDay columns={Columns} />}
          </Header>
          <Body>
            <Rows columns={Columns} />
          </Body>
        </Table>
      </CellManagerProvider>
    </MainTableContextProvider>
  );
};

export default MainTable;
