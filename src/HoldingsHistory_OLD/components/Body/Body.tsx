import { useMemo } from 'react';
import { CELL_BORDER_COLOR, CELL_HEIGHT_PX } from '../../config';
import { useLinksDataContext } from '../../context/LinksDataProvider';
import TodayLine from '../TodayLine';
import './Body.css';
import Links from '../Links';
import { useDateContext } from '../../context/DateContext';
import AddLinkButtons from '../AddLinkButtons';
import { useVisibleAttributeIdSet } from '../../hooks/useVisibleAttributeIdSet';
import { useHoldings } from '../../context/HoldingsContext';
import { useExpandedHoldingsState } from '../../context/ExpandedHoldingsContext';


const Body = () => {
  const { numberOfYears, todayPositionPx } = useDateContext();
  const { totalAttributes, rowsToRender, addLink } = useLinksDataContext();
  const { holdings } = useHoldings();
  const { expanded } = useExpandedHoldingsState();
  const visibleAttrSet = useVisibleAttributeIdSet(holdings);
  const visibleAttributes = Array.from(visibleAttrSet);
  
  // Create a flattened structure similar to LeftTable that respects expanded state
  const visibleRows = useMemo(() => {
    const rows: Array<{ type: 'holding' | 'attribute'; holdingId: string; attributeId?: string }> = [];
    for (const holding of holdings) {
      // Always add the holding row
      rows.push({ type: 'holding', holdingId: holding.id });
      
      // Only add attribute rows if the holding is expanded
      if (expanded.has(holding.id)) {
        for (const attribute of holding.attributes) {
          rows.push({ type: 'attribute', holdingId: holding.id, attributeId: attribute.id });
        }
      }
    }
    return rows;
  }, [holdings, expanded]);
  
  const totalRows = visibleRows.length;

  const handleDatePicked = (lastDayStr: string, firstDayStr: string, cellIndex: number, cellRowIndex: number) => {
    addLink(lastDayStr, firstDayStr, cellIndex, cellRowIndex);
  }

  return (
    <tbody className="body-container">

      {/* rows */}
      {visibleRows.map((row, indexColRow) => (
        <tr
          key={`${row.type}-${row.holdingId}-${row.attributeId || ''}`}
          className="body-row"
          style={{
            borderColor: row.type === 'holding'
              ? CELL_BORDER_COLOR : 'transparent',
            backgroundColor: row.type === 'holding'
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
