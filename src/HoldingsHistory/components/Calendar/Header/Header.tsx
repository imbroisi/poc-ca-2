import React from 'react';

import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import "./Header.css";


const CalendarHeader = (props: PickersCalendarHeaderProps) => {
  const { currentMonth, onMonthChange } = props;

  const selectNextMonth = () => onMonthChange(currentMonth.add(1, 'month'));
  
  const selectPreviousMonth = () => onMonthChange(currentMonth.subtract(1, 'month'));

  return (
    <div className='header-container'>
      <Stack spacing={1} direction="row">
        {/* <IconButton onClick={selectPreviousMonth} title="Previous month" disabled>
          <FontAwesomeIcon icon={faChevronLeft} />
        </IconButton> */}
      </Stack>
      <Typography variant="body2">{currentMonth.format('MMMM YYYY')}</Typography>
      {/* <Stack spacing={1} direction="row">
        <IconButton onClick={selectNextMonth} title="Next month" disabled>
          <FontAwesomeIcon icon={faChevronRight} />
        </IconButton>
      </Stack> */}
    </div>
  );
};
export default CalendarHeader;
