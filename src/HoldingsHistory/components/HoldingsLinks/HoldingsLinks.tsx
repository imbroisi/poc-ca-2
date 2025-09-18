import { Fragment, useRef } from 'react';
import { ATTRIBUTE_ITEM_HEIGHT, HOLDINGS_PER_PAGE, YEAR_CELL_WIDTH_PX } from '../../config';
import { useHoldings } from '../../context/HoldingsContext';
import { useVisibleAttributeIdSet } from '../../hooks/useVisibleAttributeIdSet';
import HoldingYearCell from '../Cell';
import TodayLine from '../TodayLine';
import './HoldingsLinks.css';
import Links from '../Links';

export interface ContentProps {
  scrollableColumnRef: React.RefObject<HTMLDivElement> | null;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  show: boolean[];
  setScrollableRef?: (element: HTMLDivElement | null) => void;
}

const COLS = 3;

const HoldingsLinks = ({ scrollableColumnRef, handleScroll, show, setScrollableRef }: ContentProps) => {
  const { holdings } = useHoldings();
  const cellsCoord = useRef<any>({});

  // Provide fallback for holdings to prevent "not iterable" error
  const safeHoldings = holdings && Array.isArray(holdings) ? holdings : [];
  const visibleAttrSet = useVisibleAttributeIdSet(safeHoldings);
  const visibleAttributes = Array.from(visibleAttrSet) as string[];

  // console.log("==>> show", show);

  const setCellCoord = (holdingIndex: number, attributeIndex: number, drawLinks: any) => {
    // console.log("==>> setCellCoord", holdingIndex, attributeIndex);
    if (!cellsCoord.current[holdingIndex]) {
      cellsCoord.current[holdingIndex] = {};
    }
    if (!cellsCoord.current[holdingIndex][attributeIndex]) {
      cellsCoord.current[holdingIndex][attributeIndex] = {};
    }
    cellsCoord.current[holdingIndex][attributeIndex].drawLinks = drawLinks;

    // const x = () => {
    //   console.log("==>> x");
    // }

    // const y = x

    // console.log("==>> typeof y", typeof y);


    // console.log("==>> typeof cellsCoord.current[holdingIndex][attributeIndex]", typeof cellsCoord.current[holdingIndex][attributeIndex].drawLinks);
    // console.log("==>> drawLinks", typeof drawLinks);

  }

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
            <Links show={show} cellsCoord={cellsCoord} />

            {Array.from({ length: HOLDINGS_PER_PAGE }).map((_, holdingIdex) => (
              <div
                key={holdingIdex}
                className="table-row"
                style={{
                  height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
                  // maxHeight: `${ATTRIBUTE_ITEM_HEIGHT}px`,
                  position: 'relative',
                  // backgroundColor: 'white',
                  // zIndex: 1 + (holdingIdex * 2),

                  // backgroundColor: 'red',

                }}>
                {/* {Array.from({ length: COLS }).map((_, colIndex) => ( */}
                  {/* <Fragment key={colIndex}> */}
                    <HoldingYearCell
                      showMe={show[holdingIdex]}
                      label={`R${holdingIdex + 2}`}
                      // isTodayColumn={colIndex === COLS - 1}
                      holdingIdex={holdingIdex}
                      // colIndex={colIndex}
                      setCellCoord={setCellCoord}
                    />
                  {/* </Fragment> */}
                {/* ))} */}
              </div>
            ))}
          </div>
        </div>
      </div>

    </>
  );
}

export default HoldingsLinks;
