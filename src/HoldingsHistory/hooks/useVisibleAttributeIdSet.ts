import { useMemo } from "react";
import { Holding } from "../types/expandTypes";
import { useExpandedHoldings } from "../context/ExpandContext";
import { visibleAttributeIdSet } from "../utils/visibleAttributeIdSet";


export function useVisibleAttributeIdSet(holdings: Holding[]) {
  const { state } = useExpandedHoldings();

  const visibleHoldings = useMemo(() => visibleAttributeIdSet(holdings, state.expanded), [holdings, state.expanded]);

  return visibleHoldings;
}