import Cell from '../Cell';
import './HoldingsLinks.css';

export interface ContentProps {
  scrollableColumnRef: React.RefObject<HTMLDivElement> | null;
  handleScroll: (event: React.UIEvent<HTMLDivElement>) => void;
  show: boolean[];
}

const COLS = 3;

const HoldingsLinks = ({ scrollableColumnRef, handleScroll, show }: ContentProps) => {
  return (
    <div
      ref={scrollableColumnRef}
      onScroll={handleScroll}
      className="scrollable-section"
      style={{
        // Do not move to CSS, as this will cause a delay in vertical scrolling synchronization.
        overflow: 'auto'
      }}>
      <div className="scrollable-content" style={{ width: `${COLS * 300}px` }}>
        {/* Header row */}
        <div className="scrollable-header">
          {Array.from({ length: COLS }).map((_, colIndex) => (
            <div
              key={colIndex}
              className="header-cell"
            >
              {colIndex + 2023}
            </div>
          ))}
        </div>

        {/* Table content */}
        <div className="table-content" style={{ width: `${COLS * 300}px` }}>
          {Array.from({ length: 19 }).map((_, rowIndex) => (
            <div
              key={rowIndex}
              className="table-row"
              style={{
                height: show[rowIndex] ? '120px' : '0',
                maxHeight: show[rowIndex] ? '120px' : '0',
                overflow: 'hidden'
              }}>
              {Array.from({ length: COLS }).map((_, colIndex) => (
                <Cell
                  key={colIndex}
                  showMe={show[rowIndex]}
                  label={`R${rowIndex + 2} C${colIndex + 2}`}
                />
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HoldingsLinks;
