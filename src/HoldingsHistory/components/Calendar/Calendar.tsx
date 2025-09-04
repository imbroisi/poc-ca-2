import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
// import CalendarHeader from './Header/Header';

dayjs.extend(utc);

interface CalendarProps {
  /** ISO string UTC, ex: "2025-08-01T00:00:00Z" */
  defaultDate?: string;
  /** ISO string UTC, início do mês exibido */
  minDate?: string;
  /** ISO string UTC, fim do mês (opcional). Se ausente, bloqueia futuro via disableFuture */
  maxDate?: string;
  /** callback disparado ao selecionar uma data (JS Date em UTC 00:00) */
  onSelect?: (date: string) => void;
}

const Calendar: React.FC<CalendarProps> = ({ defaultDate, minDate, maxDate, onSelect }) => {
  // estado sempre em UTC, normalizado para início do dia
  const initial = defaultDate
    ? dayjs.utc(defaultDate).startOf('day')
    : null;

  const [value, setValue] = React.useState<Dayjs | null>(initial);

  const todayUtc = dayjs.utc().startOf('day');

  const handleChange = (newValue: Dayjs | null) => {
    const v = newValue ? newValue.utc(true).startOf('day') : null;
    setValue(v);

    // console.log("-----data de new value------", { value: v });

    if (v && onSelect) {
      // Converte para JS Date em UTC (00:00:00)
      // const dateStr = `${v.year()}-${v.month()}-${v.date()}T00:00:00Z`;
      // const dateS = `${v.year()}-${v.month()}-${v.date()}`;

      const date = `${String(v.month() + 1).padStart(2, '0')}-${String(v.date()).padStart(2, '0')}-${v.year()}`;


      // const d = new Date(Date.UTC(v.year(), v.month(), v.date(), 0, 0, 0, 0));
      // console.log("------data no select------", { dateS: new Date(date) });
      onSelect(date);
    }
  };

  const min = minDate ? dayjs.utc(minDate).startOf('day') : undefined;
  const max = maxDate ? dayjs.utc(maxDate).startOf('day') : todayUtc;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        timezone="UTC"
        defaultValue={defaultDate ? dayjs.utc(defaultDate).startOf('day') : undefined}
        value={value}
        onChange={handleChange}
        disableFuture={!max}
        minDate={min}
        {...(max ? { maxDate: max } : {})}
        // slots={{ calendarHeader: CalendarHeader }}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
