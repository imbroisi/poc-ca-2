import { useRef, useState, useCallback, useEffect } from 'react';
import HoldingsLinks from '../HoldingsLinks';

import './MainTable.css';
import FixedContent from '../FixedContent';
import { HOLDINGS_PER_PAGE, MAIN_BORDER_COLOR, TOTAL_ATTRIBUTES } from '../../config';
import { useLinksDataContext } from '../../context/LinksDataProvider';

const MainTable = () => {
  const { totalHoldings, pageToShow } = useLinksDataContext();
  const [show, setShow] = useState<boolean[] | null>(null);
  const [rotatedArrows, setRotatedArrows] = useState<boolean[]>(new Array(HOLDINGS_PER_PAGE).fill(true));
  const fixedColumnRef = useRef<HTMLDivElement>(null);
  const scrollableColumnRef = useRef<HTMLDivElement>(null);
  const isScrollingToTop = useRef(false);
  const isInitialLoad = useRef(true);

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

  useEffect(() => {
    if (totalHoldings === 0) return;

    setShow(new Array(totalHoldings).fill(true));
  }, [totalHoldings]);

  // Scroll to top when page changes
  useEffect(() => {
    // Skip only the very first load when component mounts
    if (isInitialLoad.current) {
      isInitialLoad.current = false;
      return;
    }
    
    // Set flag to prevent scroll synchronization interference
    isScrollingToTop.current = true;
    
    // Scroll both columns to top
    if (fixedColumnRef.current) {
      fixedColumnRef.current.scrollTop = 0;
    }
    if (scrollableColumnRef.current) {
      scrollableColumnRef.current.scrollTop = 0;
    }
    
    // Reset flag after scroll events settle
    setTimeout(() => {
      isScrollingToTop.current = false;
    }, 50);
  }, [pageToShow]);


  const toggleArrow = (index: number) => {
    // console.log("==>> toggleArrow", index);
    const newRotatedArrows = [...rotatedArrows];
    newRotatedArrows[index] = !newRotatedArrows[index];
    setRotatedArrows(newRotatedArrows);

    if (show) {
      const newShow = [...show];
      newShow[index] = !newShow[index];
      setShow(newShow);
    }
  };

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    // Skip synchronization during scroll-to-top operation
    if (isScrollingToTop.current) return;
    
    const scrollingElement = event.currentTarget;
    const isFixedColumn = scrollingElement === fixedColumnRef.current;

    if (isFixedColumn && scrollableColumnRef.current) {
      scrollableColumnRef.current.scrollTop = scrollingElement.scrollTop;
    } else if (!isFixedColumn && fixedColumnRef.current) {
      fixedColumnRef.current.scrollTop = scrollingElement.scrollTop;
    }
  };



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
