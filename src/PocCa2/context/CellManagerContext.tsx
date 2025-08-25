import React, { createContext, useCallback, useContext, useRef } from 'react'
import virtualMainTable from '../virtual/virtualMainTable';
import { getDateFromCoordinate, getDaysInMonth } from '../utils';
// import { MainTableProps } from './MainTableContext';
// import { getTodayColumnCoordinate } from '../utils';

interface CellManagerType {
  registerCallbacks: (cellId: string, callbacks: any) => void;
  onClick: (cellId: string, source: 'cell' | 'block') => void;
  // mainProps: MainTableProps;
  model: 'year-month' | 'month-day';
}

interface CellCallbacks {
  onFireCell?: (_: any) => void;
  onFireBlock?: (_: any, _2?: any) => void;
}

const CellManagerContext = createContext<CellManagerType | undefined>(undefined)

export const CellManagerProvider = ({ children, model }: { children: React.ReactNode, model: 'year-month' | 'month-day' }) => {
  // const cellsMapping = useRef<any>({});
  const cellCallbacks = useRef<Record<string, CellCallbacks>>({});

  const registerCallbacks = useCallback((cellId: string, callbacks: CellCallbacks) => {
    cellCallbacks.current[cellId] = callbacks;
  }, []);

  const onClick = (cellId: string, source: 'cell' | 'block') => {
    if (source === 'cell') {
      const data = virtualMainTable.createLink(cellId);

      if (!data) {
        // user clicked on a cell that is not a link (the <Header> cells)
        return;
      }

      // console.log("111) ===>> data[0]", data[0]);
      // console.log("112) ===>> ", getDateFromCoordinate(data[0]));

      cellCallbacks.current[cellId]?.onFireBlock?.(data?.[0], data?.[1]);
      return;
    }

    if (source === 'block') {
      // TODO: open options menu (info, delete, etc)
      const resizeLink = virtualMainTable.deleteLink(cellId);
      console.log("119) ===>> cellId", cellId);

      cellCallbacks.current[cellId]?.onFireBlock?.(null);
      console.log('resizeLink', resizeLink);
      if (resizeLink) {
        cellCallbacks.current[resizeLink[0]]?.onFireBlock?.(resizeLink[0], resizeLink[1]);
      }
    }
  };

  return (
    <CellManagerContext.Provider value={{
      registerCallbacks,
      onClick,
      model,
      // mainProps,
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
