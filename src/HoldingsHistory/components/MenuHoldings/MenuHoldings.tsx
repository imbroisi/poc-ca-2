import { HOLDINGS_PER_PAGE_DEFAULT, MAIN_BORDER_COLOR } from '../../config';
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
  const { getLinksDataCopy, pageToShow } = useLinksDataContext();
  const linksData = getLinksDataCopy();

  const minRowIndex = (pageToShow - 1) * HOLDINGS_PER_PAGE_DEFAULT;
  const maxRowIndex = (pageToShow) * HOLDINGS_PER_PAGE_DEFAULT - 1;

  console.log("400 ==>> minRowIndex", minRowIndex);
  console.log("401 ==>> maxRowIndex", maxRowIndex);

  return (
    <div className="fixed-column-table">
      {linksData.map((link, rowIndex) => {
        if (rowIndex < minRowIndex || rowIndex > maxRowIndex) return null;
        return (
          <div
            key={rowIndex}
            className="fixed-column-row"
            style={{
              height: show === null || show[rowIndex] ? '120px' : '0',
              maxHeight: show === null || show[rowIndex] ? '120px' : '0',
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
      })}
    </div>
  );
}

export default MenuHoldings;
