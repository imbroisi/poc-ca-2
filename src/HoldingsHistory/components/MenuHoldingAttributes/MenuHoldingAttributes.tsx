import { ATTRIBUTE_ITEM_HEIGHT, ATTRIBUTES, TOTAL_ATTRIBUTES } from '../../config';
import './MenuHoldingAttributes.css';

export interface MenuHoldingAttributesProps {
  show: boolean;
}

const MenuHoldingAttributes = ({ show }: MenuHoldingAttributesProps) => {
  return (
    <div className="expandable-content" style={{
      height: show ? `${ATTRIBUTE_ITEM_HEIGHT * TOTAL_ATTRIBUTES}px` : '0',
      opacity: show ? 1 : 0,
    }}>
      {Object.keys(ATTRIBUTES).map((attribute) => (
        <div
          key={attribute}
          className={`expandable-content-item ${ATTRIBUTES[attribute as keyof typeof ATTRIBUTES] === 'enabled' ? 'attribute-enabled' : 'attribute-disabled'}`}
          style={{ height: `${ATTRIBUTE_ITEM_HEIGHT}px` }}
        >
          {attribute}
        </div>
      ))}
    </div>
  );
}

export default MenuHoldingAttributes;
