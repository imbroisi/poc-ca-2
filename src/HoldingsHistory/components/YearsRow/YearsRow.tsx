import { CELL_BORDER_COLOR, CELL_HEIGHT_PX, YEAR_CELL_WIDTH_PX } from '../../config';
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
            height: CELL_HEIGHT_PX,
            borderColor: CELL_BORDER_COLOR,
            width: YEAR_CELL_WIDTH_PX,
          }}
        >
          <span className="years-row-text">
            {firstYearInTableUnit + index}
          </span>
        </th>
      ))}
    </>
  );
}

export default YearsRow;
