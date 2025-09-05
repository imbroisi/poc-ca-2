import { useEffect, useState } from 'react';
import MainTable from './components/MainTable';
import { DateProvider } from './context/DateContext';
import { LinksDataProvider } from './context/LinksDataProvider';
import { apiGetLinksData } from './apiMock';
import { NUMBER_OF_YEARS } from './config';
import { ModalProvider } from './context/ModalContext';
import GlobalModal from './components/GlobalModal/GlobalModal';
import { MessageOverProvider } from './context/MessageOverContext';
import MessageOver from './components/GlobalMessageOver/MessageOver';

const HoldingsHistory = () => {
  const [linksFromApi, setLinksFromApi] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const response = await apiGetLinksData();
      setLinksFromApi(response);
    })();
  }, []);

  if (!linksFromApi) return null;

  return (
    <DateProvider todayDate={linksFromApi.today} numberOfYears={NUMBER_OF_YEARS}>
      <ModalProvider>
        <MessageOverProvider>
          <LinksDataProvider linksDataFromApi={linksFromApi.data}>

            {/* <LeftTable /> */}
            <MainTable />

            <MessageOver />
            <GlobalModal />

          </LinksDataProvider>
        </MessageOverProvider>
      </ModalProvider>
    </DateProvider>
  );
}

export default HoldingsHistory;
