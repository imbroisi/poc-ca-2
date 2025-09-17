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

        // Find the main HoldingsHistory component (look for the div with blue border)
        const holdingsHistoryElement = document.querySelector('div[style*="border: 2px solid blue"]') as HTMLElement;
        
        if (holdingsHistoryElement) {
          const holdingsHistoryRect = holdingsHistoryElement.getBoundingClientRect();
          const holdingsHistoryBottom = holdingsHistoryRect.bottom;
          
          // Calculate the distance
          const distance = holdingsHistoryBottom - todayLineTop;
          
          console.log('TodayLine top position:', todayLineTop);
          console.log('HoldingsHistory bottom position:', holdingsHistoryBottom);
          console.log('Calculated distance:', distance);
          
          // Set the calculated height
          setCalculatedHeight(`${distance - 2}px`);
        } else {
          console.warn('HoldingsHistory component not found');
        }
      }
    };

    // Calculate on mount
    calculateDistance();

    // Recalculate on window resize
    window.addEventListener('resize', calculateDistance);

    return () => {
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
