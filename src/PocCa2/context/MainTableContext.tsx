import React, { createContext, useContext } from 'react'

export interface MainTableProps {
  model: 'year-month' | 'month-day';
}
interface MainTableContextProviderProps {
  children: React.ReactNode;
  mainProps: MainTableProps;
}

const MainTableContext = createContext<any>(undefined)

export const MainTableContextProvider = ({
  children,
  mainProps,
}: MainTableContextProviderProps) => {

  return (
    <MainTableContext.Provider value={{
      mainProps,
    }}>
      {children}
    </MainTableContext.Provider>
  )
};

export const useMainTableContext = () => {
  const context = useContext(MainTableContext)
  if (!context) {
    throw new Error('useMainTableContext must be used within a MainTableContextProvider');
  }
  return context;
};

