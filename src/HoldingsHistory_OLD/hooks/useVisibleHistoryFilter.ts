import { useVisibleAttributeIdSet } from './useVisibleAttributeIdSet';
import { Holding } from '../types/expandTypes';

export function useVisibleHistoryFilter(holdings: Holding[]) {
  // Set<AttributeId> of attributes that should be visible on HoldingsHistory timeline view
  const visibleAttrSet = useVisibleAttributeIdSet(holdings);
  // returns a function to quickly check if a given attribute is visible
  return (attributeId: string) => visibleAttrSet.has(attributeId);
}

// RightTable (pseudo):
// const isVisible = useVisibleHistoryFilter(holdings);
// rows.filter(r => isVisible(r.attributeId)).map(render)
