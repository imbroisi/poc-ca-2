import { CELL_BORDER_COLOR, CELL_HEIGHT_PX, ROWS_BY_PAGE, TODAY_LINE_COLOR } from '../../config';
import { useDateContext } from '../../context/DateContext';
import TodayLine from '../TodayLine';
import './Body.css';

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
      {Array.from({ length: rowsToRender }).map((_, indexColRow) => (
        <tr
          key={indexColRow}
          className="body-row"
          style={{
            borderColor: indexColRow % (totalAttributes + 1) <= 1
                ? CELL_BORDER_COLOR : 'transparent',
          }}>
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

      <TodayLine left={todayPositionPx} rowsToRender={rowsToRender} />
      
    </tbody>
  );
}

export default Body;
