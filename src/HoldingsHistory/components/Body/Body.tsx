import { CELL_BORDER_COLOR, CELL_HEIGHT_PX } from '../../config';
import { useLinksDataContext } from '../../context/LinksDataProvider';
import TodayLine from '../TodayLine';
import './Body.css';
import Links from '../Links';
import { useDateContext } from '../../context/DateContext';
import AddLinkButtons from '../AddLinkButtons';

const Body = () => {
  const { numberOfYears, todayPositionPx } = useDateContext();
  const { totalAttributes, rowsToRender } = useLinksDataContext();

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

      <TodayLine left={todayPositionPx} rowsToRender={rowsToRender} />
      <Links />
      <AddLinkButtons />

    </tbody>
  );
}

export default Body;
