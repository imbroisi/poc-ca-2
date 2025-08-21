import React, { createContext, useContext } from 'react'

const MainTableContext = createContext<any>(undefined)

interface MainTableContextProviderProps {
  children: React.ReactNode;
  props: {
    totalRows: number;
    totalColumns: number;
    mode: 'year' | 'month';
  }
}

export const MainTableContextProvider = ({ 
  children, 
  props,
}: MainTableContextProviderProps) => {
  return (
    <MainTableContext.Provider value={{
      props,
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

