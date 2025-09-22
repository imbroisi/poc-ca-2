import { HOLDINGS_PER_PAGE } from '../../config';
import './MenuHoldingInceptionDate.css';
import MenuHoldingDate from './MenuHoldingDate/MenuHoldingDate';
import MenuAttributeDate from './MenuAttributeDate/MenuAttributeDate';

export interface MenuHoldingInceptionDateProps {
  show: boolean[];
}

const MenuHoldingInceptionDate = ({ show = [] }: MenuHoldingInceptionDateProps) => {
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
          <div className="fixed-column-cell">

            <MenuHoldingDate
              date={`2024-03-10`}
            />

            <MenuAttributeDate 
              date={'2024-03-10'}
              show={show[rowIndex]}
            />

          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuHoldingInceptionDate;