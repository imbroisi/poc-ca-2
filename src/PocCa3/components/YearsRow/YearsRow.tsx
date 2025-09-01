import { CELL_BORDER_COLOR, CELL_HEIGHT_PX, YEAR_CELL_WIDTH_PX } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './YearsRow.css';

// Define the rectangle type
interface Rectangle {
  id: string;
  posH: number;
  posV: number;
  width?: number;
  height?: number;
  color?: string;
}

const YearsRow = () => {
  const { firstYear, numberOfYears, todayPositionPx } = useDateContext();
  // Vertical line configuration
  const verticalLine = {
    posH: todayPositionPx,
    startV: 50,
    endV: 400,
    color: 'red',
    width: 2,
  };

  // Example array of rectangles - you can move this to props or context
  const rectangles: Rectangle[] = [
    { id: '1', posH: 600, posV: 100, color: 'blue' },
    { id: '2', posH: 400, posV: 200, color: 'green' },
    { id: '3', posH: 800, posV: 150, color: 'purple', width: 70, height: 30 },
  ];

  const renderRectangle = (rect: Rectangle) => {
    const style = {
      position: 'absolute' as const,
      top: `${rect.posV}px`,
      left: `${rect.posH}px`,
      width: `${rect.width || 50}px`,
      height: `${rect.height || 20}px`,
      backgroundColor: rect.color || 'blue',
      pointerEvents: 'none' as const,
      zIndex: 1000,
    };

    return <div key={rect.id} style={style} />;
  };

  return (
    <>
      {Array.from({ length: numberOfYears }).map((_, index) => (
        <th
          key={index}
          className="years-row"
          style={{
            height: CELL_HEIGHT_PX,
            borderColor: CELL_BORDER_COLOR,
            width: YEAR_CELL_WIDTH_PX, // - 12, // subtract padding (10px) and borders (1px + 1px)
          }}
        >
          {firstYear + index}
          {index === 0 && (
            <>
              {/* <div
                style={{
                  position: 'absolute',
                  top: `${verticalLine.startV}px`,
                  left: `${verticalLine.posH}px`,
                  width: `${verticalLine.width}px`,
                  height: `${verticalLine.endV - verticalLine.startV}px`,
                  backgroundColor: verticalLine.color,
                  pointerEvents: 'none',
                  zIndex: 1000,
                }}
              /> */}
              {rectangles.map(renderRectangle)}
            </>
          )}
        </th>
      ))}
    </>
  );
}

export default YearsRow;
