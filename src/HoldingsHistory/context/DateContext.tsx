import React, { createContext, useContext } from 'react'
import { YEAR_CELL_WIDTH_PX } from '../config';


const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const DateContext = createContext<any>(undefined);

export const DateProvider = ({
  children, 
  todayDate: todayDateInput, 
  numberOfYears, 
}: any) => {
  
  const todayDate = new Date(todayDateInput);
  const todayMs = todayDate.getTime();
  const todayEpochDayUnit = Math.round(todayMs / ONE_DAY_IN_MS);

  const todayYearUnit = todayDate.getFullYear();
  const todayMonthUnit = todayDate.getMonth();
  const todayDayUnit = todayDate.getDate();

  const dayWidthPx = YEAR_CELL_WIDTH_PX / 365;

  const totalDaysUnit = numberOfYears * 365;

  const lastEpochDayInTableDate = new Date(todayYearUnit, 11, 31, 0, 0, 0, 0);

  const lastYearInTableUnit = lastEpochDayInTableDate.getFullYear();

  const lastEpochDayInTableUnit = Math.round(lastEpochDayInTableDate.getTime() / ONE_DAY_IN_MS);

  const firstEpochDayInTableUnit = lastEpochDayInTableUnit - totalDaysUnit;

  const firstYearInTableUnit = lastYearInTableUnit - numberOfYears + 1;

  const convertDateToPositionPx = (date: string, daysToAdd: number = 0) => {
    const dateMs = new Date(date).getTime();
    const dateUnit = Math.round(dateMs / ONE_DAY_IN_MS + daysToAdd);
    return (dateUnit - firstEpochDayInTableUnit) * dayWidthPx;
  }

  const todayPositionPx = dayWidthPx * (todayEpochDayUnit - firstEpochDayInTableUnit);

  // const todayYyyyMmDd = `
  //   ${todayYearUnit}-${String(todayMonthUnit + 1).padStart(2, '0')}-${String(todayDayUnit).padStart(2, '0')}`;

  const todayMmDdYyyy = `${String(todayMonthUnit + 1).padStart(2, '0')}/${String(todayDayUnit).padStart(2, '0')}/${todayYearUnit}`;

  const getMonthName = (month: number) => {
    const names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return names[month];
  }

  const getNDaysBefore = (date: string, n: number) => {
    const dateMs = new Date(date).getTime();
    const dateUnit = Math.round(dateMs / ONE_DAY_IN_MS - n);
    return new Date(dateUnit * ONE_DAY_IN_MS).toISOString().split('T')[0];
  }

  const displayDate = (date: string) => {
    const d = new Date(date);
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const year = d.getFullYear();
    return `${month}/${day}/${year}`;
  }

  return (
    <DateContext.Provider value={{
      todayDate,
      todayMmDdYyyy,
      // todayYyyyMmDd,
      getMonthName,
      getNDaysBefore,
      firstYearInTableUnit,
      lastYearInTableUnit,
      numberOfYears,
      todayPositionPx,
      convertDateToPositionPx,
      displayDate,
      // convert,
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
