// ExpandedHoldings.test.tsx
import { renderHook, act } from "@testing-library/react";
import { ExpandedHoldingsProvider, useExpandedHoldings } from "../ExpandContext";

describe("expandedHoldingsReducer", () => {
  it("toggles full display of attributes of a given holding (show/hide)", () => {
    const { result } = renderHook(() => useExpandedHoldings(), {
      wrapper: ({ children }) => (
        <ExpandedHoldingsProvider>
          {children}
        </ExpandedHoldingsProvider>
      ),
    });

    act(() => result.current.toggleHolding("A"));
    expect(result.current.state.expanded.has("A")).toBe(true);

    act(() => result.current.toggleHolding("A"));
    expect(result.current.state.expanded.has("A")).toBe(false);
  });

  it("expands all holdings", () => {
    const { result } = renderHook(() => useExpandedHoldings(), {
      wrapper: ({ children }) => (
        <ExpandedHoldingsProvider>
          {children}
        </ExpandedHoldingsProvider>
      ),
    });

    act(() => result.current.expandAllHoldings(["A", "B", "C"]));
    expect(Array.from(result.current.state.expanded)).toEqual(["A", "B", "C"]);
  });

  it("collapses all holdings", () => {
    const { result } = renderHook(() => useExpandedHoldings(), {
      wrapper: ({ children }) => (
        <ExpandedHoldingsProvider initialExpandedIds={["X", "Y"]}>
          {children}
        </ExpandedHoldingsProvider>
      ),
    });

    act(() => result.current.collapseAllHoldings());
    expect(result.current.state.expanded.size).toBe(0);
  });

  it("throws when hook is used outside provider", () => {
    expect(() => renderHook(() => useExpandedHoldings())).toThrow(
      "useExpandedHoldings must be used within <ExpandedHoldingsProvider>"
    );
  });
});
