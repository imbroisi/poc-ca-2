import { TOTAL_DAYS_AFTER_TODAY } from "./config";

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

let todayDate: Date | null = null;
let todayMs = 0;
let numberOfYearsUnit = 0;
let todayEpochDayUnit = 0;
let totalDaysUnit = 0;

export const setDateValues = (todayDateInput: Date, numberOfYears: number) => {
  todayDate = new Date(todayDateInput);
  todayDate.setHours(0, 0, 0, 0);
  todayMs = todayDate.getTime();
  todayEpochDayUnit = Math.round(todayMs / ONE_DAY_IN_MS);

  numberOfYearsUnit = numberOfYears;
  // no problem ignoring leap years
  totalDaysUnit = numberOfYearsUnit * 365;
}

export const getYearFromEpochDayUnit = (epochDayUnit: number) => {
  const date = new Date(epochDayUnit * ONE_DAY_IN_MS);
  return date.getFullYear();
}

// export const getNumberOfYears = () => numberOfYearsUnit;

const getFirstYearInTable = () => getYearFromEpochDayUnit(getFirstEpochDayInTableUnit());

// export const getFirstYearInTable = () => getYearFromEpochDayUnit(getFirstEpochDayInTableUnit());

// const todayDateMs = todayDate().getTime();
// const todayDateUnit = Math.round(todayDateMs / ONE_DAY_IN_MS);


// const getTotalDaysInTableUnit = () => totalDaysUnit;

// export const getTodayYear = () => todayDate.getFullYear();

const getLastEpochDayInTableUnit = () => todayEpochDayUnit + TOTAL_DAYS_AFTER_TODAY;

const getFirstEpochDayInTableUnit = () => getLastEpochDayInTableUnit() - totalDaysUnit + 1;

//  export const getYearFromEpochDayUnit = (epochDayUnit: number) => {
//   return epochDayUnit / 365;
//  }




// export const getTodayYearDay = () => todayDate.getDate();

// // export const lastDayInTable = () => getTodayYearDay() + TOTAL_DAYS_AFTER_TODAY;
// export const lastYearInTable = () => getTodayYear() + TOTAL_DAYS_AFTER_TODAY;



// const getFirstYear = (totalYears: number) => {
//   const todayYear = getTodayYear();
//   return todayYear - totalYears + 1;
// }

// export const getTotalDaysInTable = (totalYears: number) => {  
//   const todayYear = getTodayYear();
//   const firstYear = getFirstYear(totalYears);
//   let totalDaysInTable = 0;

//   for (let year = firstYear; year <= todayYear; year += 1) {
//     const isLeapYear = (year % 4 === 0);
//     totalDaysInTable += 365 + (isLeapYear ? 1 : 0);
//   }
//   return totalDaysInTable;
// }

// // const todayMs = todayDate.getTime();
// // const todayDayMs = todayMs / ONE_DAY_IN_MS;
// // const todayMonthUnit = todayDate.getMonth();


// // returns the number of the days since 1970-01-01
// // const getDaysSinceEpoch = (year: number, month: number, day: number): number => {
// //   const date = new Date(year, month, day);
// //   date.setHours(0, 0, 0, 0);
// //   return date.getTime() / ONE_DAY_IN_MS;
// // }

// const convertDayMsToYMD = (days: number) => {
//   // Start with Epoch
//   const date = new Date(0);
//   date.setDate(date.getDate() + days);

//   return {
//     year: date.getFullYear(),
//     month: date.getMonth() + 1,
//     day: date.getDate(),

//     // // return the date in the format YYYY-MM-DD (without hours, minutes, seconds)
//     // dateIsoString: date.toISOString().split('T')[0],

//     // // return the date in the format "Fri Aug 23 2024" (without hours, minutes, seconds)
//     // dateString: date.toLocaleDateString(),
//   };
// }

// // const getMonthNameLong = (month: number) => {
// //   return new Date(0, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
// // }

// const getMonthNameShort = (month: number) => {
//   return new Date(0, month, 1).toLocaleDateString('en-US', { month: 'short' });
// }

// // const getFutureDate = (dayMs: Date, plusDays: number) => {
// //   const date = new Date(dayMs);
// //   date.setDate(date.getDate() + plusDays);
// //   return date;
// // }

// // const getBoxTopLineColor = (): string => {
// //   // TODO: implement
// //   return 'orange';
// // };

// // const today = {
// //   // dayUnit: todayDate.getDate(),
// //   todayMonthUnit: todayDate.getMonth(),
// //   // yearUnit: todayDate.getFullYear(),

// //   // monthNameLong: todayDate.toLocaleDateString('en-US', { month: 'long' }),
// //   // monthNameShort: todayDate.toLocaleDateString('en-US', { month: 'short' }),

// //   // return the date in the format YYYY-MM-DD (without hours, minutes, seconds)
// //   // isoString: todayDate.toISOString().split('T')[0],

// //   // return the date in the format "Fri Aug 23 2024" (without hours, minutes, seconds)
// //   // string: todayDate.toLocaleDateString(),

// //   // dayMs is the number of the days since 1970-01-01
// //   // todayDayMs,
// // }

// // const getTodayColumnCoordinate = (totalColumns: number) => {
// //   console.log('>> totalColumns', totalColumns);
// //   return `${totalColumns - MAIN_TABLE.DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL}`;
// // }

// const getNDaysAfterTodayMs = (nDaysMs: number) => {
//   const dayMs = todayDayMs + nDaysMs;
//   return {
//     dayMs,
//     day: convertDayMsToYMD(dayMs).day,
//     // month: convertDayMsToYMD(dayMs).month,
//     // year: convertDayMsToYMD(dayMs).year,
//     // isoString: convertDayMsToYMD(dayMs).dateIsoString,
//     // string: convertDayMsToYMD(dayMs).dateString,
//   };
// }

// // const daysArray: any = (() => {
// //   const finalDayArray: any = [];
// //   // const finalMonthArray = [];
// //   // let currentMonth = null;

// //   // OK
// //   // const lastDayToShow = today.dayMs + (MAIN_TABLE.DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL);
// //   let lastDayToShow = todayDayMs + (MAIN_TABLE.MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL * 30);

// //   const lastMonth = todayMonthUnit + MAIN_TABLE.MONTHS_AFTER_TODAY_IN_YEAR_MONTH_MODEL + 1;

// //   console.log("21221--->>> lastDayToShow =", convertDayMsToYMD(lastDayToShow));
// //   console.log("21222--->>> lastMonth =", lastMonth);

// //   // for (let i = 1; i < 31; i += 1) {
// //   //   if (convertDayMsToYMD(lastDayToShow + 1).month > lastMonth) {
// //   //     // last day of the last month
// //   //     break;
// //   //   }

// //   //   lastDayToShow += 1;
// //   // }

// //   console.log("21223--->>> lastDayToShow =", convertDayMsToYMD(lastDayToShow));


// //     // OK
// //     // firstDayToShow = getNDaysAfterToday(-30 * (MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL));
// //     firstDayToShow = getNDaysAfterTodayMs(-30 * (MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL));

// //   console.log("21222--->>> lastDayToShow =", lastDayToShow, todayMonthUnit);

// //   if (firstDayToShow.day > 1) {
// //     firstDayToShow = getNDaysAfterTodayMs(-30 * (MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL) - firstDayToShow.day + 1);
// //   }

// //   // console.log("113) firstDayToShow =", firstDayToShow);
// //   console.log("223)-->>> lastDayToShow =", convertDayMsToYMD(lastDayToShow));



// //   // // console.log("firstDayToShow =", firstDayToShow);
// //   // console.log("2) convertDayMsToYMD(lastDayToShow)) =", convertDayMsToYMD(lastDayToShow));

// //   // console.log("3) difference =", lastDayToShow - firstDayToShow.dayMs);
  
// //   Array.from({ length: lastDayToShow - (firstDayToShow.dayMs)}).forEach((_, i) => {
// //     const { day, month, year } = convertDayMsToYMD(i + firstDayToShow.dayMs + 2); 

// //     // console.log("day =", day);
// //     // console.log("month =", month);
// //     // console.log("year =", year);
// //     // console.log("getMonthNameLong(month) =", getMonthNameLong(month));

// //     finalDayArray.push([day, month, year]); 
// //   });

// //   console.log("finalDayArray =", finalDayArray);

// //   return finalDayArray
// // })();

// // function getDaysInMonth(year: number, month: number) {
// //   // month is 1-based (1-12)
// //   // Setting day to 0 gets the last day of the previous month
// //   return new Date(year, month, 0).getDate();
// // }

// // const getTotalColumns = () => {
// //   return daysArray.length;
// // }


// // const monthsArray = (() => {
// //   const finalArray = [];
// //   const firstMonthToShow = firstDayToShow.month - MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL + 1;
// //   const lastMonthToShow = lastDayToShow.month;

// //   for (let i = firstMonthToShow; i <= lastMonthToShow; i += 1) {
// //     finalArray.push(getMonthNameLong(i));
// //   }
// //   return finalArray;
// // })();

// // const yearsArray = (() => {
// //   const finalArray = [];
// //   const firstYearToShow = today.year - MAIN_TABLE.NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL + 1;
// //   const lastYearToShow = today.year;

// //   for (let i = firstYearToShow; i <= lastYearToShow; i += 1) {
// //     finalArray.push(i);
// //   }
// //   return finalArray;
// // })();

// // console.log("daysArray =", daysArray);
// // console.log("monthsArray =", monthsArray);
// // console.log("yearsArray =", yearsArray);

// // const getFirstDayToShow = () => firstDayToShow;

// // const getDateFromCoordinate = (coordinate: string) => {
// //   const column = +(coordinate.split('-')[1]);

// //   return convertDayMsToYMD(firstDayToShow.dayMs + column);
// // }

// export {
//   // today,
//   todayDayMs,
//   todayMonthUnit,
//   // daysArray,
//   // getTotalColumns,
//   convertDayMsToYMD,
//   getNDaysAfterTodayMs,
//   // getNDaysAfterToday,
//   // convertDayMsToYMD,
//   // getDaysSinceEpoch,
//   // getMonthNameLong,
//   getMonthNameShort,
//   // getBoxTopLineColor,
//   // getTodayColumnCoordinate,
//   // getDaysInMonth,
//   // getFirstDayToShow,
//   // getDateFromCoordinate,,
// };
