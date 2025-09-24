import { MAIN_BORDER_COLOR } from '../../config';
import FilterAttributes from '../FilterAttributes';
import filterByImage from '../../mock/filter-by.png';
import excludeLiquidated from '../../mock/exclude-liquidated.png';
import styles from './SettingsMenu.module.scss';
import { useEffect, useRef, useState } from 'react';

export interface SettingsMenuProps {

}

const SettingsMenu = ({ setMenuHeight, menuHeight }: any) => {
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
    // const [menuHeight, setMenuHeight] = useState<number | undefined>();

  
  useEffect(() => {
    // Wait for next frame to ensure all elements are rendered
    requestAnimationFrame(() => {
      if (topRef.current && bottomRef.current) {
        const topRect = topRef.current.getBoundingClientRect();
        const bottomRect = bottomRef.current.getBoundingClientRect();
        const distance = bottomRect.top - topRect.top;
        setMenuHeight(distance);        
      }
    });
  }, []);
  
  return (
    <div
      ref={topRef}
      className={styles.holdingsHistorySettingsMenu}
      style={{ 
        border: `1px solid ${MAIN_BORDER_COLOR}`,
        minHeight: menuHeight ? `${menuHeight}px` : undefined

      }}
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

      <div ref={bottomRef}>x</div>
    </div>
  );
}

export default SettingsMenu;
