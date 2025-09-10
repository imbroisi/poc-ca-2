import React, { createContext, useContext, useEffect, useState } from 'react'
import { CELL_HEIGHT_PX, ROWS_BY_PAGE } from '../config';
import { useDateContext } from './DateContext';

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
  deleteLink: (linkData: LinksDataTypes) => void;
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
  const dateCtx = useDateContext();
  const getNDaysBefore = dateCtx?.getNDaysBefore ?? ((date: string, n: number) => {
    const d = new Date(date);
    d.setUTCDate(d.getUTCDate() - n);
    return d.toISOString().split('T')[0];
  });

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

  const rowsToRender = (totalAttributes + 1) * Math.ceil(ROWS_BY_PAGE / (totalAttributes + 1));

  const cellTopPx = (portfolioIndex: number, attributeIndex: number): number => { return CELL_HEIGHT_PX + 2 + (CELL_HEIGHT_PX + 1) * ((1 + totalAttributes) * portfolioIndex + attributeIndex) };

  return (
    <LinksDataContext.Provider value={{
      cellTopPx,
      getLinksDataCopy,
      rowsToRender,
      totalAttributes,
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
