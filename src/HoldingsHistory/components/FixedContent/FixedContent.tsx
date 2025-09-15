import { ATTRIBUTE_ITEM_HEIGHT, ATTRIBUTES, TOTAL_ATTRIBUTES } from '../../config';
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
        <div className="fixed-column-table">
          {Array.from({ length: 19 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="fixed-column-row"
              style={{
                height: show[rowIndex] ? '120px' : '0',
                maxHeight: show[rowIndex] ? '120px' : '0',
                overflow: 'hidden'
              }}
            >
              <div className="fixed-column-cell" style={{
                // height: show[rowIndex] ? '40px' : '0'
              }}>
                <div className="fixed-column-cell-content" style={{
                  height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
                }}>
                  Holding {rowIndex + 1}
                  <span
                    onClick={() => toggleArrow(rowIndex)}
                    className="arrow-icon"
                    style={{
                      transform: rotatedArrows[rowIndex] ? 'rotate(90deg)' : 'none'
                  }}>▶</span>              
                </div>

                <div className="expandable-content" style={{
                  height: show[rowIndex] ? `${ATTRIBUTE_ITEM_HEIGHT * TOTAL_ATTRIBUTES}px` : '0',
                  overflow: 'hidden',
                  paddingTop: '0px',
                }}>
                  {Object.keys(ATTRIBUTES).map((attribute) => (
                    <div
                      key={attribute}
                      className={`attribute-item ${ATTRIBUTES[attribute as keyof typeof ATTRIBUTES] === 'enabled' ? 'attribute-enabled' : 'attribute-disabled'}`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
                        fontSize: '12px',
                        // borderBottom: '1px solid #ccc',
                        // borderTop: '1px solid #ccc',
                      }}
                    >
                      {attribute}
                    </div>
                  ))}
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FixedContent;
