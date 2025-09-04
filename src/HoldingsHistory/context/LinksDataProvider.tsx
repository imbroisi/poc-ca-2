import React, { createContext, useContext, useEffect, useState } from 'react'
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
  isEditMode: boolean;
  setIsEditMode: (_: boolean) => void;
  getLinksDataCopy: () => LinksDataTypes[];
  rowsToRender: number;
  cellTopPx: (portfolioIndex: number, attributeIndex: number) => number;
  addLink: (lastDayStr: string, firstDayStr: string, cellIndex: number, cellRowIndex: number) => void;
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
  const [isEditMode, setIsEditMode] = useState(true);
  const [linksData, setLinksData] = useState<any[]>([]);

  useEffect(() => {
    // TODO: format links data from api response to LinksDataTypes
    setLinksData(linksDataFromApi);
  }, [linksDataFromApi]);

  // const linksData = linksDataFromApi;
  // TODO: replace by the real total attributes (maybe from api response)
  const totalAttributes = 7;

  const getLinksDataCopy = () => (
    // returns a safe copy of linksData
    linksData.map((linkData) => ({ ...linkData }))
  );

  // console.log("1009) ===>>> linksData =", linksData);

  const addLink = (lastDayDate: string, firstDayDate: string, attributeIndex: number, portfolioIndex: number) => {
    // console.log("1008) ===>>> addLink =", lastDayStr, firstDayStr, cellIndex, cellRowIndex);
    setLinksData((prev) => [
      ...prev, 
      {
        portfolioIndex,
        attributeIndex,
        firstDayDate,
        lastDayDate,
      }]);
  }

  const rowsToRender = (totalAttributes + 1) * Math.ceil(ROWS_BY_PAGE / (totalAttributes + 1));

  const cellTopPx = (portfolioIndex: number, attributeIndex: number): number => { return CELL_HEIGHT_PX + 2 + (CELL_HEIGHT_PX + 1) * ((1 + totalAttributes) * portfolioIndex + attributeIndex) };

  return (
    <LinksDataContext.Provider value={{
      cellTopPx,
      getLinksDataCopy,
      rowsToRender,
      // linksData, 
      totalAttributes,
      isEditMode,
      setIsEditMode,
      addLink,
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
