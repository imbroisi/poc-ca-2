import { CELL_BORDER_COLOR, CELL_HEIGHT_PX, ROWS_BY_PAGE, TODAY_LINE_COLOR } from '../../config';
import { useDateContext } from '../../context/DateContext';
import TodayLine from '../TodayLine';
import './Body.css';
import Links from '../Links';


// interface Rectangle {
//   id: string;
//   posH: number;
//   posV: number;
//   width?: number;
//   height?: number;
//   color?: string;
// }

// const rectangles: Rectangle[] = [
//   { id: '1', posH: 600, posV: 100, color: 'blue' },
//   { id: '2', posH: 400, posV: 200, color: 'green' },
//   { id: '3', posH: 800, posV: 150, color: 'purple', width: 70, height: 30 },
// ];

const Body = () => {
  const { numberOfYears, totalAttributes, todayPositionPx } = useDateContext();

  const rowsToRender = (totalAttributes + 1) * Math.ceil(ROWS_BY_PAGE / (totalAttributes + 1));

  console.log("rowsToRender =", rowsToRender);

  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>, indexColRow: number, indexCol: number) => {
    const cell = e.currentTarget;
    const rect = cell.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const abs = x / rect.width;
    console.log("Mouse position:", abs, indexColRow, indexCol);
  };

  return (
    <tbody className="body-container">

      {/* rows */}
      {Array.from({ length: rowsToRender }).map((_, indexColRow) => (
        <tr
          key={indexColRow}
          className="body-row"
          style={{
            borderColor: indexColRow % (totalAttributes + 1) <= 1
              ? CELL_BORDER_COLOR : 'transparent',
          }}>

          {/* columns */}
          {Array.from({ length: numberOfYears }).map((_, indexCol) => (
            <th
              key={indexCol}
              className="body-cell"
              onClick={(e) => handleCellClick(e, indexColRow, indexCol)}
              style={{
                height: CELL_HEIGHT_PX,
                borderColor: CELL_BORDER_COLOR,
              }}
            >
            </th>
          ))}
        </tr>
      ))}

      {/* <tr>
        <th>
          {
            rectangles.map((rect: Rectangle) => (
              <div
                key={rect.id}
                className="body-rectangle"
                style={{
                  top: `${rect.posV}px`,
                  left: `${rect.posH}px`,
                  width: `${rect.width || 50}px`,
                  height: `${rect.height || 20}px`,
                  backgroundColor: rect.color || 'blue',
                }} />
            ))
          }
        </th>
      </tr> */}

      <TodayLine left={todayPositionPx} rowsToRender={rowsToRender} />

      <Links />


    </tbody>
  );
}

export default Body;
