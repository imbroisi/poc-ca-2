// AddValueLinkModal.tsx (ajuste interno sugerido)
import React, { useState } from 'react';
import { useModal } from '../../context/ModalContext';
import './AddValueLinkModal.css';
import Dropdown from '../Dropdown/Dropdown';
import Calendar from '../Calendar/Calendar';

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

const defaultValue = 'Select...';

// TODO: move to DateContext
const monthNameToIndex = (m: string) => {
  const names = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const idx = names.findIndex(n => n.toLowerCase().startsWith(m.toLowerCase()));
  return idx < 0 ? 0 : idx;
};

const AddValueLinkModal = ({
  year,
  day,
  month,
  cellIndex,
  cellRowIndex,
  checkedRows,
  onConfirm,
  showCalendar = false,
  isBulk = false,
}: AddValueLinkModalProps) => {

  const [label, setLabel] = useState<string>('');
  const [isSelected, setIsSelected] = useState<boolean>(false);
  const [pickedDate, setPickedDate] = useState<string | null>(null);

  const { closeModal } = useModal();

  // console.log("POS 30 pickedDate", pickedDate);


  const handleSelect = (option: string) => {
    // // console.log("1022) ==>> option", option);
    setLabel(option);
    if (option !== defaultValue) {
      setIsSelected(true);
    }
  }

  const monthIdx = monthNameToIndex(month);
  const monthStartUTC = new Date(Date.UTC(year, monthIdx, day, 0, 0, 0, 0)).toISOString();

  // Se quiser limitar maxDate ao fim do mês escolhido:
  const monthEndUTC = new Date(Date.UTC(year, monthIdx + 1, day, 0, 0, 0, 0)).toISOString();

  const now = new Date();
  const isCurrentMonthUTC =
    now.getUTCFullYear() === year && now.getUTCMonth() === monthIdx;

  const handlePickedDate = (date: string) => {
    // console.log("===>> POS 4 date", date);
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
            // minDate={monthStartUTC}
            // maxDate={!isCurrentMonthUTC ? monthEndUTC : ''} 
            maxDate={`${year}-${monthIdx + 1}-${day}`}
            onSelect={handlePickedDate}
          // defaultDate={monthStartUTC}
          />
        ) : (
          <p className='text'>Effective Date: {month} {day}</p>
        )}

        {/* <Dropdown
          options={options}
          label={"Select attribute"}
          onSelect={handleSelect}
          defaultValue={defaultValue}
        /> */}
      </div>
      <div className='button-container'>
        <button className='buttons' onClick={closeModal}>Cancel</button>
        <button
          className='buttons confirm'
          onClick={() => {
            // if (isBulk) {
            //   checkedRows?.forEach(checkedRow => {
            //     // const cellRowIndex = checkedRow - 2;
            //     onConfirm({ 
            //       day: showCalendar ? effectiveDay : day,
            //       month,
            //       cellRowIndex: checkedRow - 2,
            //       label,
            //     });
            //   })
            //   return;
            // }
            // console.log("===>> POS 5 pickedDate", pickedDate);
            const [ m, d, y ] = pickedDate?.split('-') || [];
            const pickedDayYyyyMmDd = `${y}-${m}-${d}`;
            // // console.log("===>> POS 5 effectiveDay", effectiveDay);
            // // console.log("===>> POS 5 day", day);
            // console.log("===>> POS 5 cellIndex", cellIndex);
            // console.log("===>> POS 5 cellRowIndex", cellRowIndex);
            // // console.log("===>> POS 5 label", label);
            onConfirm({
              // day: showCalendar ? effectiveDay : day,
              // month,
              // cellRowIndex,
              // label
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