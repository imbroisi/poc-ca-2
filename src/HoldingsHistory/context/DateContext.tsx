import React, { createContext, useContext } from 'react'
import { YEAR_CELL_WIDTH_PX } from '../config';


const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

const DateContext = createContext<any>(undefined);

export const DateProvider = ({
  children, 
  todayDate: todayDateInput, 
  numberOfYears, 
}: any) => {
  
  // Parse today date; if in YYYY-MM-DD, interpret as UTC midnight to avoid TZ shifts
  let todayDate: Date;
  if (typeof todayDateInput === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(todayDateInput)) {
    const [y, m, d] = todayDateInput.split('-').map(Number);
    todayDate = new Date(Date.UTC(y, m - 1, d, 0, 0, 0, 0));
  } else {
    todayDate = new Date(todayDateInput);
  }
  const todayMs = todayDate.getTime();
  const todayEpochDayUnit = Math.round(todayMs / ONE_DAY_IN_MS);

  // Use UTC components to keep consistency irrespective of local TZ
  const todayYearUnit = todayDate.getUTCFullYear();
  const todayMonthUnit = todayDate.getUTCMonth();
  const todayDayUnit = todayDate.getUTCDate();

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

  const getMonthsNames = () => {
    return ['January','February','March','April','May','June','July','August','September','October','November','December'];
  }

  const getMonthName = (month: number) => {
    // const names = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    return getMonthsNames()[month];
  }

  const monthNameToIndex = (m: string) => {
    // const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const idx = getMonthsNames().findIndex(n => n.toLowerCase().startsWith(m.toLowerCase()));
    return idx < 0 ? 0 : idx;
  };

  const getNDaysBefore = (date: string, n: number) => {
    const dateMs = new Date(date).getTime();
    const dateUnit = Math.round(dateMs / ONE_DAY_IN_MS - n);
    return new Date(dateUnit * ONE_DAY_IN_MS).toISOString().split('T')[0];
  }

  const displayDate = (date: string) => {
    // console.log("1001) ===>>> displayDate =", date);
    const d = new Date(date);
    // console.log("1001) ===>>> d =", d);

    const month = String(d.getUTCMonth() + 1).padStart(2, '0');
    const day = String(d.getUTCDate()).padStart(2, '0');
    const year = d.getUTCFullYear();

    // console.log("1002) ===>>> day =", day);
    // console.log("1003) ===>>> year =", year);
    // console.log("1004) ===>>> month =", month);

    return `${month}/${day}/${year}`;
  }

  return (
    <DateContext.Provider value={{
      todayDate,
      todayMmDdYyyy,
      monthNameToIndex,
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
