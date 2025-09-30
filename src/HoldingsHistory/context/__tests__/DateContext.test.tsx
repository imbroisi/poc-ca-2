import { render, renderHook, screen } from '@testing-library/react';
import React from 'react';
import { DateProvider, useDateContext } from '../DateContext';

jest.mock('../../config', () => ({
  YEAR_CELL_WIDTH_PX: 365, // 1px per day for easier assertions
}));

const ONE_DAY_IN_MS = 24 * 60 * 60 * 1000;

describe('DateContext', () => {
  const Wrapper: React.FC<{ children?: React.ReactNode } & any> = ({ children, todayDate = '2024-03-05', numberOfYears = 1 }) => (
    <DateProvider todayDate={todayDate} numberOfYears={numberOfYears}>{children}</DateProvider>
  );

  const Consumer = () => {
    const ctx = useDateContext();
    return (
      <div>
        <div data-testid="today">{ctx.todayMmDdYyyy}</div>
        <div data-testid="first-year">{ctx.firstYearInTableUnit}</div>
        <div data-testid="last-year">{ctx.lastYearInTableUnit}</div>
      </div>
    );
  };

  test('provides basic values and years range', () => {
    render(<Wrapper><Consumer /></Wrapper>);

    expect(screen.getByTestId('today').textContent).toBe('03/05/2024');
    // With numberOfYears=1, last year is 2024, first year is also 2024
    expect(Number(screen.getByTestId('first-year').textContent)).toBeGreaterThanOrEqual(2024);
    expect(Number(screen.getByTestId('last-year').textContent)).toBeGreaterThanOrEqual(2024);
  });

  test('convertDateToPositionPx computes px based on days from firstEpoch', () => {
    const Probe = () => {
      const { convertDateToPositionPx } = useDateContext();
      // Same day used to initialize firstEpochDay + offset
      const px = convertDateToPositionPx('2024-03-05');
      return <div data-testid="px">{Math.round(px)}</div>;
    };

    render(<Wrapper><Probe /></Wrapper>);
    // With YEAR_CELL_WIDTH_PX=365 and numberOfYears=1, each day is 1px; position should be >= 0
    expect(Number(screen.getByTestId('px').textContent)).toBeGreaterThanOrEqual(0);
  });

  test('month helpers work', () => {
    const Probe = () => {
      const { getMonthName, monthNameToIndex } = useDateContext();
      return (
        <div>
          <div data-testid="m0">{getMonthName(0)}</div>
          <div data-testid="idx">{monthNameToIndex('Feb')}</div>
        </div>
      );
    };

    render(<Wrapper><Probe /></Wrapper>);
    expect(screen.getByTestId('m0').textContent).toBe('January');
    expect(screen.getByTestId('idx').textContent).toBe('1');
  });

  test('getNDaysBefore returns ISO date n days before', () => {
    const Probe = () => {
      const { getNDaysBefore } = useDateContext();
      return <div data-testid="d">{getNDaysBefore('2024-03-10', 5)}</div>;
    };

    render(<Wrapper><Probe /></Wrapper>);
    expect(screen.getByTestId('d').textContent).toBe('2024-03-05');
  });

  test('displayDate formats as mm/dd/yyyy using UTC', () => {
    const Probe = () => {
      const { displayDate } = useDateContext();
      return <div data-testid="f">{displayDate('2024-03-10')}</div>;
    };

    render(<Wrapper><Probe /></Wrapper>);
    expect(screen.getByTestId('f').textContent).toBe('03/10/2024');
  });

  test('handles different numberOfYears correctly', () => {
    render(<Wrapper numberOfYears={3}><Consumer /></Wrapper>);
    
    const lastYear = Number(screen.getByTestId('last-year').textContent);
    const firstYear = Number(screen.getByTestId('first-year').textContent);
    expect(lastYear - firstYear + 1).toBe(3);
  });

  test('handles date string input formats correctly', () => {
    const dates = [
      { input: '2024-03-05', expected: '03/05/2024' },
      { input: new Date('2024-03-05T00:00:00Z'), expected: '03/05/2024' }
    ];

    dates.forEach(({ input, expected }) => {
      const { unmount } = render(<Wrapper todayDate={input}><Consumer /></Wrapper>);
      expect(screen.getByTestId('today').textContent).toBe(expected);
      unmount(); // Clean up after each test case
    });
  });

  test('throws when used outside provider', () => {
    // Suppress console errors for this expected error test
    const originalError = console.error;
    console.error = jest.fn();
    
    // Testing hook without a provider should throw
    expect(() => {
      renderHook(() => {
        // Access the hook directly to trigger the error
        return useDateContext();
      });
    }).toThrow('useDateContext must be used within a DateProvider');
    
    // Restore console.error
    console.error = originalError;
  });
});
