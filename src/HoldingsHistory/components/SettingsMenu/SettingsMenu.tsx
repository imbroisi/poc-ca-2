import { MAIN_BORDER_COLOR } from '../../config';
import FilterAttributes from '../FilterAttributes';
import filterByImage from '../../mock/filter-by.png';
import excludeLiquidated from '../../mock/exclude-liquidated.png';
import styles from './SettingsMenu.module.scss';

export interface SettingsMenuProps {

}

const SettingsMenu = (props: SettingsMenuProps) => {
  return (
    <div
      className={styles.holdingsHistorySettingsMenu}
      style={{ border: `1px solid ${MAIN_BORDER_COLOR}` }}
    >
      <div className={styles.holdingsHistorySettingsMenuItem}>
        Settings
      </div>

      <div className={styles.holdingsHistorySettingsMenuFilters}>
        Filters
      </div>

      <div>
        <img src={filterByImage} alt="Filter by" />
      </div>

      <FilterAttributes />
      
      <div>
        <img src={excludeLiquidated} alt="Filter by" />
      </div>
    </div>
  );
}

export default SettingsMenu;
