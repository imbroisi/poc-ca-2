import React, { createContext, useCallback, useContext, useEffect, useRef } from 'react'
import VirtualMainTable from '../virtual/virtualMainTable';
import { MainTableProps } from '../components/MainTable/MainTable';

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

export const CellManagerProvider = ({ children, mainProps }: { children: React.ReactNode, mainProps: MainTableProps }) => {
  // const cellsMapping = useRef<any>({});
  const cellCallbacks = useRef<Record<string, CellCallbacks>>({});
  const virtualMainTable = useRef<VirtualMainTable | null>(null);

  useEffect(() => {
    virtualMainTable.current = new VirtualMainTable(mainProps.totalRows, mainProps.totalColumns);
    // virtualMainTable.createLink('2-3', '2-10');
    // console.log('virtualMainTable', virtualMainTable);
  }, [mainProps.totalColumns, mainProps.totalRows]);

  const registerCallbacks = useCallback((cellId: string, callbacks: CellCallbacks) => {
    cellCallbacks.current[cellId] = callbacks;
  }, []);

  const onClick = (cellId: string, source: 'cell' | 'block') => {
    if (source === 'cell') {
      const data = virtualMainTable.current?.createLink(cellId);

      console.log('data', data);

      cellCallbacks.current[cellId]?.onFireBlock?.(data?.[0], data?.[1]);
      return;
    }

    if (source === 'block') {
      // TODO: open options menu (info, delete, etc)
      const resizeLink = virtualMainTable.current?.deleteLink(cellId);
      cellCallbacks.current[cellId]?.onFireBlock?.(null);
      console.log('resizeLink', resizeLink);
      if (resizeLink) {
        cellCallbacks.current[resizeLink[0]]?.onFireBlock?.(resizeLink[0], resizeLink[1]);
      }
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
