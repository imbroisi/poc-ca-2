import { DateProvider } from './context/DateContext';
import { ModalProvider } from './context/ModalContext';
import { MessageOverProvider } from './context/MessageOverContext';
import { LinksDataProvider } from './context/LinksDataProvider';
import { FOOTER_HEIGHT, HEADER_HEIGHT, MAIN_BORDER_COLOR, NUMBER_OF_YEARS } from './config';
import MessageOver from './components/GlobalMessageOver';
import GlobalModal from './components/GlobalModal/GlobalModal';
import './HoldingsHistory.css';
import { useEffect, useState } from 'react';
import { apiGetLinksData } from './apiMock';
import MainTable from './components/MainTable';
import { ExpandedHoldingsProvider } from './context/ExpandedHoldingsContext';
import { HoldingsProvider } from './context/HoldingsContext';
import Footer from './components/Footer';
import Header from './components/Header/Header';

export interface HoldingsHistoryProps {

}

const HoldingsHistory = (props: HoldingsHistoryProps) => {
  const [linksFromApi, setLinksFromApi] = useState<any | null>(null);

  useEffect(() => {
    (async () => {
      const response = await apiGetLinksData();
      setLinksFromApi(response);
    })();
  }, []);

  if (!linksFromApi) return null;

  return (
    <DateProvider todayDate={linksFromApi.data.today} numberOfYears={NUMBER_OF_YEARS}>
      <ModalProvider>
        <MessageOverProvider>
          <LinksDataProvider linksDataFromApi={linksFromApi.data.holdings}>

            <div className="holdings-history-container-wrapper">
              <div
                id="holdings-history-container"
                className="holdings-history-container"
                style={{ height: `calc(100% - ${FOOTER_HEIGHT + HEADER_HEIGHT}px)` }}
              >
                <Header />
                <MainTable />
                <Footer />
              </div>
            </div>

            <MessageOver />
            <GlobalModal />

          </LinksDataProvider>
        </MessageOverProvider>
      </ModalProvider>
    </DateProvider>
  );
}

export default HoldingsHistory;
