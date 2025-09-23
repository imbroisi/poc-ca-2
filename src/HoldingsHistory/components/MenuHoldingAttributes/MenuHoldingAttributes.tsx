import { useEffect, useRef } from 'react';
import { ATTRIBUTE_ITEM_HEIGHT, ATTRIBUTES, TOTAL_ATTRIBUTES } from '../../config';
import { useAttributeSelection } from '../../context/AttributeSelecionContext';
import './MenuHoldingAttributes.css';

export interface MenuHoldingAttributesProps {
  show: boolean | null;
}

const MenuHoldingAttributes = ({ show }: MenuHoldingAttributesProps) => {
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
    <div className="expandable-content" style={{
      height: show === null || show ? `${ATTRIBUTE_ITEM_HEIGHT * totalAttributesToRender}px` : '0',
      opacity: show === null || show ? 1 : 0,
      transition,
    }}>
      {Object.keys(ATTRIBUTES).map((attribute, index) => { 
        if (!checkedAttributes[index]) return null;
        
        return(
        <div
          key={attribute}
          className={`expandable-content-item ${ATTRIBUTES[attribute as keyof typeof ATTRIBUTES] === 'enabled' ? 'attribute-enabled' : 'attribute-disabled'}`}
          style={{ height: `${ATTRIBUTE_ITEM_HEIGHT}px` }}
        >
          {attribute}
        </div>
      )})}
    </div>
  );
}

export default MenuHoldingAttributes;
