import { useEffect, useMemo, useState } from 'react';
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

import { Holding } from './types/expandTypes';
import { HoldingsProvider } from './context/HoldingsContext';

const HoldingsHistory = () => {
  const [linksFromApi, setLinksFromApi] = useState<any | null>(null);
  const [holdings, setHoldings] = useState<Holding[]>([]);

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

  const initialExpandedIds = useMemo(() => holdings?.map(i => i.id), [holdings]);

  if (!linksFromApi) return null;

  return (
    <DateProvider todayDate={linksFromApi.today} numberOfYears={NUMBER_OF_YEARS}>
      <ModalProvider>
        <MessageOverProvider>
          <LinksDataProvider linksDataFromApi={linksFromApi.data}>
            <ExpandedHoldingsProvider initialExpandedIds={initialExpandedIds}>
              <HoldingsProvider holdings={holdings ?? []}>
                <LeftTable />
                <MainTable />
              </HoldingsProvider>
            </ExpandedHoldingsProvider>
            <MessageOver />
            <GlobalModal />
          </LinksDataProvider>
        </MessageOverProvider>
      </ModalProvider>
    </DateProvider>
  
   

  );
}

export default HoldingsHistory;
