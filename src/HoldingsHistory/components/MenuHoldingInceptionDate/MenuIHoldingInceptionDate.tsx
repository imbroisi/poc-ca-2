import { HOLDINGS_PER_PAGE } from '../../config';
import './MenuHoldingInceptionDate.css';
import MenuHoldingDate from './MenuHoldingDate/MenuHoldingDate';
import MenuAttributeDate from './MenuAttributeDate/MenuAttributeDate';
import { useLinksDataContext } from '../../context/LinksDataProvider';

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
            height: show && show?.length && show[rowIndex] ? '120px' : '0',
            maxHeight: show && show?.length && show[rowIndex] ? '120px' : '0',
            overflow: 'hidden'
          }}
        >
          <div className="fixed-column-cell">

            <MenuHoldingDate
              date={`2024-03-10`}
            />

            <MenuAttributeDate 
              date={'2024-03-10'}
              show={show && show?.length && show[rowIndex] ? show[rowIndex] : null}
            />

          </div>
        </div>
      ))}
    </div>
  );
}

export default MenuHoldingInceptionDate;