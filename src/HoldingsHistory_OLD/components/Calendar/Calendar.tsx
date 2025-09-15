import React from 'react';
import dayjs, { Dayjs } from 'dayjs';
import utc from 'dayjs/plugin/utc';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';

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
  const initial = defaultDate
    ? (dayjs.utc(defaultDate)?.startOf?.('day') ?? null)
    : null;

  const [value, setValue] = React.useState<Dayjs | null>(initial);

  const todayUtc = (dayjs.utc?.() && (dayjs.utc().startOf ? dayjs.utc().startOf('day') : undefined)) || dayjs().startOf('day');

  const handleChange = (newValue: Dayjs | null) => {
    const v = newValue
      ? (typeof (newValue as any).utc === 'function'
          ? (newValue as any).utc(true)?.startOf?.('day') ?? null
          : (typeof (newValue as any).month === 'function' ? (newValue as any) : null))
      : null;
    setValue(v);

    if (v && onSelect) {
      const date = `${String(v.month() + 1).padStart(2, '0')}-${String(v.date()).padStart(2, '0')}-${v.year()}`;
      onSelect(date);
    }
  };

  const min = minDate ? (dayjs.utc(minDate)?.startOf?.('day')) : undefined;
  const max = maxDate ? (dayjs.utc(maxDate)?.startOf?.('day')) : todayUtc;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        timezone="UTC"
        defaultValue={defaultDate ? (dayjs.utc(defaultDate)?.startOf?.('day')) : undefined}
        value={value}
        onChange={handleChange}
        disableFuture={!max}
        minDate={min}
        {...(max ? { maxDate: max } : {})}
      />
    </LocalizationProvider>
  );
};

export default Calendar;
