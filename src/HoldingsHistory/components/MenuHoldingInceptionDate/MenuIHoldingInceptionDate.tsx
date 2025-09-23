import { HOLDINGS_PER_PAGE } from '../../config';
import './MenuHoldingInceptionDate.css';
import MenuHoldingDate from './MenuHoldingDate/MenuHoldingDate';
import MenuAttributeDate from './MenuAttributeDate/MenuAttributeDate';
import { useLinksDataContext } from '../../context/LinksDataProvider';
import { useAttributeSelection } from '../../context/AttributeSelecionContext';
import { useEffect, useRef } from 'react';

export interface MenuHoldingInceptionDateProps {
  show: boolean[] | null;
}

const MenuHoldingInceptionDate = ({ show = [] }: MenuHoldingInceptionDateProps) => {
  const { getHoldingsFilteredByPage } = useLinksDataContext();
  
  const holdingsFilteredByPage = getHoldingsFilteredByPage();


  return (
    <div className="fixed-column-table">
      {holdingsFilteredByPage?.map((_, rowIndex) => (
        <div
          key={rowIndex}
          className="fixed-column-row"
          style={{
            height: show === null || show[rowIndex] ? '0' : '0',
            maxHeight: show === null || show[rowIndex] ? '0' : '0',
            // IMPORTANT: Do not move to CSS, it is needed as style for better scroll synchronization
            overflow: 'hidden',
            transition: 'height 0.3s ease-in-out',
          }}
        >
          <div className="fixed-column-cell">

            <MenuHoldingDate
              date={`2024-03-10`}
            />

            <MenuAttributeDate 
              date={'2024-03-10'}
              show={show === null ? null : show[rowIndex]}
            />

          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuHoldingInceptionDate;