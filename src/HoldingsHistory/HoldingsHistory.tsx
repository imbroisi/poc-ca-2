import { DateProvider } from './context/DateContext';
import { ModalProvider } from './context/ModalContext';
import { MessageOverProvider } from './context/MessageOverContext';
// import { ExpandedHoldingsProvider } from './context/ExpandedHoldingsContext';
// import { HoldingsProvider } from './context/HoldingsContext';
import { LinksDataProvider } from './context/LinksDataProvider';
import { NUMBER_OF_YEARS } from './config';
import MessageOver from './components/GlobalMessageOver';
import GlobalModal from './components/GlobalModal/GlobalModal';
import './HoldingsHistory.css';
import { useEffect, useState } from 'react';
import { apiGetLinksData } from './apiMock';
import MainTable from './components/MainTable';

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

  if (!linksFromApi) return null;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DateProvider todayDate={linksFromApi.today} numberOfYears={NUMBER_OF_YEARS}>
        <ModalProvider>
          <MessageOverProvider>
            <LinksDataProvider linksDataFromApi={linksFromApi.data}>
              {/* <ExpandedHoldingsProvider initialExpandedIds={initialExpandedIds}> */}
                {/* <HoldingsProvider holdings={holdings ?? []}> */}

                  <div className="top-table-container">
                    {/* <LeftTable ref={leftTableRef} /> */}
                    <MainTable />

                  </div>

                  <MessageOver />
                  <GlobalModal />

                {/* </HoldingsProvider> */}
              {/* </ExpandedHoldingsProvider> */}
            </LinksDataProvider>
          </MessageOverProvider>
        </ModalProvider>
      </DateProvider>
    </div>
  );
}

export default HoldingsHistory;
