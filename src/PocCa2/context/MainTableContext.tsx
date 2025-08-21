import React, { createContext, useContext } from 'react'

const MainTableContext = createContext<any>(undefined)

interface MainTableContextProviderProps {
  children: React.ReactNode;
  mainProps: {
    totalRows: number;
    totalColumns: number;
    mode: 'year' | 'month';
  }
}

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

