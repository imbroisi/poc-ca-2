import { renderHook, act } from "@testing-library/react";
import {
  ExpandedHoldingsProvider,
  useExpandedHoldingsState,
  useExpandedHoldingsActions,
} from "../ExpandedHoldingsContext";

describe("ExpandedHoldingsContext", () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ExpandedHoldingsProvider>{children}</ExpandedHoldingsProvider>
  );

  it("toggles full display of attributes of a given holding (show/hide)", () => {
    const { result } = renderHook(
      () => ({
        state: useExpandedHoldingsState(),
        actions: useExpandedHoldingsActions(),
      }),
      { wrapper }
    );

    act(() => result.current.actions.toggleHolding("A"));
    expect(result.current.state.expanded.has("A")).toBe(true);

    act(() => result.current.actions.toggleHolding("A"));
    expect(result.current.state.expanded.has("A")).toBe(false);
  });

  it("expands all holdings", () => {
    const { result } = renderHook(
      () => ({
        state: useExpandedHoldingsState(),
        actions: useExpandedHoldingsActions(),
      }),
      { wrapper }
    );

    act(() => result.current.actions.expandAllHoldings(["A", "B", "C"]));
    expect(Array.from(result.current.state.expanded)).toEqual(["A", "B", "C"]);
  });

  it("collapses all holdings", () => {
    const wrapperWithInitial = ({ children }: { children: React.ReactNode }) => (
      <ExpandedHoldingsProvider initialExpandedIds={["X", "Y"]}>
        {children}
      </ExpandedHoldingsProvider>
    );

    const { result } = renderHook(
      () => ({
        state: useExpandedHoldingsState(),
        actions: useExpandedHoldingsActions(),
      }),
      { wrapper: wrapperWithInitial }
    );

    expect(result.current.state.expanded.size).toBe(2);

    act(() => result.current.actions.collapseAllHoldings());
    expect(result.current.state.expanded.size).toBe(0);
  });

  it("throws when state hook is used outside provider", () => {
    expect(() => renderHook(() => useExpandedHoldingsState())).toThrow(
      "useExpandedHoldingsState must be used within ExpandedHoldingsProvider"
    );
  });

  it("throws when actions hook is used outside provider", () => {
    expect(() => renderHook(() => useExpandedHoldingsActions())).toThrow(
      "useExpandedHoldingsActions must be used within ExpandedHoldingsProvider"
    );
  });
});
