import { CELL_BORDER_COLOR, CELL_HEIGHT_PX } from '../../config';
import { useLinksDataContext } from '../../context/LinksDataProvider';
import TodayLine from '../TodayLine';
import './Body.css';
import Links from '../Links';
import { useDateContext } from '../../context/DateContext';
import AddLinkButtons from '../AddLinkButtons';
import { useVisibleAttributeIdSet } from '../../hooks/useVisibleAttributeIdSet';
import { useHoldings } from '../../context/HoldingsContext';


const Body = () => {
  const { numberOfYears, todayPositionPx } = useDateContext();
  const { totalAttributes, rowsToRender, addLink } = useLinksDataContext();
  const { holdings } = useHoldings();
  const visibleAttrSet = useVisibleAttributeIdSet(holdings);
  const visibleAttributes = Array.from(visibleAttrSet);
  const totalRows = holdings.length + visibleAttrSet.size;

  const handleDatePicked = (lastDayStr: string, firstDayStr: string, cellIndex: number, cellRowIndex: number) => {
    addLink(lastDayStr, firstDayStr, cellIndex, cellRowIndex);
  }

  return (
    <tbody className="body-container">

      {/* rows */}
      {Array.from({ length: totalRows }).map((_, indexColRow) => (
        <tr
          key={indexColRow}
          className="body-row"
          style={{
            borderColor: indexColRow % (totalAttributes + 1) <= 1
              ? CELL_BORDER_COLOR : 'transparent',
            backgroundColor: indexColRow % (totalAttributes + 1) === 0
              ? '#FAFAFA' : 'transparent',
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

      <TodayLine left={todayPositionPx} rowsToRender={totalRows} />
      <Links visibleAttributes={visibleAttributes} />
      <AddLinkButtons onDatePicked={handleDatePicked} />

    </tbody>
  );
}

export default Body;
