import MenuHoldings from '../MenuHoldings';
import MenuHoldingInceptionDate from '../MenuHoldingInceptionDate/MenuIHoldingInceptionDate';
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
    <div className="fixed-column">
      {/* Fixed column header */}
      <div className="fixed-column-header">
        {/* Row # */}
        <div 
          style={{
            height: '30px',
            width: '100%',
            borderBottom: '1px solid #ccc',
            background: '#f3f3f3',
          }}
        >

        </div>
        <div 
          style={{
            height: '40px',
            width: '100%',
            borderBottom: '1px solid #ccc',
            background: 'white',
          }}
        >
          
        </div>
        <div 
          style={{
            height: '30px',
            width: '100%',
            background: 'white',
          }}
        >

        </div>
        {/* <button onClick={() => setShow(!show)}>Toggle</button> */}
      </div>

      {/* Fixed column scrollable content */}
      <div
        ref={fixedColumnRef}
        onScroll={handleScroll}
        className="fixed-column-content"
        style={{
          // Do not move to CSS, as this will cause a delay in verical scrolling synchronization
          overflow: 'hidden',
          overflowY: 'scroll',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}>
          <div style={{ display: 'flex', flexDirection: 'row' }}>
            {/* Left fixed menu/attributes column */}
            <div style={{ flex: '0 0 auto' }}>
              <MenuHoldings show={show} toggleArrow={toggleArrow} rotatedArrows={rotatedArrows} />
            </div>

            {/* Right synchronized inception date column with strings per row */}
            <div style={{ flex: '1 1 auto' }}>
                <MenuHoldingInceptionDate show={show} />
            </div>
          </div>
      </div>
    </div>
  );
}

export default FixedContent;
