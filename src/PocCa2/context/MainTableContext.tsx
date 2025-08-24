import React, { createContext, useContext } from 'react'

interface MainTableContextProviderProps {
  children: React.ReactNode;
  model: 'year-month' | 'month-day';
}

const MainTableContext = createContext<any>(undefined)

export const MainTableContextProvider = ({
  children,
  model,
}: MainTableContextProviderProps) => {

  return (
    <MainTableContext.Provider value={{
      model,
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

