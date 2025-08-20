import React, { createContext, useCallback, useContext, useRef } from 'react'

interface CellManagerType {
  registerCallbacks: (cellId: string, callbacks: any) => void;
  onClick: (cellId: string, source: 'cell' | 'block') => void;
  // initializeCellsMapping: (totalRows: number, totalCoumns: number) => void;
}

interface CellCallbacks {
  onFireCell?: (_: any) => void;
  onFireBlock?: (_: any, _2?: any) => void;
}

const CellManagerContext = createContext<CellManagerType | undefined>(undefined)

export const CellManagerProvider = ({ children }: { children: React.ReactNode }) => {
  // const cellsMapping = useRef<any>({});
  const cellCallbacks = useRef<Record<string, CellCallbacks>>({});

  const registerCallbacks = useCallback((cellId: string, callbacks: CellCallbacks) => {
    cellCallbacks.current[cellId] = callbacks;
  }, []);

  const onClick = (cellId: string, source: 'cell' | 'block') => {
    if (source === 'cell') {
      cellCallbacks.current[cellId]?.onFireBlock?.('B-F', 'B-J');
      return;
    }

    if (source === 'block') {
      // TODO: open options menu (info, delete, etc)
      cellCallbacks.current[cellId]?.onFireBlock?.(null);
    }
  }

  // const initializeCellsMapping = (totalRows: number, totalCoumns: number) => {
  //   for (let rowIndex = 0; rowIndex < totalRows; rowIndex++) {
  //     for (let columnIndex = 0; columnIndex < totalCoumns; columnIndex++) {
  //       cellsMapping.current[`${rowIndex}-${columnIndex}`] = null;
  //     }
  //   }
  // }

  return (
    <CellManagerContext.Provider value={{
      registerCallbacks,
      // initializeCellsMapping,
      onClick,
    }}>
      {children}
    </CellManagerContext.Provider>
  )
};

export const useCellManager = () => {
  const context = useContext(CellManagerContext)
  if (!context) {
    throw new Error('useCellManager must be used within a ModalProvider');
  }
  return context;
};
