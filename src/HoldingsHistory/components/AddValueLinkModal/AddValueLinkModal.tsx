import React, { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import './AddValueLinkModal.css';
import Calendar from '../Calendar/Calendar';
import { useDateContext } from '../../context/DateContext';

interface AddValueLinkModalProps {
  year: number;
  day?: number;
  month: string;
  cellIndex?: number;
  cellRowIndex?: number;
  onConfirm: (props: any) => void;
  showCalendar?: boolean;
  checkedRows?: number[];
  isBulk?: boolean;
}
  
const options: (string)[] = [];
for (let i = 0; i < 10; i += 1) {
  options.push(`Option ${i + 1}`);
}

const AddValueLinkModal = ({
  year,
  day,
  month,
  cellIndex,
  cellRowIndex,
  onConfirm,
  showCalendar = false,
}: AddValueLinkModalProps) => {
  const { monthNameToIndex } = useDateContext();
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [pickedDate, setPickedDate] = useState<string | null>(null);

  const { closeModal } = useModal();
  const monthIdx = monthNameToIndex(month);

  const handlePickedDate = (date: string) => {
    setIsSelected(true);
    setPickedDate(date);
  }

  const [pickedDateYear, pickedDateMonth, pickedDateDay] = pickedDate?.split('-') || [];

  const effectiveDay = pickedDate
    ? new Date(Date.UTC(
      +pickedDateYear,
      +pickedDateMonth,
      +pickedDateDay
    )).getUTCDate()
    : day;

  return (
    <div>
      <div className='header-content'>
        <h3>New Value Link</h3>
        <p>Select the start date:</p>
      </div>

      <div className='main-content'>
        {showCalendar ? (
          <Calendar
            maxDate={`${year}-${monthIdx + 1}-${day}`}
            onSelect={handlePickedDate}
          />
        ) : (
          <p className='text'>Effective Date: {month} {day}</p>
        )}
      </div>
      <div className='button-container'>
        <button className='buttons' onClick={closeModal}>Cancel</button>
        <button
          className='buttons confirm'
          onClick={() => {
            const [year, month, day] = pickedDate?.split('-') || [];
            const pickedDayYyyyMmDd = `${year}-${month}-${day}`;
            onConfirm({
              cellIndex,
              cellRowIndex,
              pickedDate: pickedDayYyyyMmDd
            })
          }}
          style={{ cursor: isSelected ? 'pointer' : 'default' }}
          disabled={!isSelected || (showCalendar && !effectiveDay)}
        >
          Confirm {isSelected ? 'selected' : 'not selected'}
        </button>
      </div>
    </div>
  );
}

export default AddValueLinkModal;