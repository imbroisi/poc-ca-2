import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { ATTRIBUTE_ITEM_HEIGHT, MAIN_BORDER_COLOR } from '../../config';
import styles from './MenuHoldingName.module.scss';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';

export interface MenuHoldingNameProps {
  onClick: () => void;
  rotatedArrow: boolean;
  holdingName: string;
}

const MenuHoldingName = ({ onClick, rotatedArrow, holdingName }: MenuHoldingNameProps) => {
  return (
    <div className={styles.fixedColumnCellContent} style={{
      borderColor: MAIN_BORDER_COLOR,
      height: `${ATTRIBUTE_ITEM_HEIGHT + 1}px`,
    }}>
      <span onClick={onClick} className={styles.menuHoldingName} style={{
        transform: rotatedArrow ? 'rotate(90deg)' : 'none',
      }}>
        <FontAwesomeIcon icon={faChevronRight} size="2xs" />
      </span>
      {holdingName}
    </div>
  );
}

export default MenuHoldingName;
