import { COLUMN_DEFAULT_HEADINGS, MAIN_BORDER_COLOR } from '../../config';
import MenuHoldings from '../MenuHoldings';
import MenuHoldingInceptionDate from '../MenuHoldingInceptionDate/MenuIHoldingInceptionDate';
import './FixedContent.css';
import ReferenceDataHeader from '../ReferenceDataHeader';

export interface FixedColumnsProps {
  toggleArrow: (index: number) => void;
  fixedColumnRef: React.RefObject<HTMLDivElement>;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  show: boolean[] | null;
  rotatedArrows: boolean[];
}

const FixedContent = ({ toggleArrow, fixedColumnRef, handleScroll, show, rotatedArrows }: FixedColumnsProps) => {
  return (
    <div 
      className="fixed-column"
      style={{
        // Move critical layout styles inline for better performance
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        borderColor: MAIN_BORDER_COLOR,
      }}>
    
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
        }}>
          <ReferenceDataHeader columnHeadings={COLUMN_DEFAULT_HEADINGS} />

          <div style={{ height: '30px', backgroundColor: 'white', position: 'sticky', top: '70px', zIndex: 97, borderBottom: `1px solid ${MAIN_BORDER_COLOR}`, boxSizing: 'border-box' }} />
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            <div style={{ flex: '0 0 auto'}}>
              <MenuHoldings show={show} toggleArrow={toggleArrow} rotatedArrows={rotatedArrows} />
            </div>
            <div style={{ flex: '1 1 auto' }}>
              <MenuHoldingInceptionDate show={show} />
            </div>
          
          </div>

      </div>
    </div>
  );
}

export default FixedContent;
