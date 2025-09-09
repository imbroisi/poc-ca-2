import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { HoldingId } from '../types/expandTypes';


type ExpandedHoldingsState = { expanded: ReadonlySet<HoldingId> };

type ExpandedHoldingsAction =
| { type: "TOGGLE_HOLDING"; id: HoldingId }
| { type: "EXPAND_ALL_HOLDINGS"; ids: HoldingId[] }
| { type: "COLLAPSE_ALL_HOLDINGS" };

interface ExpandedHoldingsCtxValue {
  state: ExpandedHoldingsState;
  toggleHolding: (id: HoldingId) => void;
  expandAllHoldings: (ids: HoldingId[]) => void;
  collapseAllHoldings: () => void;
}
  
function expandedCompaniesReducer(
  state: ExpandedHoldingsState,
  action: ExpandedHoldingsAction
): ExpandedHoldingsState {
  switch (action.type) {
    case "TOGGLE_HOLDING": 
      const next = new Set(state.expanded);
      console.log("Before toggle:", Array.from(state.expanded));
      next.has(action.id) ? next.delete(action.id) : next.add(action.id);
      console.log("After toggle:", Array.from(next));
      return { expanded: next };
    case "EXPAND_ALL_HOLDINGS":
      return { expanded: new Set(action.ids) };
    case "COLLAPSE_ALL_HOLDINGS":
      return { expanded: new Set() };
    default:
      return state;
  }
}


const ExpandedHoldings = createContext<ExpandedHoldingsCtxValue | null>(null);

export function ExpandedHoldingsProvider({ children, initialExpandedIds = [] as HoldingId[] }: { children: React.ReactNode; initialExpandedIds?: HoldingId[]; }) {
  const [state, dispatch] = useReducer(expandedCompaniesReducer, { expanded: new Set(initialExpandedIds) });


  const value = useMemo<ExpandedHoldingsCtxValue>(() => ({
    state,
    toggleHolding: (id) => dispatch({ type: "TOGGLE_HOLDING", id }),
    expandAllHoldings: (ids) => dispatch({ type: "EXPAND_ALL_HOLDINGS", ids }),
    collapseAllHoldings: () => dispatch({ type: "COLLAPSE_ALL_HOLDINGS" }),
  }), [state]);


return (
    <ExpandedHoldings.Provider value={value}>
      {children}
    </ExpandedHoldings.Provider>
  );
}

export const useExpandedHoldings = () => {
  const ctx = useContext(ExpandedHoldings);
  if (!ctx) throw new Error("useExpandedHoldings must be used within <ExpandedHoldingsProvider>");
  return ctx;
};