import { CELL_BORDER_COLOR, YEAR_CELL_WIDTH_PX } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './YearsRow.css';

const YearsRow = () => {
  const { firstYearInTableUnit, numberOfYears } = useDateContext();

  return (
    <>
      {Array.from({ length: numberOfYears }).map((_, index) => (
        <th
          key={index}
          className="years-row"
          style={{
            borderColor: CELL_BORDER_COLOR,
            width: YEAR_CELL_WIDTH_PX,
          }}
        >
          <div className="years-row-text">
            {firstYearInTableUnit + index}
          </div>
        </th>
      ))}
    </>
  );
}

export default YearsRow;
