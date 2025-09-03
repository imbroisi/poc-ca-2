import React, { createContext, useContext } from 'react'
import { CELL_HEIGHT_PX, ROWS_BY_PAGE } from '../config';

export interface LinksDataTypes {
  id: string;
  portfolioIndex: number;
  attributeIndex: number;
  firstDayDate: string;
  lastDayDate: string;
}

interface LinksDataContextType {
  // linksData: LinksDataTypes[];
  totalAttributes: number;
  getLinksDataCopy: () => LinksDataTypes[];
  rowsToRender: number;
  cellTopPx: (portfolioIndex: number, attributeIndex: number) => number;
}

interface LinksDataProviderProps {
  children: React.ReactNode;
  linksDataFromApi: any[];
}

const LinksDataContext = createContext<LinksDataContextType | undefined>(undefined)

export const LinksDataProvider = ({
  children,
  linksDataFromApi,
}: LinksDataProviderProps) => {

  // TODO: format links data from api response to LinksDataTypes
  const linksData = linksDataFromApi;
  // TODO: replace by the real total attributes (maybe from api response)
  const totalAttributes = 7;

  const getLinksDataCopy = () => (
    // returns a safe copy of linksData
    linksData.map((linkData) => ({ ...linkData }))
  );

  const rowsToRender = (totalAttributes + 1) * Math.ceil(ROWS_BY_PAGE / (totalAttributes + 1));

  const cellTopPx = (portfolioIndex: number, attributeIndex: number): number => { return CELL_HEIGHT_PX + 2 + (CELL_HEIGHT_PX + 1) * ((1 + totalAttributes) * portfolioIndex + attributeIndex) };

  return (
    <LinksDataContext.Provider value={{
      cellTopPx,
      getLinksDataCopy,
      rowsToRender,
      // linksData, 
      totalAttributes,
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
