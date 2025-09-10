import React, { createContext, useContext, useMemo, useReducer } from 'react';
import { HoldingId } from '../types/expandTypes';


type ExpandedHoldingsState = { expanded: ReadonlySet<HoldingId> };
interface ExpandedHoldingsCtxValue {
  state: ExpandedHoldingsState;
  toggleHolding: (id: HoldingId) => void;
  expandAllHoldings: (ids: HoldingId[]) => void;
  collapseAllHoldings: () => void;
}

type ToggleAction = { type: "TOGGLE_HOLDING"; id: HoldingId };
type ExpandAllAction = { type: "EXPAND_ALL_HOLDINGS"; ids: HoldingId[] };
type CollapseAllAction = { type: "COLLAPSE_ALL_HOLDINGS" };

type ExpandedHoldingsAction = ToggleAction | ExpandAllAction | CollapseAllAction;

// Helper to extract action types by discriminant
type ActionMap = {
  TOGGLE_HOLDING: ToggleAction;
  EXPAND_ALL_HOLDINGS: ExpandAllAction;
  COLLAPSE_ALL_HOLDINGS: CollapseAllAction;
};

type Handlers = {
  [K in keyof ActionMap]: (state: ExpandedHoldingsState, action: ActionMap[K]) => ExpandedHoldingsState;
};

// Define handler map with properly inferred action types
const handlers: Handlers = {
  TOGGLE_HOLDING: (state, action) => {
    const next = new Set(state.expanded);
    next.has(action.id) ? next.delete(action.id) : next.add(action.id);
    return { expanded: next };
  },
  EXPAND_ALL_HOLDINGS: (_state, action) => {
    return { expanded: new Set(action.ids) };
  },
  COLLAPSE_ALL_HOLDINGS: () => {
    return { expanded: new Set() };
  },
};


function expandedHoldingsReducer(
  state: ExpandedHoldingsState,
  action: ExpandedHoldingsAction
): ExpandedHoldingsState {
  const handler = handlers[action.type];
  return handler(state as ExpandedHoldingsState, action as any);
}


const ExpandedHoldings = createContext<ExpandedHoldingsCtxValue | null>(null);

export function ExpandedHoldingsProvider({ children, initialExpandedIds = [] as HoldingId[] }: { children: React.ReactNode; initialExpandedIds?: HoldingId[]; }) {
  const [state, dispatch] = useReducer(expandedHoldingsReducer, { expanded: new Set(initialExpandedIds) });


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