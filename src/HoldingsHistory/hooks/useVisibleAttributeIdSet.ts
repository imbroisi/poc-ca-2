import { useMemo } from "react";
import { Holding } from "../types/expandTypes";
import { useExpandedHoldingsState } from "../context/ExpandedHoldingsContext";
import { visibleAttributeIdSet } from "../utils/visibleAttributeIdSet";


export function useVisibleAttributeIdSet(holdings: Holding[]) {
  const { expanded } = useExpandedHoldingsState();

  const visibleHoldings = useMemo(() => visibleAttributeIdSet(holdings, expanded), [holdings, expanded]);

  console.log("visibleHoldings", visibleHoldings);

  return visibleHoldings;
}
