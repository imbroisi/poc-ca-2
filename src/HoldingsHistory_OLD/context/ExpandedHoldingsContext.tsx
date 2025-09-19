import React, { createContext, useCallback, useContext, useMemo, useReducer } from 'react';
import { HoldingId } from '../types/expandTypes';


interface ExpandedHoldingsActionsCtxValue {
  toggleHolding: (id: HoldingId) => void;
  expandAllHoldings: (ids: HoldingId[]) => void;
  collapseAllHoldings: () => void;
}

type ToggleAction = { type: "TOGGLE_HOLDING"; id: HoldingId };
type ExpandAllAction = { type: "EXPAND_ALL_HOLDINGS"; ids: HoldingId[] };
type CollapseAllAction = { type: "COLLAPSE_ALL_HOLDINGS" };

type ExpandedHoldingsState = { expanded: ReadonlySet<HoldingId> };
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
    if (next.has(action.id)) {
      next.delete(action.id);
    } else {
      next.add(action.id);
    }
    // Prevent unnecessary re-renders
    // if (next.size === state.expanded.size && [...next].every(id => state.expanded.has(id))) {
    //   return state;
    // }
  
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

const ExpandedHoldingsStateContext = createContext<ExpandedHoldingsState | null>(
  null
);
const ExpandedHoldingsActionsContext = createContext<ExpandedHoldingsActionsCtxValue | null>(
  null
);

export function ExpandedHoldingsProvider({ children, initialExpandedIds = [] as HoldingId[] }: { children: React.ReactNode; initialExpandedIds?: HoldingId[]; }) {
  const [state, dispatch] = useReducer(expandedHoldingsReducer, { expanded: new Set(initialExpandedIds || []) });

  const toggleHolding = useCallback((id: HoldingId) => dispatch({ type: "TOGGLE_HOLDING", id }), [dispatch]);
  const expandAllHoldings = useCallback((ids: HoldingId[]) => dispatch({ type: "EXPAND_ALL_HOLDINGS", ids }), [dispatch]);
  const collapseAllHoldings = useCallback(() => dispatch({ type: "COLLAPSE_ALL_HOLDINGS" }), [dispatch]);

  const value = useMemo(() => ({
    expanded: state.expanded,
  }), [state]);

  const actions = useMemo(() => ({
    toggleHolding,
    expandAllHoldings,
    collapseAllHoldings,
  }), [collapseAllHoldings, expandAllHoldings, toggleHolding]);

return (
    <ExpandedHoldingsStateContext.Provider value={value}>
      <ExpandedHoldingsActionsContext.Provider value={actions}>
        {children}
      </ExpandedHoldingsActionsContext.Provider>
    </ExpandedHoldingsStateContext.Provider>
  );
}

export const useExpandedHoldingsState = () => {
  const ctx = useContext(ExpandedHoldingsStateContext);
  if (!ctx) {
    throw new Error(
      "useExpandedHoldingsState must be used within ExpandedHoldingsProvider"
    );
  }
  return ctx;
};

export const useExpandedHoldingsActions = () => {
  const ctx = useContext(ExpandedHoldingsActionsContext);
  if (!ctx) {
    throw new Error(
      "useExpandedHoldingsActions must be used within ExpandedHoldingsProvider"
    );
  }
  return ctx;
};