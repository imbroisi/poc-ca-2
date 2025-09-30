import { HEADER_HEIGHT, MAIN_BORDER_COLOR } from '../../config';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.holdingsHistoryHeader}
      style={{
        height: HEADER_HEIGHT,
        borderColor: MAIN_BORDER_COLOR
      }}>
      Holdings
    </div>
  );
}

export default Header;
