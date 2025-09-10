import { CELL_BORDER_COLOR, CELL_HEIGHT_PX } from '../../config';
import { useLinksDataContext } from '../../context/LinksDataProvider';
import TodayLine from '../TodayLine';
import './Body.css';
import Links from '../Links';
import { useDateContext } from '../../context/DateContext';
import AddLinkButtons from '../AddLinkButtons';

const Body = () => {
  const { numberOfYears, todayPositionPx } = useDateContext();
  const { totalAttributes, rowsToRender, addLink } = useLinksDataContext();

  const handleDatePicked = (lastDayStr: string, firstDayStr: string, cellIndex: number, cellRowIndex: number) => {
    addLink(lastDayStr, firstDayStr, cellIndex, cellRowIndex);
  }

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
      <AddLinkButtons onDatePicked={handleDatePicked} />

    </tbody>
  );
}

export default Body;
