import React, { useEffect, useRef } from 'react';
import './MenuAttributeDate.css';
import { ATTRIBUTE_ITEM_HEIGHT, ATTRIBUTES } from '../../../config';
import { useAttributeSelection } from '../../../context/AttributeSelecionContext';

function MenuAttributeDate({ date, show }: { date: string, show: boolean | null }) {

  const { checkedAttributes } = useAttributeSelection();
  const lastCheckedAttributes = useRef<boolean[]>([]);

  const totalAttributesToRender = checkedAttributes.filter((attribute) => attribute).length;

  const transition = lastCheckedAttributes.current !== checkedAttributes
    ? 'none'
    : 'height 0.3s ease-in-out, opacity 0.3s ease-in-out'

  useEffect(() => {
    lastCheckedAttributes.current = checkedAttributes;
  }, [checkedAttributes]);

  return (
    <div className="expandable-content-inception" style={{
      height: show === null || show ? `${ATTRIBUTE_ITEM_HEIGHT * totalAttributesToRender}px` : '0',
      opacity: show === null || show ? 1 : 0,
      transition,
    }}>
      {Object.keys(ATTRIBUTES).map((attribute, index) => {
        if (!checkedAttributes[index]) return null;

        return (
            <div
              key={`${attribute}-${date}-${index}`}
              className={'expandable-content-item-inception attribute-enabled'}
              style={{ height: `${ATTRIBUTE_ITEM_HEIGHT}px` }}
            >
            {date}
          </div>
        )
      })}
    </div>
  )
}

export default MenuAttributeDate;
