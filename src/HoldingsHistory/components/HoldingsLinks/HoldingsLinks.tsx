import { useEffect, useRef } from 'react';
import { ATTRIBUTE_ITEM_HEIGHT, MAIN_BORDER_COLOR, NUMBER_OF_YEARS, YEAR_CELL_WIDTH_PX } from '../../config';
import HoldingYearCell from '../Cell';
import TodayLine from '../TodayLine';
import './HoldingsLinks.css';
import useLinks from '../../hooks/useLinks';
import { useLinksDataContext } from '../../context/LinksDataProvider';

export interface ContentProps {
  scrollableColumnRef: React.RefObject<HTMLDivElement> | null;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  show: boolean[] | null;
  setScrollableRef?: (element: HTMLDivElement | null) => void;
}

const HoldingsLinks = ({ scrollableColumnRef, handleScroll, show, setScrollableRef }: ContentProps) => {
  const { holdingsPerPage, totalHoldings, pageToShow } = useLinksDataContext();
  const cellsCoord = useRef<any>({});
  const processLinks = useLinks({ show, cellsCoord });

  const setCellCoord = (holdingIndex: number, attributeIndex: number, drawLinks: any) => {

    // console.log("\n3000 ++++++==>> setCellCoord() holdingIndex", holdingIndex);
    // console.log("3001 ++++++==>> setCellCoord() attributeIndex", attributeIndex);
    // console.log("3002 ++++++==>> setCellCoord() drawLinks", drawLinks);

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

  const totalHoldingsToRender = holdingsPerPage * pageToShow <= totalHoldings 
    ? holdingsPerPage 
    : totalHoldings % holdingsPerPage;

  return (    
    <div
      ref={setScrollableRef || scrollableColumnRef}
      onScroll={handleScroll}
      className="scrollable-section"
      style={{
        // Do not move to CSS, as this will cause a delay in vertical scrolling synchronization.
        overflow: 'auto',
        // Critical layout styles moved inline for performance
        flex: 1,
        // Performance optimizations for smooth scrolling
        willChange: 'scroll-position',
        WebkitOverflowScrolling: 'touch',
      }}>
      <div style={{ width: `${NUMBER_OF_YEARS * YEAR_CELL_WIDTH_PX}px` }}>
        {/* Header row */}
        <div className="scrollable-header">
          {Array.from({ length: NUMBER_OF_YEARS }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="header-cell"
              style={{ 
                width: `${YEAR_CELL_WIDTH_PX}px`, 
                borderColor: MAIN_BORDER_COLOR,
                borderRight: colIndex === NUMBER_OF_YEARS - 1 ? 'none' : `1px solid ${MAIN_BORDER_COLOR}`
              }}
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
          {Array.from({ length: totalHoldingsToRender }).map((_, holdingIdex) => (
            <div
              key={holdingIdex}
              className="table-row"
              style={{
                borderColor: MAIN_BORDER_COLOR,
                height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
                // Move critical layout styles inline for better performance
                position: 'relative',
                display: 'table-row',
                // borderTop: '1px solid #ccc',
                overflow: 'hidden',
                // Performance optimizations
                transition: 'height 0.3s ease-in-out',
                willChange: 'height',
                contain: 'layout style',
              }}>
              <HoldingYearCell
                showMe={show === null || show[holdingIdex]}
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
