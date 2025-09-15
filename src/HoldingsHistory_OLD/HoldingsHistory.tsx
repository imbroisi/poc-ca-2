import { useEffect, useMemo, useState, useRef, useCallback } from 'react';
import MainTable from './components/MainTable';
import { DateProvider } from './context/DateContext';
import { LinksDataProvider } from './context/LinksDataProvider';
import { apiGetLinksData, getHoldingsAndAttributesListData } from './apiMock';
import { NUMBER_OF_YEARS } from './config';
import { ModalProvider } from './context/ModalContext';
import GlobalModal from './components/GlobalModal/GlobalModal';
import { MessageOverProvider } from './context/MessageOverContext';
import MessageOver from './components/GlobalMessageOver/MessageOver';
import LeftTable from './components/LeftTable';
import { ExpandedHoldingsProvider } from './context/ExpandedHoldingsContext';
import './HoldingsHistory.css';
import { Holding } from './types/expandTypes';
import { HoldingsProvider } from './context/HoldingsContext';

const HoldingsHistory = () => {
  const [linksFromApi, setLinksFromApi] = useState<any | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);
  
  // Refs for scroll synchronization
  const leftTableRef = useRef<HTMLDivElement>(null);
  const mainTableRef = useRef<HTMLDivElement>(null);
  const isScrolling = useRef<'left' | 'main' | null>(null);

  // Choose here how many and which holdings will initially be displayed fully open on the table. 
  // TO DO: PAGINATION - Will probably handle pagination in a similar way as well

  useEffect(() => {
    (async () => {
      const response = await apiGetLinksData();
      setLinksFromApi(response);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getHoldingsAndAttributesListData();
      setHoldings(response?.data);
    })();
  }, []);

  // Scroll synchronization handlers
  const handleLeftTableScroll = useCallback(() => {
    if (isScrolling.current === 'main') return;
    
    isScrolling.current = 'left';
    if (leftTableRef.current && mainTableRef.current) {
      mainTableRef.current.scrollTop = leftTableRef.current.scrollTop;
    }
    
    setTimeout(() => {
      isScrolling.current = null;
    }, 100);
  }, []);

  const handleMainTableScroll = useCallback(() => {
    if (isScrolling.current === 'left') return;
    
    isScrolling.current = 'main';
    if (leftTableRef.current && mainTableRef.current) {
      leftTableRef.current.scrollTop = mainTableRef.current.scrollTop;
    }
    
    setTimeout(() => {
      isScrolling.current = null;
    }, 100);
  }, []);

  // Setup scroll event listeners
  useEffect(() => {
    const leftTable = leftTableRef.current;
    const mainTable = mainTableRef.current;

    if (leftTable && mainTable) {
      leftTable.addEventListener('scroll', handleLeftTableScroll);
      mainTable.addEventListener('scroll', handleMainTableScroll);

      return () => {
        leftTable.removeEventListener('scroll', handleLeftTableScroll);
        mainTable.removeEventListener('scroll', handleMainTableScroll);
      };
    }
  }, [handleLeftTableScroll, handleMainTableScroll, linksFromApi]);

  const initialExpandedIds = useMemo(() => holdings?.map(i => i.id), [holdings]);

  if (!linksFromApi) return null;

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <DateProvider todayDate={linksFromApi.today} numberOfYears={NUMBER_OF_YEARS}>
        <ModalProvider>
          <MessageOverProvider>
            <LinksDataProvider linksDataFromApi={linksFromApi.data}>
              <ExpandedHoldingsProvider initialExpandedIds={initialExpandedIds}>
                <HoldingsProvider holdings={holdings ?? []}>

                  <div className="top-table-container">
                    <LeftTable ref={leftTableRef} />
                    <MainTable ref={mainTableRef} />
                  </div> 
                  
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
