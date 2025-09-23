import React from 'react';
import './MenuHoldingDate.css';
import { ATTRIBUTE_ITEM_HEIGHT } from '../../../config';

function MenuHoldingDate({ date }: { date: string }) {
  return (
    <div
      className="fixed-column-cell-content-date"
      style={{
        height: `${ATTRIBUTE_ITEM_HEIGHT + 1}px`,
    }}>
      <span className="menu-holding-name" />
      {date}
    </div>
  )
}

export default MenuHoldingDate;
