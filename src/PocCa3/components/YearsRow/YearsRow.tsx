import { CELL_BORDER_COLOR, CELL_HEIGHT_PX, YEAR_CELL_WIDTH_PX } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './YearsRow.css';

// // Define the rectangle type
// interface Rectangle {
//   id: string;
//   posH: number;
//   posV: number;
//   width?: number;
//   height?: number;
//   color?: string;
// }

const YearsRow = () => {
  const { firstYearInTableUnit, numberOfYears } = useDateContext();
  // Vertical line configuration

  console.log("====>>>> firstYearInTableUnit =", firstYearInTableUnit);

  // Example array of rectangles - you can move this to props or context
  // const rectangles: Rectangle[] = [
  //   { id: '1', posH: 600, posV: 100, color: 'blue' },
  //   { id: '2', posH: 400, posV: 200, color: 'green' },
  //   { id: '3', posH: 800, posV: 150, color: 'purple', width: 70, height: 30 },
  // ];

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

          {/* {index === 0 && (
            rectangles.map((rect: Rectangle) => (
              <div
                key={rect.id}
                className="years-row-rectangle"
                style={{
                  top: `${rect.posV}px`,
                  left: `${rect.posH}px`,
                  width: `${rect.width || 50}px`,
                  height: `${rect.height || 20}px`,
                  backgroundColor: rect.color || 'blue',
                }} />
            ))
          )} */}
        </th>
      ))}
    </>
  );
}

export default YearsRow;
