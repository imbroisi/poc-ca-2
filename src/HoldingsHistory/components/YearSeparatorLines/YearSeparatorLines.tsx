import { useEffect, useRef, useState } from 'react';
import { HEADER_HEIGHT, MAIN_BORDER_COLOR, NUMBER_OF_YEARS, YEAR_CELL_WIDTH_PX } from '../../config';
import styles from './YearSeparatorLines.module.scss';

const YearSeparatorLines = () => {
  const yearLinesRef = useRef<HTMLDivElement>(null);
  const [calculatedHeight, setCalculatedHeight] = useState<string | undefined>();

  useEffect(() => {
    const calculateDistance = () => {
      if (yearLinesRef.current) {
        // Get the YearSeparatorLines component's position
        const yearLinesRect = yearLinesRef.current.getBoundingClientRect();
        const yearLinesTop = yearLinesRect.top;

        // Find the main HoldingsHistory component by ID (clean and reliable)
        const holdingsHistoryElement = document.getElementById('holdings-history-container');
        
        if (holdingsHistoryElement) {
          const holdingsHistoryRect = holdingsHistoryElement.getBoundingClientRect();
          const holdingsHistoryBottom = holdingsHistoryRect.bottom;
          
          const distance = holdingsHistoryBottom - yearLinesTop;
          
          const finalHeight = Math.max(distance - 2 + HEADER_HEIGHT, 100) + 1;
          setCalculatedHeight(`${finalHeight}px`);
        } else {
          const viewportHeight = window.innerHeight;
          const distance = viewportHeight - yearLinesTop;
          setCalculatedHeight(`${Math.max(distance - 50, 100)}px`);
        }
      }
    };

    // Add a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(calculateDistance, 10);
    window.addEventListener('resize', calculateDistance);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateDistance);
    };
  }, []);

  return (
    <div
      ref={yearLinesRef}
      className={styles.yearLinesWrapper}
      style={{
        visibility: calculatedHeight ? 'visible' : 'hidden',
      }}
    >
      {Array.from({ length: NUMBER_OF_YEARS }).map((_, yearIndex) => (
        <div
          key={yearIndex}
          className={styles.yearLineContainer}
          style={{
            left: `${yearIndex * YEAR_CELL_WIDTH_PX - 1}px`,
            '--year-line-height': calculatedHeight,
            '--year-line-color': MAIN_BORDER_COLOR,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};

export default YearSeparatorLines;
