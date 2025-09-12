import { useEffect, useState } from 'react';
import MainTable from './components/MainTable';
import { DateProvider } from './context/DateContext';
import { LinksDataProvider } from './context/LinksDataProvider';
import { apiGetLinksData } from './apiMock';
import { NUMBER_OF_YEARS } from './config';
import GlobalModal from './components/GlobalModal/GlobalModal';
import LeftTable from './components/LeftTable';
import { ExpandedHoldingsProvider } from './context/ExpandedHoldingsContext';

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
    <LinksDataProvider linksDataFromApi={linksFromApi.data}>
      <DateProvider todayDate={linksFromApi.today} numberOfYears={NUMBER_OF_YEARS}>
        <ExpandedHoldingsProvider>
          <LeftTable />
          <MainTable />
        </ExpandedHoldingsProvider>
        <GlobalModal />
      </DateProvider>
    </LinksDataProvider>
  );
}

export default HoldingsHistory;