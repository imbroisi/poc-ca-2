import { MAIN_TABLE } from "./config";

const todayPrivate = new Date();
todayPrivate.setHours(0, 0, 0, 0);

console.log("todayPrivate =", todayPrivate.getDate());


// returns the number of the days since 1970-01-01
const getDaysSinceEpoch = (year: number, month: number, day: number): number => {
  const date = new Date(year, month, day);
  date.setHours(0, 0, 0, 0);
  return date.getTime() / (1000 * 60 * 60 * 24);
}

const getEpochDayToYMD = (days: number) => {
  // Start with Epoch
  const date = new Date(0);
  date.setDate(date.getDate() + days);

  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),

    // return the date in the format YYYY-MM-DD (without hours, minutes, seconds)
    dateIsoString: date.toISOString().split('T')[0],

    // return the date in the format "Fri Aug 23 2024" (without hours, minutes, seconds)
    dateString: date.toLocaleDateString(),
  };
}

const getMonthNameLong = (month: number) => {
  return new Date(0, month - 1, 1).toLocaleDateString('en-US', { month: 'long' });
}

const getMonthNameShort = (month: number) => {
  return new Date(0, month, 1).toLocaleDateString('en-US', { month: 'short' });
}

const getFutureDate = (dayEpoch: Date, plusDays: number) => {
  const date = new Date(dayEpoch);
  date.setDate(date.getDate() + plusDays);
  return date;
}

const getBoxTopLineColor = (): string => {
  // TODO: implement
  return 'orange';
};

const today = {
  day: todayPrivate.getDate(),
  month: todayPrivate.getMonth(),
  year: todayPrivate.getFullYear(),

  monthNameLong: todayPrivate.toLocaleDateString('en-US', { month: 'long' }),
  monthNameShort: todayPrivate.toLocaleDateString('en-US', { month: 'short' }),

  // return the date in the format YYYY-MM-DD (without hours, minutes, seconds)
  isoString: todayPrivate.toISOString().split('T')[0],

  // return the date in the format "Fri Aug 23 2024" (without hours, minutes, seconds)
  string: todayPrivate.toLocaleDateString(),

  // dayEpoch is the number of the days since 1970-01-01
  dayEpoch: todayPrivate.getTime() / (1000 * 60 * 60 * 24),
}

const getTodayColumnCoordinate = (totalColumns: number) => {
  console.log('>> totalColumns', totalColumns);
  return `${totalColumns - MAIN_TABLE.DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL}`;
}

const getNDaysAfterToday = (nDays: number) => {
  const dayEpoch = today.dayEpoch + nDays;
  return {
    dayEpoch,
    day: getEpochDayToYMD(dayEpoch).day,
    month: getEpochDayToYMD(dayEpoch).month,
    year: getEpochDayToYMD(dayEpoch).year,
    isoString: getEpochDayToYMD(dayEpoch).dateIsoString,
    string: getEpochDayToYMD(dayEpoch).dateString,
  };
}

const daysArray: any = (() => {
  const finalDayArray: any = [];
  const finalMonthArray = [];
  let currentMonth = null;

  // OK
  const lastDayToShow = today.dayEpoch + (MAIN_TABLE.DAYS_AFTER_TODAY_IN_MONTH_DAY_MODEL);
    // OK
  const firstDayToShow = getNDaysAfterToday(-30 * (MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL));
  


  console.log("1) firstDayToShow =", firstDayToShow);
  // console.log("firstDayToShow =", firstDayToShow);
  console.log("2) getEpochDayToYMD(lastDayToShow)) =", getEpochDayToYMD(lastDayToShow));

  console.log("3) difference =", lastDayToShow - firstDayToShow.dayEpoch);
  
  Array.from({ length: lastDayToShow - (firstDayToShow.dayEpoch)}).forEach((_, i) => {
    const { day, month, year } = getEpochDayToYMD(i + firstDayToShow.dayEpoch + 2); 

    // console.log("day =", day);
    // console.log("month =", month);
    // console.log("year =", year);
    // console.log("getMonthNameLong(month) =", getMonthNameLong(month));

    finalDayArray.push([day, getMonthNameLong(month), year]); 
  });

  console.log("finalDayArray =", finalDayArray);

  return finalDayArray
})();


// const monthsArray = (() => {
//   const finalArray = [];
//   const firstMonthToShow = firstDayToShow.month - MAIN_TABLE.NUMBER_OF_MONTHS_IN_MONTH_DAY_MODEL + 1;
//   const lastMonthToShow = lastDayToShow.month;

//   for (let i = firstMonthToShow; i <= lastMonthToShow; i++) {
//     finalArray.push(getMonthNameLong(i));
//   }
//   return finalArray;
// })();

// const yearsArray = (() => {
//   const finalArray = [];
//   const firstYearToShow = today.year - MAIN_TABLE.NUMBER_OF_YEARS_IN_YEAR_MONTH_MODEL + 1;
//   const lastYearToShow = today.year;

//   for (let i = firstYearToShow; i <= lastYearToShow; i++) {
//     finalArray.push(i);
//   }
//   return finalArray;
// })();

// console.log("daysArray =", daysArray);
// console.log("monthsArray =", monthsArray);
// console.log("yearsArray =", yearsArray);

export {
  today,
  daysArray,
  // monthsArray,
  getNDaysAfterToday,
  getEpochDayToYMD,
  getDaysSinceEpoch,
  getMonthNameLong,
  getMonthNameShort,
  getBoxTopLineColor,
  getTodayColumnCoordinate,
};
