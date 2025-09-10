import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import "./Header.css";

const CalendarHeader = ({ currentMonth }: PickersCalendarHeaderProps) => (
  <div className='header-container' data-testid="mock-header-container">
    <Stack spacing={1} direction="row" />
    <Typography variant="body2">{currentMonth.format('MMMM YYYY')}</Typography>
  </div>
);

export default CalendarHeader;
