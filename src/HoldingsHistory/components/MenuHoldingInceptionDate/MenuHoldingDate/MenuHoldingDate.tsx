import React from 'react';
import styles from './MenuHoldingDate.module.scss';
import { ATTRIBUTE_ITEM_HEIGHT } from '../../../config';

function MenuHoldingDate({ date }: { date: string }) {
  return (
    <div
      className={styles.fixedColumnCellContentDate}
      style={{
        height: `${ATTRIBUTE_ITEM_HEIGHT + 1}px`,
    }}>
      <span className={styles.menuHoldingName} />
      {date}
    </div>
  )
}

export default MenuHoldingDate;
