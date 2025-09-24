import { DateProvider } from './context/DateContext';
import { ModalProvider } from './context/ModalContext';
import { MessageOverProvider } from './context/MessageOverContext';
import { LinksDataProvider } from './context/LinksDataProvider';
import { FOOTER_HEIGHT, HEADER_HEIGHT, NUMBER_OF_YEARS } from './config';
import MessageOver from './components/GlobalMessageOver';
import GlobalModal from './components/GlobalModal/GlobalModal';
import styles from './HoldingsHistory.module.scss';
import { useEffect, useState } from 'react';
import { apiGetLinksData } from './apiMock';
import MainTable from './components/MainTable';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import SettingsMenu from './components/SettingsMenu';
import { AttributeSelectionProvider } from './context/AttributeSelecionContext';

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
    <DateProvider todayDate={linksFromApi.data.today} numberOfYears={NUMBER_OF_YEARS}>
      <ModalProvider>
        <MessageOverProvider>
          <LinksDataProvider linksDataFromApi={linksFromApi.data.holdings}>
            <AttributeSelectionProvider>

            <div style={{ display: 'flex', height: '100%', width: '100%', backgroundColor: 'transparent', boxSizing: 'border-box', overflow: 'hidden' }}>
              
              <SettingsMenu />

              <div className={styles.holdingsHistoryContainerWrapper} style={{ flex: 1, minWidth: 0, overflow: 'hidden' }}>
              <div
                id="holdings-history-container"
                className={styles.holdingsHistoryContainer}
                style={{ height: `calc(100% - ${FOOTER_HEIGHT + HEADER_HEIGHT}px)`, backgroundColor: 'white' }}
              >
                <Header />
                <MainTable />
                <Footer />
              </div>
              </div>
            </div>

            <MessageOver />
            <GlobalModal />

            </AttributeSelectionProvider>
          </LinksDataProvider>
        </MessageOverProvider>
      </ModalProvider>
    </DateProvider>
  );
}

export default HoldingsHistory;
