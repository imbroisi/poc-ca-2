import { YEAR_CELL_WIDTH_PX } from '../config';

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

interface DateUtilsResult {
  todayDate: Date;
  todayMmDdYyyy: string;
  firstYearInTableUnit: number;
  lastYearInTableUnit: number;
  numberOfYears: number;
  todayPositionPx: number;
  convertDateToPositionPx: (date: string, daysToAdd?: number) => number;
}

export const createDateUtils = (todayDateInput: string | Date, numberOfYears: number): DateUtilsResult => {
  const todayDate = new Date(todayDateInput);
  const todayMs = todayDate.getTime();
  const todayEpochDayUnit = Math.round(todayMs / ONE_DAY_IN_MS);
  const todayYearUnit = todayDate.getFullYear();
  const dayWidthPx = YEAR_CELL_WIDTH_PX / 365;
  const totalDaysUnit = numberOfYears * 365;

  const lastEpochDayInTableDate = new Date(todayYearUnit, 11, 31, 0, 0, 0, 0);
  const lastYearInTableUnit = lastEpochDayInTableDate.getFullYear();
  const lastEpochDayInTableUnit = Math.round(lastEpochDayInTableDate.getTime() / ONE_DAY_IN_MS);
  const firstEpochDayInTableUnit = lastEpochDayInTableUnit - totalDaysUnit;
  const firstYearInTableUnit = lastYearInTableUnit - numberOfYears + 1;

  const convertDateToPositionPx = (date: string, daysToAdd: number = 0): number => {
    const dateMs = new Date(date).getTime();
    const dateUnit = Math.round(dateMs / ONE_DAY_IN_MS + daysToAdd);
    return (dateUnit - firstEpochDayInTableUnit) * dayWidthPx;
  };

  const todayPositionPx = dayWidthPx * (todayEpochDayUnit - firstEpochDayInTableUnit);

  const todayMmDdYyyy = todayDate.toLocaleDateString('en-US', {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  });

  return {
    todayDate,
    todayMmDdYyyy,
    firstYearInTableUnit,
    lastYearInTableUnit,
    numberOfYears,
    todayPositionPx,
    convertDateToPositionPx,
  };
};
