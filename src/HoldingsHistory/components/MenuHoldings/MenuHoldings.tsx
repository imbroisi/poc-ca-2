import { MAIN_BORDER_COLOR } from '../../config';
import './MenuHoldings.css';
import MenuHoldingName from '../MenuHoldingName';
import MenuHoldingAttributes from '../MenuHoldingAttributes';
import { useLinksDataContext } from '../../context/LinksDataProvider';

export interface MenuHoldingsProps {
  show: boolean[] | null;
  toggleArrow: (rowIndex: number) => void;
  rotatedArrows: boolean[];
}

const MenuHoldings = ({ show, toggleArrow, rotatedArrows }: MenuHoldingsProps) => {
  const { getHoldingsFilteredByPage } = useLinksDataContext();
  
  const holdingsFilteredByPage = getHoldingsFilteredByPage();
  
  return (
    <div className="fixed-column-table">
      {holdingsFilteredByPage.map((link, rowIndex) => (
          <div
            key={rowIndex}
            className="fixed-column-row"
            style={{
              height: show === null || show[rowIndex] ? '120px' : '0',
              maxHeight: show === null || show[rowIndex] ? '120px' : '0',
              // IMPORTANT: Do not move to CSS, it is needed as style for better scroll synchronization
              overflow: 'hidden'
            }}
          >
            <div className="fixed-column-cell" style={{ borderColor: MAIN_BORDER_COLOR }}>

              <MenuHoldingName
                holdingName={link.holdingName}
                onClick={() => toggleArrow(rowIndex)}
                rotatedArrow={rotatedArrows[rowIndex]}
              />

              <MenuHoldingAttributes show={show === null ? null : show[rowIndex]} />

            </div>
          </div>
        )
      )}
    </div>
  );
}

export default MenuHoldings;
