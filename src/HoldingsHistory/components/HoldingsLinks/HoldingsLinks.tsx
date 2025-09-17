import { useRef } from 'react';
import { ATTRIBUTE_ITEM_HEIGHT, HOLDINGS_PER_PAGE, YEAR_CELL_WIDTH_PX } from '../../config';
import { useHoldings } from '../../context/HoldingsContext';
import { useVisibleAttributeIdSet } from '../../hooks/useVisibleAttributeIdSet';
import Cell from '../Cell';
import Links from '../Links';
import TodayLine from '../TodayLine';
import './HoldingsLinks.css';

export interface ContentProps {
  scrollableColumnRef: React.RefObject<HTMLDivElement> | null;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  show: boolean[];
  setScrollableRef?: (element: HTMLDivElement | null) => void;
}

const COLS = 3;

const HoldingsLinks = ({ scrollableColumnRef, handleScroll, show, setScrollableRef }: ContentProps) => {
  const { holdings } = useHoldings();
  // const tableContentRef = useRef<HTMLDivElement>(null);

  // Provide fallback for holdings to prevent "not iterable" error
  const safeHoldings = holdings && Array.isArray(holdings) ? holdings : [];
  const visibleAttrSet = useVisibleAttributeIdSet(safeHoldings);
  const visibleAttributes = Array.from(visibleAttrSet) as string[];

  console.log("==>> show", show);

  return (
    <>
      <div
        ref={setScrollableRef || scrollableColumnRef}
        onScroll={handleScroll}
        className="scrollable-section"
        style={{
          // Do not move to CSS, as this will cause a delay in vertical scrolling synchronization.
          overflow: 'auto',
          // position: 'relative',
        }}>
        <div style={{ width: `${COLS * YEAR_CELL_WIDTH_PX}px` }}>
          {/* Header row */}
          <div className="scrollable-header" style={{ zIndex: 100 }}>
            {Array.from({ length: COLS }).map((_, colIndex) => (
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
            style={{ width: `${COLS * YEAR_CELL_WIDTH_PX}px`, position: 'relative' }}
          >
            <Links visibleAttributes={visibleAttributes} show={show} />

            {Array.from({ length: HOLDINGS_PER_PAGE }).map((_, rowIndex) => (
              <div
                key={rowIndex}
                className="table-row"
                style={{
                  height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
                  maxHeight: `${ATTRIBUTE_ITEM_HEIGHT}px`,
                  position: 'relative',
                  backgroundColor: 'white',
                  zIndex: 1 + (rowIndex * 2),
                }}>
                {Array.from({ length: COLS }).map((_, colIndex) => (
                  <Cell
                    key={colIndex}
                    showMe={show[rowIndex]}
                    label={`R${rowIndex + 2} C${colIndex + 2}`}
                  />
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default HoldingsLinks;
