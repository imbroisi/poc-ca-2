import Table from '../Table';
import './MainTable.css';
import Header from '../Header';
import { DateProvider } from '../../context/DateContext';
import Body from '../Body';

interface MainTableProps {
  todayDate: Date;
  numberOfYears: number;
  totalAttributes: number;
}

const MainTable = ({ todayDate, numberOfYears, totalAttributes }: MainTableProps) => {
  return (
    // <MainTableContextProvider model={model}>
    //   <CellManagerProvider model={model}>
    <DateProvider todayDate={todayDate} numberOfYears={numberOfYears} totalAttributes={totalAttributes}>
      <Table>
        <Header />
        <Body />
      </Table>
    </DateProvider>
    //   </CellManagerProvider>
    // </MainTableContextProvider>
  )
};

export default MainTable;
