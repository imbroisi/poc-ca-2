import { useEffect, useRef, useState } from 'react';
import { ATTRIBUTE_ITEM_HEIGHT, TODAY_LINE_COLOR, TOTAL_ATTRIBUTES } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './TodayLine.css';

export interface TodayLineProps {

}

const TodayLine = (props: TodayLineProps) => {
  const { todayPositionPx } = useDateContext();
  const todayLineRef = useRef<HTMLDivElement>(null);
  const [calculatedHeight, setCalculatedHeight] = useState('100px');

  useEffect(() => {
    const calculateDistance = () => {
      if (todayLineRef.current) {
        // Get the TodayLine component's position
        const todayLineRect = todayLineRef.current.getBoundingClientRect();
        const todayLineTop = todayLineRect.top;

        // Find the main HoldingsHistory component by looking for its container
        // Try multiple selectors to find the root container
        let holdingsHistoryElement = 
          // Look for div with height: 100% style (the main container)
          document.querySelector('div[style*="height: 100%"][style*="width: 100%"][style*="position: relative"]') as HTMLElement ||
          // Fallback: look for the nearest parent with a significant height
          todayLineRef.current.closest('div[style*="height"]') as HTMLElement ||
          // Last resort: use viewport
          document.documentElement;
        
        if (holdingsHistoryElement) {
          const holdingsHistoryRect = holdingsHistoryElement.getBoundingClientRect();
          const holdingsHistoryBottom = holdingsHistoryRect.bottom;
          
          // Calculate the distance
          const distance = holdingsHistoryBottom - todayLineTop;
          
          console.log('TodayLine top position:', todayLineTop);
          console.log('HoldingsHistory bottom position:', holdingsHistoryBottom);
          console.log('Target element:', holdingsHistoryElement);
          console.log('Calculated distance:', distance);
          
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
    const timeoutId = setTimeout(calculateDistance, 100);

    // Recalculate on window resize
    window.addEventListener('resize', calculateDistance);

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('resize', calculateDistance);
    };
  }, []);

  return (
    <div ref={todayLineRef} style={{ position: 'absolute', bottom: '0', width: '100%' }}>
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
