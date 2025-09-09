import { AttributeId, Holding, HoldingId } from "../types/expandTypes";

export function visibleAttributeIdSet(holdings: Holding[], expanded: ReadonlySet<HoldingId>): Set<AttributeId> {
  const set = new Set<AttributeId>();
  for (const holding of holdings) {
    if (!expanded.has(holding.id)) continue;
    for (const attribute of holding.attributes) {
      // Maybe pass holdingId together with attribute id to make sure it will 
      set.add(attribute.id);
    }
  }
  return set;
}
