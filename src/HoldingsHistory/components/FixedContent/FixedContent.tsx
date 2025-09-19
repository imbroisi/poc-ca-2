import { ATTRIBUTE_ITEM_HEIGHT, ATTRIBUTES, MAIN_BORDER_COLOR, TOTAL_ATTRIBUTES } from '../../config';
import MenuHoldings from '../MenuHoldings';
import './FixedContent.css';

export interface FixedColumnsProps {
  toggleArrow: (index: number) => void;
  fixedColumnRef: React.RefObject<HTMLDivElement>;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  show: boolean[];
  rotatedArrows: boolean[];
}

const FixedContent = ({ toggleArrow, fixedColumnRef, handleScroll, show, rotatedArrows }: FixedColumnsProps) => {

  return (
    <div 
      className="fixed-column"
      style={{
        // Move critical layout styles inline for better performance
        width: '300px',
        // borderRight: '1px solid #666',
        display: 'flex',
        flexDirection: 'column',
        borderColor: MAIN_BORDER_COLOR,
      }}>
      {/* Fixed column header */}
      <div className="fixed-column-header" style={{ borderBottom: `1px solid ${MAIN_BORDER_COLOR}` }} />
    
      {/* Fixed column scrollable content */}
      <div
        ref={fixedColumnRef}
        onScroll={handleScroll}
        className="fixed-column-content"
        style={{
          // Do not move to CSS, as this will cause a delay in verical scrolling synchronization
          // Critical layout styles moved inline for performance
          overflow: 'hidden',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          flex: 1,
          // Performance optimizations
          willChange: 'scroll-position',
          WebkitOverflowScrolling: 'touch',

          // borderBottom: `1px solid ${MAIN_BORDER_COLOR}`,
        }}>
          <MenuHoldings show={show} toggleArrow={toggleArrow} rotatedArrows={rotatedArrows} />
      </div>
    </div>
  );
}

export default FixedContent;
