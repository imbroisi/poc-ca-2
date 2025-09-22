import React from 'react';
import './MenuAttributeDate.css';
import { ATTRIBUTE_ITEM_HEIGHT, ATTRIBUTES, TOTAL_ATTRIBUTES } from '../../../config';

function MenuAttributeDate({ date, show }: { date: string, show: boolean }) {
  return (
    <div className="expandable-content-inception" style={{
      height: show ? `${ATTRIBUTE_ITEM_HEIGHT * TOTAL_ATTRIBUTES}px` : '0',
    }}>
      {Object.keys(ATTRIBUTES).map((attribute) => (
        <div
          key={`${attribute}-${date}`}
          className={'expandable-content-item-inception attribute-enabled'}
          style={{ height: `${ATTRIBUTE_ITEM_HEIGHT}px` }}
        >
          {date}
        </div>
      ))}
    </div>
  )
}

export default MenuAttributeDate;
