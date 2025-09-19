import { DateProvider } from './context/DateContext';
import { ModalProvider } from './context/ModalContext';
import { MessageOverProvider } from './context/MessageOverContext';
// import { ExpandedHoldingsProvider } from './context/ExpandedHoldingsContext';
// import { HoldingsProvider } from './context/HoldingsContext';
import { LinksDataProvider } from './context/LinksDataProvider';
import { FOOTER_HEIGHT, MAIN_BORDER_COLOR, NUMBER_OF_YEARS } from './config';
import MessageOver from './components/GlobalMessageOver';
import GlobalModal from './components/GlobalModal/GlobalModal';
import './HoldingsHistory.css';
import { useEffect, useState } from 'react';
import { apiGetLinksData } from './apiMock';
import MainTable from './components/MainTable';
import { ExpandedHoldingsProvider } from './context/ExpandedHoldingsContext';
import { HoldingsProvider } from './context/HoldingsContext';
import Footer from './components/Footer';

export interface HoldingsHistoryProps {

}

const HoldingsHistory = (props: HoldingsHistoryProps) => {

  const [linksFromApi, setLinksFromApi] = useState<any | null>(null);
  // const [holdings, setHoldings] = useState<Holding[]>([]);

  // // Refs for scroll synchronization
  // const leftTableRef = useRef<HTMLDivElement>(null);
  // const mainTableRef = useRef<HTMLDivElement>(null);
  // const isScrolling = useRef<'left' | 'main' | null>(null);

  // Choose here how many and which holdings will initially be displayed fully open on the table. 
  // TO DO: PAGINATION - Will probably handle pagination in a similar way as well

  useEffect(() => {
    (async () => {
      const response = await apiGetLinksData();
      setLinksFromApi(response);
    })();
  }, []);

  // console.log("34 ==>> linksFromApi", linksFromApi);
  // console.log("35 ==>> linksFromApi.data", linksFromApi?.data);

  if (!linksFromApi) return null;

  // const FOOTER_HEIGHT = '40px';

  return (
    <div
      id="holdings-history-container"
      style={{ height: `calc(100% - ${FOOTER_HEIGHT})`, width: '100%', position: 'relative', border: `1px solid ${MAIN_BORDER_COLOR}` }}
    >
      <DateProvider todayDate={linksFromApi.data.today} numberOfYears={NUMBER_OF_YEARS}>
        <ModalProvider>
          <MessageOverProvider>
            <LinksDataProvider linksDataFromApi={linksFromApi.data.holdings}>
              <ExpandedHoldingsProvider>
                <HoldingsProvider holdings={linksFromApi.data.holdings || []}>

                  <MainTable />
                  <Footer />

                  <MessageOver />
                  <GlobalModal />

                </HoldingsProvider>
              </ExpandedHoldingsProvider>
            </LinksDataProvider>
          </MessageOverProvider>
        </ModalProvider>
      </DateProvider>


    </div>
  );
}

export default HoldingsHistory;
