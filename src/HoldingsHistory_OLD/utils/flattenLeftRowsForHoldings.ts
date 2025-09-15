import { Holding, HoldingId, VisibleLeftRow } from "../types/expandTypes";

export function flattenLeftRowsForHoldings(holdings: Holding[], expanded: ReadonlySet<HoldingId>): VisibleLeftRow[] {
  const out: VisibleLeftRow[] = [];
  for (const holding of holdings) {
    const hasChildren = holding.attributes?.length > 0;
    out.push({
      kind: "holding",
      holdingId: holding.id,
      depth: 0,
      primaryLabel: holding.name,
      secondaryLabel: holding.inceptionDate,
      hasChildren,
    });
    if (hasChildren && expanded.has(holding.id)) {
      for (const attribute of holding.attributes) {
        out.push({
          kind: "attribute",
          holdingId: holding.id,
          attributeId: attribute.id,
          depth: 1,
          primaryLabel: attribute.name,
          secondaryLabel: attribute.inceptionDate,
          hasChildren: false,
        });
      }
    }
  }
  return out;
}
