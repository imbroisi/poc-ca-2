import { useRef, useState, useCallback } from 'react';
import HoldingsLinks from '../HoldingsLinks';

import './MainTable.css';
import FixedContent from '../FixedContent';
import { HOLDINGS_PER_PAGE, MAIN_BORDER_COLOR } from '../../config';

const MainTable = () => {
  const [show, setShow] = useState<boolean[]>(new Array(HOLDINGS_PER_PAGE).fill(true));
  const [rotatedArrows, setRotatedArrows] = useState<boolean[]>(new Array(HOLDINGS_PER_PAGE).fill(true));
  const fixedColumnRef = useRef<HTMLDivElement>(null);
  const scrollableColumnRef = useRef<HTMLDivElement>(null);

  const toggleArrow = (index: number) => {
    // console.log("==>> toggleArrow", index);
    const newRotatedArrows = [...rotatedArrows];
    newRotatedArrows[index] = !newRotatedArrows[index];
    setRotatedArrows(newRotatedArrows);

    const newShow = [...show];
    newShow[index] = !newShow[index];
    setShow(newShow);
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollingElement = event.currentTarget;
    const isFixedColumn = scrollingElement === fixedColumnRef.current;

    if (isFixedColumn && scrollableColumnRef.current) {
      scrollableColumnRef.current.scrollTop = scrollingElement.scrollTop;
    } else if (!isFixedColumn && fixedColumnRef.current) {
      fixedColumnRef.current.scrollTop = scrollingElement.scrollTop;
    }
  };

  // Set scroll position immediately during render - no loading then scrolling
  const setScrollableRef = useCallback((element: HTMLDivElement | null) => {
    if (element) {
      // Set the ref for component usage
      (scrollableColumnRef as React.MutableRefObject<HTMLDivElement | null>).current = element;
      
      // Set scroll position immediately during element attachment - no delays
      const maxScrollLeft = element.scrollWidth - element.clientWidth;
      element.scrollLeft = maxScrollLeft;
      // console.log('MainTable: Scroll position set during render - no visual shifting');
    }
  }, []);

  return (
      <div 
        className="table-container"
        style={{
          // Move critical layout styles inline for better scroll performance
          height: '100%',
          width: '100%',
          display: 'flex',
          overflow: 'hidden',
          boxSizing: 'border-box',
        }}>
        <FixedContent
          toggleArrow={toggleArrow}
          fixedColumnRef={fixedColumnRef as React.RefObject<HTMLDivElement>}
          handleScroll={handleScroll as (event: React.UIEvent<HTMLDivElement>) => void}
          show={show}
          rotatedArrows={rotatedArrows}
        />

        <HoldingsLinks
          scrollableColumnRef={scrollableColumnRef as React.RefObject<HTMLDivElement>}
          handleScroll={handleScroll}
          show={show}
          setScrollableRef={setScrollableRef}
        />
      </div>
  );
};

export default MainTable;
