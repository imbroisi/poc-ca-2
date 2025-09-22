import { useRef, useState, useCallback, useEffect } from 'react';
import HoldingsLinks from '../HoldingsLinks';

import './MainTable.css';
import FixedContent from '../FixedContent';
import { HOLDINGS_PER_PAGE_DEFAULT, MAIN_BORDER_COLOR, TOTAL_ATTRIBUTES } from '../../config';
import { useLinksDataContext } from '../../context/LinksDataProvider';

const MainTable = () => {
  const { totalHoldings, pageToShow } = useLinksDataContext();
  const [show, setShow] = useState<boolean[] | null>(null);
  const [rotatedArrows, setRotatedArrows] = useState<boolean[]>(new Array(HOLDINGS_PER_PAGE_DEFAULT).fill(true));
  const fixedColumnRef = useRef<HTMLDivElement>(null);
  const scrollableColumnRef = useRef<HTMLDivElement>(null);
  const isScrollingToTop = useRef(false);
  const isInitialLoad = useRef(true);
  const historyTextRef = useRef<HTMLDivElement>(null);

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
    
    // Custom synchronized smooth scroll
    const animateScrollToTop = () => {
      const duration = 300; // Animation duration in ms
      const startTime = performance.now();
      
      // Get initial scroll positions
      const fixedStartScroll = fixedColumnRef.current?.scrollTop || 0;
      const scrollableStartScroll = scrollableColumnRef.current?.scrollTop || 0;
      
      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeOutCubic = 1 - Math.pow(1 - progress, 3);
        
        // Calculate current scroll positions
        const fixedCurrentScroll = fixedStartScroll * (1 - easeOutCubic);
        const scrollableCurrentScroll = scrollableStartScroll * (1 - easeOutCubic);
        
        // Apply synchronized scroll positions
        if (fixedColumnRef.current) {
          fixedColumnRef.current.scrollTop = fixedCurrentScroll;
        }
        if (scrollableColumnRef.current) {
          scrollableColumnRef.current.scrollTop = scrollableCurrentScroll;
        }
        
        // Continue animation if not complete
        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };
      
      requestAnimationFrame(animate);
    };
    
    animateScrollToTop();
    
    // Reset flag after animation completes
    setTimeout(() => {
      isScrollingToTop.current = false;
    }, 350);
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

  useEffect(() => {
    if (historyTextRef.current && fixedColumnRef.current) {
      console.log("fixedColumnRef.current.clientWidth", fixedColumnRef.current?.clientWidth);
      historyTextRef.current.style.left = `${fixedColumnRef.current.clientWidth + 6}px`;
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
        borderColor: MAIN_BORDER_COLOR,
      }}>
      <div ref={historyTextRef} style={{ 
        position: 'absolute', 
        zIndex: 1000, 
        top: '10px',
        fontSize: '11px',
        backgroundColor: 'white',
        textTransform: 'uppercase',
        fontWeight: 400,
        // height: '30px',
        // width: '100%',
        // left: '100px',
      }}>
        History
      </div>
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
