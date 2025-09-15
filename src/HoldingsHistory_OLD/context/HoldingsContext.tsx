import React, { createContext, useContext, useMemo } from "react";
import { Holding } from "../types/expandTypes";

interface HoldingsContextValue {
  holdings: Holding[];
}

const HoldingsContext = createContext<HoldingsContextValue | null>(null);

export const HoldingsProvider: React.FC<{
  children: React.ReactNode,
  holdings: Holding[]
}> = ({ children, holdings }) => {

  const value = useMemo(() => ({ holdings }), [holdings]);

  return (
    <HoldingsContext.Provider value={value}>
      {children}
    </HoldingsContext.Provider>
  );
};

export const useHoldings = () => {
  const ctx = useContext(HoldingsContext);
  if (!ctx) throw new Error("useHoldings must be used within a HoldingsProvider");
  return ctx;
};
