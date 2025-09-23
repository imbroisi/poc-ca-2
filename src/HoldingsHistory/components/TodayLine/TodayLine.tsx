import { useEffect, useRef, useState } from 'react';
import { HEADER_HEIGHT, TODAY_LINE_COLOR } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './TodayLine.css';

const TodayLine = () => {
  const { todayPositionPx } = useDateContext();
  const todayLineRef = useRef<HTMLDivElement>(null);
  const [calculatedHeight, setCalculatedHeight] = useState<string | undefined>();

  useEffect(() => {
    const calculateDistance = () => {
      if (todayLineRef.current) {
        // Get the TodayLine component's position
        const todayLineRect = todayLineRef.current.getBoundingClientRect();
        const todayLineTop = todayLineRect.top;

        // Find the main HoldingsHistory component by ID (clean and reliable)
        const holdingsHistoryElement = document.getElementById('holdings-history-container');
        
        if (holdingsHistoryElement) {
          const holdingsHistoryRect = holdingsHistoryElement.getBoundingClientRect();
          const holdingsHistoryBottom = holdingsHistoryRect.bottom;
          
          const distance = holdingsHistoryBottom - todayLineTop;
          
          const finalHeight = Math.max(distance - 2 + HEADER_HEIGHT, 100) + 1;
          setCalculatedHeight(`${finalHeight}px`);
        } else {
          const viewportHeight = window.innerHeight;
          const distance = viewportHeight - todayLineTop;
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
      ref={todayLineRef}
      className="today-line-wrapper"
      style={{
        visibility: calculatedHeight ? 'visible' : 'hidden',
      }}
    >
      <div
        className="today-line-container"
        style={{
          left: todayPositionPx,
          '--today-line-height': calculatedHeight,
          '--today-line-color': TODAY_LINE_COLOR,
        } as React.CSSProperties}
      >
        <div className="triangle-down" />
        <div className="triangle-up" />
      </div>
    </div>
  );
}

export default TodayLine;
