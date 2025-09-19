import { HOLDINGS_PER_PAGE, MAIN_BORDER_COLOR } from '../../config';
import './MenuHoldings.css';
import MenuHoldingName from '../MenuHoldingName';
import MenuHoldingAttributes from '../MenuHoldingAttributes';

export interface MenuHoldingsProps {
  show: boolean[];
  toggleArrow: (rowIndex: number) => void;
  rotatedArrows: boolean[];
}

const MenuHoldings = ({ show, toggleArrow, rotatedArrows }: MenuHoldingsProps) => {
  return (
    <div className="fixed-column-table">
      {Array.from({ length: HOLDINGS_PER_PAGE }).map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="fixed-column-row"
          style={{
            height: show[rowIndex] ? '120px' : '0',
            maxHeight: show[rowIndex] ? '120px' : '0',
            overflow: 'hidden'
          }}
        >
          <div className="fixed-column-cell" style={{ borderColor: MAIN_BORDER_COLOR }}>

            <MenuHoldingName
              holdingName={`Holding ${rowIndex + 1}`}
              onClick={() => toggleArrow(rowIndex)}
              rotatedArrow={rotatedArrows[rowIndex]}
            />

            <MenuHoldingAttributes show={show[rowIndex]} />

          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuHoldings;
