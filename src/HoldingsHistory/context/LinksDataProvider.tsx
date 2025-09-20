import React, { createContext, useContext, useEffect, useRef, useState } from 'react'
import { ATTRIBUTE_ITEM_HEIGHT, HOLDINGS_PER_PAGE_DEFAULT, TOTAL_ATTRIBUTES } from '../config';
import { useDateContext } from './DateContext';
import { ValueLink } from '../types/expandTypes';

export interface LinksDataTypes {
  id: string;
  portfolioIndex: number;
  attributeIndex: number;
  firstDayDate: string;
  lastDayDate: string;
  attributeId: string;
  holdingId: string;
  holdingName: string;
  clientId: string;
  inceptionDate: string;
  valueLinks: ValueLink[];
}

interface LinksDataContextType {
  totalHoldings: number;
  isEditMode: boolean;
  setIsEditMode: (_: boolean) => void;
  getLinksDataCopy: () => LinksDataTypes[];
  rowsToRender: number;
  cellTopPx: (portfolioIndex: number, attributeIndex: number) => number;
  addLink: (lastDayStr: string, firstDayStr: string, cellIndex: number, cellRowIndex: number) => void;
  deleteLink: (linkData: LinksDataTypes) => void;
  setHoldingsPerPage: (page: number) => void;
  pageToShow: number;
  holdingsPerPage: number;
  setPageToShow: (page: number) => void;
  getHoldingsFilteredByPage: () => LinksDataTypes[];
}

interface LinksDataProviderProps {
  children: React.ReactNode;
  linksDataFromApi: any[];
}

const LOCAL_STORAGE_HOLDINGS_PAGE_KEY = 'holdings-history-holdings-per-page';
const holdingsPerPageInitial = parseInt(localStorage.getItem(LOCAL_STORAGE_HOLDINGS_PAGE_KEY) || HOLDINGS_PER_PAGE_DEFAULT.toString());

// console.log("100 ==>> holdingsPerPageInitial", holdingsPerPageInitial);

const LinksDataContext = createContext<LinksDataContextType | undefined>(undefined)

export const LinksDataProvider = ({
  children,
  linksDataFromApi,
}: LinksDataProviderProps) => {
  const [isEditMode, setIsEditMode] = useState(true);
  const [linksData, setLinksData] = useState<any[]>([]);
  const [pageToShow, setPageToShow] = useState(1);
  const [holdingsPerPage, setHoldingsPerPage] = useState(holdingsPerPageInitial);
  const dateCtx = useDateContext();
  const totalHoldings = useRef(0);
  const getNDaysBefore = dateCtx?.getNDaysBefore ?? ((date: string, n: number) => {
    const d = new Date(date);
    d.setUTCDate(d.getUTCDate() - n);
    return d.toISOString().split('T')[0];
  });

  // console.log("9 ==>> linksDataFromApi", linksDataFromApi);

  useEffect(() => {
    // TODO: format links data from api response to LinksDataTypes
    setLinksData(linksDataFromApi);
    totalHoldings.current = linksDataFromApi.length;

  }, [linksDataFromApi]);

  // const linksData = linksDataFromApi;
  // TODO: replace by the real total attributes (maybe from api response)
  // const TOTAL_ATTRIBUTES = 9;

  const getLinksDataCopy = () => {
    // returns a safe copy of linksData
    // const linksDataPaginated = linksData.slice((pageToShow - 1) * HOLDINGS_PER_PAGE_DEFAULT, pageToShow * HOLDINGS_PER_PAGE_DEFAULT);
    // console.log("12 ==>> linksDataPaginated", linksDataPaginated);
    // return linksDataPaginated.map((linkData) => ({ ...linkData }));

    return linksData.map((linkData) => ({ ...linkData }));

    
    
  };

  // console.log("1009) ===>>> linksData =", linksData);

  const addLink = (lastDayDate: string, firstDayDate: string, attributeIndex: number, portfolioIndex: number) => {
    // console.log("1008) ===>>> addLink =", lastDayDate, firstDayDate, attributeIndex, portfolioIndex);
    setLinksData((prev) => [
      ...prev, 
      {
        portfolioIndex,
        attributeIndex,
        firstDayDate,
        lastDayDate,
      }]);
  }

  const deleteLink = (linkDataToDelete: LinksDataTypes) => {
    const linksDataCopy = [...linksData];

    // delete linkDataToDelete from linksData
    const deleteIndex = linksDataCopy.findIndex(link => 
      link.portfolioIndex === linkDataToDelete.portfolioIndex &&
      link.attributeIndex === linkDataToDelete.attributeIndex &&
      link.firstDayDate === linkDataToDelete.firstDayDate
    );
    if (deleteIndex === -1) return;
    // capture actual end date of the link being removed from current state
    const removedEndDate = linksDataCopy[deleteIndex].lastDayDate;
    linksDataCopy.splice(deleteIndex, 1);

    // adjust size of previous link
    const lastDayDateBefore = getNDaysBefore(linkDataToDelete.firstDayDate, 1);
    const previousLink = linksDataCopy.find(link => 
      link.portfolioIndex === linkDataToDelete.portfolioIndex &&
      link.attributeIndex === linkDataToDelete.attributeIndex &&
      link.lastDayDate === lastDayDateBefore
    );
    if (previousLink) {
      // extend previous link to the removed link's actual end date
      previousLink.lastDayDate = removedEndDate;
    }

    setLinksData(linksDataCopy);
  }

  const getHoldingsFilteredByPage = () => {
    const holdingsPerPageToUse = holdingsPerPage === -1 ? totalHoldings.current : holdingsPerPage;
    // console.log("100 ==>> pageToShow", pageToShow);
    // console.log("101 ==>> holdingsPerPage", holdingsPerPage);
    return linksData.slice((pageToShow - 1) * holdingsPerPageToUse, pageToShow * holdingsPerPageToUse);
  }

  // const setPageToShow = (page: number) => {
  //   setPageToShow(page);
  // }

  const rowsToRender = (TOTAL_ATTRIBUTES + 1) * Math.ceil(HOLDINGS_PER_PAGE_DEFAULT / (TOTAL_ATTRIBUTES + 1));

  const cellTopPx = (portfolioIndex: number, attributeIndex: number): number => { return ATTRIBUTE_ITEM_HEIGHT + 2 + (ATTRIBUTE_ITEM_HEIGHT + 1) * ((1 + TOTAL_ATTRIBUTES) * portfolioIndex + attributeIndex) };

  const setHoldingsPerPageFn = (page: number) => {
    setHoldingsPerPage(page);
    
    localStorage.setItem(LOCAL_STORAGE_HOLDINGS_PAGE_KEY, 
      (page === Infinity ? HOLDINGS_PER_PAGE_DEFAULT : page).toString());

    // Reset to first page when changing holdings per page
    setPageToShow(1); 
  }
  

  return (
    <LinksDataContext.Provider value={{
      cellTopPx,
      getLinksDataCopy,
      getHoldingsFilteredByPage,
      holdingsPerPage,
      rowsToRender,
      totalHoldings: totalHoldings.current,
      pageToShow, 
      setPageToShow,
      setHoldingsPerPage: setHoldingsPerPageFn,
      isEditMode,
      setIsEditMode,
      addLink,
      deleteLink,
    }}>
      {children}
    </LinksDataContext.Provider>
  )
};

export const useLinksDataContext = () => {
  const context = useContext(LinksDataContext)
  if (!context) {
    throw new Error('useLinksDataContext must be used within a LinksDataProvider');
  }
  return context;
};
