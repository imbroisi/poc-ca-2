import { useEffect, useRef } from 'react';
import { ATTRIBUTE_ITEM_HEIGHT, HOLDINGS_PER_PAGE, NUMBER_OF_YEARS, YEAR_CELL_WIDTH_PX } from '../../config';
import HoldingYearCell from '../Cell';
import TodayLine from '../TodayLine';
import './HoldingsLinks.css';
import useLinks from '../../hooks/useLinks';

export interface ContentProps {
  scrollableColumnRef: React.RefObject<HTMLDivElement> | null;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  show: boolean[];
  setScrollableRef?: (element: HTMLDivElement | null) => void;
}

const HoldingsLinks = ({ scrollableColumnRef, handleScroll, show, setScrollableRef }: ContentProps) => {
  const cellsCoord = useRef<any>({});
  const processLinks = useLinks({ show, cellsCoord });

  const setCellCoord = (holdingIndex: number, attributeIndex: number, drawLinks: any) => {
    if (!cellsCoord.current[holdingIndex]) {
      cellsCoord.current[holdingIndex] = {};
    }
    if (!cellsCoord.current[holdingIndex][attributeIndex]) {
      cellsCoord.current[holdingIndex][attributeIndex] = {};
    }
    cellsCoord.current[holdingIndex][attributeIndex].drawLinks = drawLinks;
  }

  useEffect(() => {
    processLinks();
  }, [processLinks]);

  return (
    
    <div
      ref={setScrollableRef || scrollableColumnRef}
      onScroll={handleScroll}
      className="scrollable-section"
      style={{
        // Do not move to CSS, as this will cause a delay in vertical scrolling synchronization.
        overflow: 'auto',
      }}>
      <div style={{ width: `${NUMBER_OF_YEARS * YEAR_CELL_WIDTH_PX}px` }}>
        {/* Header row */}
        <div className="scrollable-header">
          {Array.from({ length: NUMBER_OF_YEARS }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="header-cell"
              style={{ width: `${YEAR_CELL_WIDTH_PX}px` }}
            >
              {colIndex + 2023}
            </div>
          ))}

          <TodayLine />
        </div>

        {/* Table content */}
        <div
          className="table-content"
          style={{ width: `${NUMBER_OF_YEARS * YEAR_CELL_WIDTH_PX}px`, position: 'relative' }}
        >
          {Array.from({ length: HOLDINGS_PER_PAGE }).map((_, holdingIdex) => (
            <div
              key={holdingIdex}
              className="table-row"
              style={{
                height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
              }}>
              <HoldingYearCell
                showMe={show[holdingIdex]}
                label={`R${holdingIdex + 2}`}
                holdingIdex={holdingIdex}
                setCellCoord={setCellCoord}
              />

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HoldingsLinks;
