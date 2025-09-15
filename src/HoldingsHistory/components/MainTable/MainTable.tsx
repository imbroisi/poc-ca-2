import { useRef, useState } from 'react';
import HoldingsLinks from '../HoldingsLinks';

import './MainTable.css';
import FixedContent from '../FixedContent';

// const COLS = 5;

const MainTable = () => {
  const [show, setShow] = useState<boolean[]>(new Array(19).fill(true));
  const [rotatedArrows, setRotatedArrows] = useState<boolean[]>(new Array(19).fill(true));

  const toggleArrow = (index: number) => {
    const newRotatedArrows = [...rotatedArrows];
    newRotatedArrows[index] = !newRotatedArrows[index];
    setRotatedArrows(newRotatedArrows);

    const newShow = [...show];
    newShow[index] = !newShow[index];
    setShow(newShow);
  };
  const fixedColumnRef = useRef<HTMLDivElement>(null);
  const scrollableColumnRef = useRef<HTMLDivElement>(null);

  const handleScroll = (event: React.UIEvent<HTMLDivElement>) => {
    const scrollingElement = event.currentTarget;
    const isFixedColumn = scrollingElement === fixedColumnRef.current;

    if (isFixedColumn && scrollableColumnRef.current) {
      scrollableColumnRef.current.scrollTop = scrollingElement.scrollTop;
    } else if (!isFixedColumn && fixedColumnRef.current) {
      fixedColumnRef.current.scrollTop = scrollingElement.scrollTop;
    }
  };

  return (
    <div className="table-container">
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
      />
    </div>
  );
};

export default MainTable;