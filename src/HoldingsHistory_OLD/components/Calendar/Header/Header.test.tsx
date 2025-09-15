import { render, screen } from '@testing-library/react';
import CalendarHeader from './Header';
import { PickersCalendarHeaderProps } from '@mui/x-date-pickers/PickersCalendarHeader';
import dayjs from 'dayjs';

// Mock MUI components
jest.mock('@mui/material/Typography', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-typography">{children}</div>
  ),
}));

jest.mock('@mui/material/Stack', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-stack">{children}</div>
  ),
}));

describe('CalendarHeader', () => {
  const mockProps: PickersCalendarHeaderProps = {
    currentMonth: dayjs('2024-03-15'),
    views: [],
    onMonthChange: jest.fn(),
    onViewChange: jest.fn(),
    view: 'day',
    reduceAnimations: false,
    disabled: false,
    minDate: dayjs('2020-01-01'),
    maxDate: dayjs('2025-12-31'),
    disableFuture: false,
    disablePast: false,
    labelId: 'calendar-header',
    slots: {},
    slotProps: {},
    timezone: ''
  };

  test('renders header with correct month and year', () => {
    render(<CalendarHeader {...mockProps} />);

    // Verify the header container is rendered
    const headerContainer = screen.getByTestId('mock-header-container');
    expect(headerContainer).toBeInTheDocument();

    // Verify the month and year are displayed correctly
    const typography = screen.getByTestId('mock-typography');
    expect(typography).toHaveTextContent('March 2024');
  });

  test('renders Stack component', () => {
    render(<CalendarHeader {...mockProps} />);
    
    const stack = screen.getByTestId('mock-stack');
    expect(stack).toBeInTheDocument();
  });

  describe('month display', () => {
    const months = [
      { date: '2024-01-15', expected: 'January 2024' },
      { date: '2024-06-15', expected: 'June 2024' },
      { date: '2024-12-15', expected: 'December 2024' },
    ];

    months.forEach(({ date, expected }) => {
      test(`displays ${expected} correctly`, () => {
        const props = {
          ...mockProps,
          currentMonth: dayjs(date),
        };

        render(<CalendarHeader {...props} />);
        expect(screen.getByTestId('mock-typography')).toHaveTextContent(expected);
      });
    });
  });
});
