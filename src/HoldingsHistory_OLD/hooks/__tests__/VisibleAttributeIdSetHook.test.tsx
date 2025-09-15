import { renderHook, act } from "@testing-library/react";
import { ExpandedHoldingsProvider, useExpandedHoldingsActions } from "../../context/ExpandedHoldingsContext";
import { useVisibleAttributeIdSet } from "../useVisibleAttributeIdSet";

// Mock data
const mockHoldings = [
  { id: "holding-1", attributes: [{ id: "attr-1" }, { id: "attr-2" }] },
  { id: "holding-2", attributes: [{ id: "attr-3" }] },
] as any; // simplify typing for test

describe("useVisibleAttributeIdSet", () => {
  it("throws if used outside ExpandedHoldingsProvider", () => {
    expect(() => renderHook(() => useVisibleAttributeIdSet(mockHoldings))).toThrow(
      "useExpandedHoldingsState must be used within ExpandedHoldingsProvider"
    );
  });

  it("returns attribute IDs only for expanded holdings", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ExpandedHoldingsProvider>{children}</ExpandedHoldingsProvider>
    );
  
    const { result } = renderHook(
      () => ({
        visible: useVisibleAttributeIdSet(mockHoldings),
        actions: useExpandedHoldingsActions(),
      }),
      { wrapper }
    );
  
    // Initially empty
    expect(Array.from(result.current.visible)).toEqual([]);
  
    // Expand holding-1
    act(() => result.current.actions.toggleHolding("holding-1"));
  
    // After toggle, visible updates
    expect(Array.from(result.current.visible)).toEqual(["attr-1", "attr-2"]);
  });

  it("updates when holdings input changes", () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ExpandedHoldingsProvider>{children}</ExpandedHoldingsProvider>
    );
  
    const { result, rerender } = renderHook(
      () => ({
        visible: useVisibleAttributeIdSet(mockHoldings),
        actions: useExpandedHoldingsActions(),
      }),
      { wrapper }
    );

    expect(Array.from(result.current.visible)).toEqual([]); // none expanded

    // Add expanded state for holding-2
    act(() => result.current.actions.toggleHolding("holding-2"));


    // Re-render with same holdings
    rerender({ holdings: mockHoldings });
    expect(Array.from(result.current.visible)).toEqual(["attr-3"]);
  });
});
