import { useEffect, useRef, useState } from 'react';
import { ATTRIBUTE_ITEM_HEIGHT, TODAY_LINE_COLOR, TOTAL_ATTRIBUTES } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './TodayLine.css';

export interface TodayLineProps {

}

const TodayLine = (props: TodayLineProps) => {
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
          
          // Calculate the distance
          const distance = holdingsHistoryBottom - todayLineTop;
          
          // console.log('🆔 ID-Based Solution:');
          // console.log('TodayLine top position:', todayLineTop);
          // console.log('HoldingsHistory bottom position:', holdingsHistoryBottom);
          // console.log('Target element ID:', holdingsHistoryElement.id);
          // console.log('Calculated distance:', distance);
          // console.log('✅ Using getElementById - clean and reliable!');
          
          // Set the calculated height (ensure minimum height)
          const finalHeight = Math.max(distance - 2, 100) + 1;
          setCalculatedHeight(`${finalHeight}px`);
        } else {
          console.warn('HoldingsHistory component not found, using viewport height');
          // Fallback to viewport calculation
          const viewportHeight = window.innerHeight;
          const distance = viewportHeight - todayLineTop;
          setCalculatedHeight(`${Math.max(distance - 50, 100)}px`);
        }
      }
    };

    // Add a small delay to ensure DOM is fully rendered
    const timeoutId = setTimeout(calculateDistance, 10);

    // Recalculate on window resize
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
