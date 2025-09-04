import { useLinksDataContext } from '../../context/LinksDataProvider';
import './AddLinkButtons.css';
import { useDateContext } from '../../context/DateContext';
import { useModal } from '../../context/ModalContext';
import AddValueLinkModal from '../AddValueLinkModal/AddValueLinkModal';
import { useRef } from 'react';

interface AddLinkButtonsProps {
  onDatePicked: (lastDayDate: string, pickedDate: string, cellIndex: number, cellRowIndex: number) => void;
}

const AddLinkButtons = ({ onDatePicked }: AddLinkButtonsProps) => {
  const { totalAttributes, rowsToRender, cellTopPx, isEditMode } = useLinksDataContext();
  const { todayPositionPx, convertDateToPositionPx, todayMmDdYyyy, getMonthName, getNDaysBefore } = useDateContext();
  const { getLinksDataCopy } = useLinksDataContext();
  const { openModal, closeModal } = useModal();
  const lastDayDate = useRef<string>('');

  const linksDataCopy = getLinksDataCopy();

  const handleDatePicked = ({ pickedDate, cellIndex, cellRowIndex }: { pickedDate: string, cellIndex: number, cellRowIndex: number }) => {
    // console.log("100) ===>>> handleDatePicked =",  pickedDate, cellIndex, cellRowIndex);
    // console.log("102) ===>>> lastDayDate.current", lastDayDate.current);

    onDatePicked(lastDayDate.current, pickedDate, cellIndex, cellRowIndex);
    closeModal();
  }

  // const handleAddLink = ({ 
  //   event, 
  //   day, 
  //   month, 
  //   cellIndex,
  //   cellRow }: { event: any, day: number, month: string, cellIndex: number, cellRow: number }) => {
  const handleAddLink = ({ newerDate, indexRow, indexColumn }: { newerDate: string, indexRow: number, indexColumn: number }) => {
    if (!isEditMode) {
      return;
    }

    // console.log("101) ===>>> newerDate", newerDate);


    lastDayDate.current = getNDaysBefore(newerDate, 1);
    const [ year, month, day ] = lastDayDate.current.split('-');  


    openModal(
      <AddValueLinkModal
        day={+day}
        month={getMonthName(+month - 1)}
        year={+year}
        cellIndex={indexColumn}
        showCalendar
        // cellIndex={cellIndex}
        cellRowIndex={indexRow}
        onConfirm={handleDatePicked}
      />
    )
  }

  return (
    <tr>
      <th>
      {Array.from({ length: rowsToRender / (totalAttributes + 1) }).map((_, indexRow) => (
        Array.from({ length: totalAttributes }).map((_, indexColumn) => {
          let newer = todayPositionPx;
          let newerDate = todayMmDdYyyy;

          linksDataCopy.forEach((linkData) => {
            if (linkData.portfolioIndex !== indexRow || linkData.attributeIndex !== indexColumn) return;

            // console.log("linkData.firstDayDate", linkData.firstDayDate);


            const thisPositionPx = convertDateToPositionPx(linkData.firstDayDate);
            if (thisPositionPx < newer) {
              newer = thisPositionPx;
              newerDate = linkData.firstDayDate;  
            }
          });

          // // console.log("newer", newer);
          // console.log("newerDate", newerDate);

          return (
            <div
              key={indexRow + indexColumn}
              className="add-link-button"
              role="button"
              onClick={() => handleAddLink({ newerDate, indexRow, indexColumn })}
              // TODO: set values form DateContext
              // onClick={() => handleAddLink({ event: null, day: 0, month: '', cellIndex: indexColumn, cellRow: indexRow })}
              style={{
                top: cellTopPx(indexRow, indexColumn),
                left: newer - 20,
              }}>
              +
            </div>
          )
        }
        )))}
      </th>
    </tr>
  );
}

export default AddLinkButtons;