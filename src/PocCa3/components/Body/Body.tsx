import { CELL_BORDER_COLOR, CELL_HEIGHT_PX, ROWS_BY_PAGE } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './Body.css';

const Body = () => {
  const { numberOfYears, totalAttributes, todayPositionPx } = useDateContext();

  const rowsToRender = (totalAttributes + 1) * Math.ceil(ROWS_BY_PAGE / (totalAttributes + 1));

  console.log("rowsToRender =", rowsToRender);

  const handleCellClick = (e: React.MouseEvent<HTMLTableCellElement>, indexColRow: number, indexCol: number) => {
    const cell = e.currentTarget;
    const rect = cell.getBoundingClientRect();
    const x = e.clientX - rect.left; // get mouse X position relative to cell
    // const percentage = Math.round((x / rect.width) * 100); // convert to percentage
    const abs = x / rect.width; // convert to percentage
    // console.log("Mouse position:", percentage + "%");
    console.log("Mouse position:", abs, indexColRow, indexCol);
  };

  const verticalLine = {
    posH: 30,//todayPositionPx,
    startV: 50,
    endV: 400,
    color: 'red',
    width: 2,
  };

  return (
    <tbody className="body-container">
      {Array.from({ length: rowsToRender }).map((_, indexColRow) => (
        <tr
          key={indexColRow} className="body-row" style={{
            borderColor:
              indexColRow % (totalAttributes + 1) === 0
                || indexColRow % (totalAttributes + 1) === 1
                ? CELL_BORDER_COLOR
                : 'transparent',
          }}>
          {Array.from({ length: numberOfYears }).map((_, indexCol) => (
            <><th
              key={indexCol}
              onClick={(e) => handleCellClick(e, indexColRow, indexCol)}
              className="body-cell"
              style={{
                height: CELL_HEIGHT_PX,
                borderLeft: `1px solid ${CELL_BORDER_COLOR}`,
                borderRight: `1px solid ${CELL_BORDER_COLOR}`,
                position: 'relative',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  top: 0,//`${verticalLine.startV}px`,
                  left: `${verticalLine.posH}px`,
                  width: `${verticalLine.width}px`,
                  // height: `${verticalLine.endV - verticalLine.startV}px`,
                  height: CELL_HEIGHT_PX + 1,
                  backgroundColor: verticalLine.color,
                  pointerEvents: 'none',
                  zIndex: 1000,
                }}
              />
            </th>
            </>
          ))}
        </tr>
      ))}
    </tbody>
  );
}

export default Body;
