import React, { createContext, useContext } from 'react'

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

  return (
    <LinksDataContext.Provider value={{
      getLinksDataCopy,
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
