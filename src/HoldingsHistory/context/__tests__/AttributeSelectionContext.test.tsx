import React from 'react';
import { render, screen, renderHook, act } from '@testing-library/react';
import { AttributeSelectionProvider, useAttributeSelection } from '../AttributeSelecionContext';
import { ATTRIBUTES } from '../../config';

describe('AttributeSelectionContext', () => {
  test('should provide initial state with all attributes checked', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AttributeSelectionProvider>{children}</AttributeSelectionProvider>
    );

    const { result } = renderHook(() => useAttributeSelection(), { wrapper });

    expect(result.current.checkedAttributes).toHaveLength(Object.keys(ATTRIBUTES).length);
    expect(result.current.checkedAttributes.every(checked => checked)).toBe(true);
  });

  test('should update checked attributes state', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AttributeSelectionProvider>{children}</AttributeSelectionProvider>
    );

    const { result } = renderHook(() => useAttributeSelection(), { wrapper });

    act(() => {
      const newCheckedState = Object.keys(ATTRIBUTES).map(() => false);
      result.current.setCheckedAttributes(newCheckedState);
    });

    expect(result.current.checkedAttributes.every(checked => !checked)).toBe(true);
  });

  test('should throw error when used outside provider', () => {
    expect(() => {
      renderHook(() => useAttributeSelection());
    }).toThrow('useAttributeSelection must be used within a AttributeSelectionProvider');
  });

  test('should render children correctly', () => {
    render(
      <AttributeSelectionProvider>
        <div data-testid="child">Test Child</div>
      </AttributeSelectionProvider>
    );

    expect(screen.getByTestId('child')).toHaveTextContent('Test Child');
  });

  test('should handle partial attribute selection', () => {
    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <AttributeSelectionProvider>{children}</AttributeSelectionProvider>
    );

    const { result } = renderHook(() => useAttributeSelection(), { wrapper });

    act(() => {
      const partialCheckedState = Object.keys(ATTRIBUTES).map((_, index) => index % 2 === 0);
      result.current.setCheckedAttributes(partialCheckedState);
    });

    expect(result.current.checkedAttributes).toEqual(
      Object.keys(ATTRIBUTES).map((_, index) => index % 2 === 0)
    );
  });
});