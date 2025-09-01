import React, { createContext, useCallback, useContext, useRef } from 'react'
import { TOTAL_DAYS_AFTER_TODAY } from '../config';
// import { MainTableProps } from './MainTableContext';
// import { getTodayColumnCoordinate } from '../utils';

// interface DateType {
//   registerCallbacks: (cellId: string, callbacks: any) => void;
//   onClick: (cellId: string, source: 'cell' | 'block') => void;
//   // mainProps: MainTableProps;
//   model: 'year-month' | 'month-day';
// }

// interface DateCallbacks {
//   onFireDate?: (_: any) => void;
//   onFireBlock?: (_: any, _2?: any) => void;
// }

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const DateContext = createContext<any>(undefined)

export const DateProvider = ({
  children, 
  todayDate: todayDateInput, 
  numberOfYears, 
  totalAttributes, 
}: any) => {
  
  const todayDate = new Date(todayDateInput);
  const todayMs = todayDate.getTime();
  const todayEpochDayUnit = Math.round(todayMs / ONE_DAY_IN_MS);

  const numberOfYearsUnit = numberOfYears;
  // no problem ignoring leap years
  const totalDaysUnit = Math.floor(numberOfYearsUnit * 365.25);

  console.log("totalDaysUnit =", totalDaysUnit);


  const getYearFromEpochDayUnit = (epochDayUnit: number) => {
    const date = new Date(epochDayUnit * ONE_DAY_IN_MS);
    console.log("date =", date);
    return date.getUTCFullYear();
  }
  
  const lastEpochDayInTableUnit = todayEpochDayUnit + TOTAL_DAYS_AFTER_TODAY;

  console.log("lastEpochDayInTableUnit =", getYearFromEpochDayUnit(lastEpochDayInTableUnit));

  const firstEpochDayInTableUnit = lastEpochDayInTableUnit - totalDaysUnit + 365;

  console.log("firstEpochDayInTableUnit =", getYearFromEpochDayUnit(firstEpochDayInTableUnit));
  // const firstYearInTable = getYearFromEpochDayUnit(firstEpochDayInTableUnit);


  const firstYear = getYearFromEpochDayUnit(firstEpochDayInTableUnit);


  
  // const cellsMapping = useRef<any>({});
  // const cellCallbacks = useRef<Record<string, DateCallbacks>>({});

  // const registerCallbacks = useCallback((cellId: string, callbacks: DateCallbacks) => {
  //   cellCallbacks.current[cellId] = callbacks;
  // }, []);

  // const onClick = (cellId: string, source: 'cell' | 'block') => {
  //   if (source === 'cell') {
  //     const data = virtualMainTable.createLink(cellId);

  //     if (!data) {
  //       // user clicked on a cell that is not a link (the <Header> cells)
  //       return;
  //     }

  //     // console.log("111) ===>> data[0]", data[0]);
  //     // console.log("112) ===>> ", getDateFromCoordinate(data[0]));

  //     cellCallbacks.current[cellId]?.onFireBlock?.(data?.[0], data?.[1]);
  //     return;
  //   }

  //   if (source === 'block') {
  //     // TODO: open options menu (info, delete, etc)
  //     // const resizeLink = virtualMainTable.deleteLink(cellId);
  //     // console.log("119) ===>> cellId", cellId);

  //     cellCallbacks.current[cellId]?.onFireBlock?.(null);
  //     console.log('resizeLink', resizeLink);
  //     if (resizeLink) {
  //       cellCallbacks.current[resizeLink[0]]?.onFireBlock?.(resizeLink[0], resizeLink[1]);
  //     }
  //   }
  // };

  return (
    <DateContext.Provider value={{
      firstYear,
      numberOfYears,
      totalAttributes,
      
      // registerCallbacks,
      // onClick,
      // model,
      // mainProps,
    }}>
      {children}
    </DateContext.Provider>
  )
};

export const useDateContext = () => {
  const context = useContext(DateContext)
  if (!context) {
    throw new Error('useDateContext must be used within a DateProvider');
  }
  return context;
};
