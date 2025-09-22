import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ATTRIBUTE_ITEM_HEIGHT, MAIN_BORDER_COLOR } from '../../config';
import './MenuHoldingName.css';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export interface MenuHoldingNameProps {
  onClick: () => void;
  rotatedArrow: boolean;
  holdingName: string;
}

const MenuHoldingName = ({ onClick, rotatedArrow, holdingName }: MenuHoldingNameProps) => {
  return (
    <div className="fixed-column-cell-content" style={{
      borderColor: MAIN_BORDER_COLOR,
      height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
      // borderBottom: '1px solid #ccc'
    }}>
      <span onClick={onClick} className="menu-holding-name" style={{
        transform: rotatedArrow ? 'rotate(90deg)' : 'none',
      }}>
        <FontAwesomeIcon icon={faChevronRight} size="2xs" />
      </span>
      {holdingName}
    </div>
  );
}

export default MenuHoldingName;
