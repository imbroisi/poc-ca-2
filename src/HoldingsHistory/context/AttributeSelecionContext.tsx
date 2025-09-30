import React, { createContext, useContext, useState } from "react";
import { ATTRIBUTES } from "../config";

interface AttributeSelectionContextValue {
  checkedAttributes: boolean[];
  setCheckedAttributes: (checkedAttributes: boolean[]) => void;
}

const AttributeSelectionContext = createContext<AttributeSelectionContextValue | null>(null);

export const AttributeSelectionProvider: React.FC<{
  children: React.ReactNode,
}> = ({ children }) => {
  const [checkedAttributes, setCheckedAttributes] = useState<boolean[]>(() => 
    // all checkboxes set to true as default
    Object.keys(ATTRIBUTES).map(() => true)
  );

  return (
    <AttributeSelectionContext.Provider value={{ 
      checkedAttributes, 
      setCheckedAttributes 
    }}>
      {children}
    </AttributeSelectionContext.Provider>
  );
}
  
export const useAttributeSelection = () => {
  const ctx = useContext(AttributeSelectionContext);
  if (!ctx) throw new Error("useAttributeSelection must be used within a AttributeSelectionProvider");
  return ctx;
};
