import React, { createContext, useCallback, useContext, useRef } from 'react'
import { TOTAL_DAYS_AFTER_TODAY, YEAR_CELL_WIDTH_PX } from '../config';
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

  const todaMonthUnit = todayDate.getMonth();
  const todayYearUnit = todayDate.getFullYear();
  const todayDayUnit = todayDate.getDate();

  // const numberOfYearsUnit = numberOfYears;
  // no problem ignoring leap years
  const dayWidthPx = YEAR_CELL_WIDTH_PX / 365;

  const totalDaysUnit = numberOfYears * 365;
  const totalDaysPx = totalDaysUnit * dayWidthPx;

  console.log("=== totalDaysUnit =", totalDaysUnit);
  console.log("=== totalDaysPx =", totalDaysPx);


  const lastEpochDayInTableDate = new Date(todayYearUnit, 11, 31, 0, 0, 0, 0);

  console.log("====>>>> lastEpochDayInTableDate =", lastEpochDayInTableDate);

  const lastYearInTableUnit = lastEpochDayInTableDate.getFullYear();

  console.log("====>>>> lastYearInTableUnit =", lastYearInTableUnit);

  
  const lastEpochDayInTableUnit = Math.round(lastEpochDayInTableDate.getTime() / ONE_DAY_IN_MS); //todayEpochDayUnit;

  console.log("====>>>> lastEpochDayInTableUnit =", lastEpochDayInTableUnit);


  const firstEpochDayInTableUnit = lastEpochDayInTableUnit - totalDaysUnit;

  console.log("====>>>> firstEpochDayInTableUnit =", firstEpochDayInTableUnit);

  const firstYearInTableUnit = lastYearInTableUnit - numberOfYears + 1;

  console.log("====>>>> firstYearInTableUnit =", firstYearInTableUnit);
  console.log("====>>>> lastYearInTableUnit =", lastYearInTableUnit);

  const convertDateToPositionPx = (date: string, daysToAdd: number = 0) => {
    const dateMs = new Date(date).getTime();
    const dateUnit = Math.round(dateMs / ONE_DAY_IN_MS + daysToAdd);
    return (dateUnit - firstEpochDayInTableUnit) * dayWidthPx;
  }

  // const convertLastDateToPositionPx = (date: string) => {
  //   const dateMs = new Date(date).getTime();
  //   const dateUnit = Math.round(dateMs / ONE_DAY_IN_MS + 1);
  //   return (dateUnit - firstEpochDayInTableUnit) * dayWidthPx;
  // }
  

  // const getYearFromEpochDayUnit = (epochDayUnit: number) => {
  //   const date = new Date(epochDayUnit * ONE_DAY_IN_MS);
  //   console.log("date =", date);
  //   return date.getUTCFullYear();
  // }

  console.log("====>>>> todayEpochDayUnit =", (todayEpochDayUnit));

  
  // const lastEpochDayInTableUnit = todayEpochDayUnit + TOTAL_DAYS_AFTER_TODAY;

  // console.log("====>>>> lastEpochDayInTableUnit =", lastEpochDayInTableUnit);

  // const firstEpochDayInTableUnit = lastEpochDayInTableUnit - totalDaysUnit + 365;

  // console.log("====>>>> firstEpochDayInTableUnit =", firstEpochDayInTableUnit);
  // const firstYearInTableUnit = getYearFromEpochDayUnit(firstEpochDayInTableUnit);


  // const firstYear = getYearFromEpochDayUnit(firstEpochDayInTableUnit);

  // const dayWidthPx = YEAR_CELL_WIDTH_PX / 365;

  // const totalDaysPx = totalDaysUnit * dayWidthPx;

  // console.log("==== dayWidthPx =", dayWidthPx);
  // console.log("==== totalDaysPx =", totalDaysPx);



  // const todayPositionPx = totalDaysPx - dayWidthPx * TOTAL_DAYS_AFTER_TODAY;//  //(todayEpochDayUnit - firstEpochDayInTableUnit) * dayWidthPx + 360;
  const todayPositionPx = dayWidthPx * (todayEpochDayUnit - firstEpochDayInTableUnit);

  
  console.log("dayWidthPx =", dayWidthPx);
  console.log("todayPositionPx =", todayPositionPx);

  console.log("dayWidthPx ===>>", dayWidthPx);
  console.log("YEAR_CELL_WIDTH_PX ===>>", YEAR_CELL_WIDTH_PX);

  
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
      firstYearInTableUnit,
      lastYearInTableUnit,
      numberOfYears,
      totalAttributes,
      todayPositionPx,
      convertDateToPositionPx,
      // convertLastDateToPositionPx,
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
