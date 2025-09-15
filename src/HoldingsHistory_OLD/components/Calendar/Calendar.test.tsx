import { render, screen, fireEvent } from '@testing-library/react';
import Calendar from './Calendar';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

jest.mock('@mui/x-date-pickers/LocalizationProvider', () => ({
  LocalizationProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="mock-localization-provider">{children}</div>
  ),
}));

// Mock simples do DateCalendar
jest.mock('@mui/x-date-pickers/DateCalendar', () => {
  const formatIsoDateOnly = (val: any): string => {
    try {
      if (val === null || typeof val === 'undefined') {
        return '';
      }
      // Try dayjs-like format function if present
      if (val && typeof val.format === 'function') {
        return val.format('YYYY-MM-DD');
      }
      // Try to parse native Date or ISO-like string
      const d = new Date(val);
      if (!isNaN(d.getTime())) {
        const mm = String(d.getUTCMonth() + 1).padStart(2, '0');
        const dd = String(d.getUTCDate()).padStart(2, '0');
        const yyyy = d.getUTCFullYear();
        return `${yyyy}-${mm}-${dd}`;
      }
    } catch {}
    return '';
  };

  const toIsoString = (val: any): string | undefined => {
    try {
      if (val === null || typeof val === 'undefined') {
        return undefined;
      }
      if (val && typeof val.format === 'function') {
        return val.format();
      }
      const d = new Date(val);
      return isNaN(d.getTime()) ? undefined : d.toISOString();
    } catch {
      return undefined;
    }
  };

  return {
    DateCalendar: (props: any) => (
      <div data-testid="mock-date-calendar">
        <div data-testid="calendar-value">
          {formatIsoDateOnly(props.value) || formatIsoDateOnly(props.defaultValue) || ''}
        </div>
        <button
          data-testid="calendar-change-button"
          onClick={() => {
            // Provide a fake Dayjs-like object sufficient for component logic
            const fakeDay = {
              utc: () => ({
                startOf: () => ({
                  month: () => 2,   // March (0-based)
                  date: () => 15,
                  year: () => 2024,
                }),
              }),
            };
            props.onChange?.(fakeDay);
          }}
        >
          Change Date
        </button>
        <button
          data-testid="calendar-change-null"
          onClick={() => props.onChange?.(null)}
        >
          Change Null
        </button>
        <button
          data-testid="calendar-change-plain"
          onClick={() => {
            // plain object without utc(), but with month/date/year
            const plain = {
              month: () => 2,
              date: () => 16,
              year: () => 2024,
            };
            props.onChange?.(plain);
          }}
        >
          Change Plain
        </button>
        <div data-testid="calendar-props">
          {JSON.stringify({
            minDate: toIsoString(props.minDate),
            maxDate: toIsoString(props.maxDate),
            disableFuture: props.disableFuture,
            defaultValue: toIsoString(props.defaultValue),
            timezone: props.timezone
          })}
        </div>
      </div>
    )
  };
});

// Configuração do dayjs
dayjs.extend(utc);

describe('Calendar', () => {  
  const defaultProps = {
    defaultDate: '2024-03-01T00:00:00Z',
    minDate: '2024-01-01T00:00:00Z',
    maxDate: '2024-12-31T00:00:00Z',
    onSelect: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders with default props', () => {
    render(<Calendar {...defaultProps} />);

    expect(screen.getByTestId('mock-localization-provider')).toBeInTheDocument();
    expect(screen.getByTestId('mock-date-calendar')).toBeInTheDocument();
    expect(screen.getByTestId('calendar-value')).toHaveTextContent(
      dayjs.utc(defaultProps.defaultDate).startOf('day').format('YYYY-MM-DD')
    );
  });

  test('handles date selection', () => {
    render(
      <Calendar 
        {...defaultProps} 
      />
    );

    const changeButton = screen.getByTestId('calendar-change-button');
    fireEvent.click(changeButton);

    expect(defaultProps.onSelect).toHaveBeenCalledWith('03-15-2024');
  });

  test('ignores null selection', () => {
    render(<Calendar {...defaultProps} />);

    const btn = screen.getByTestId('calendar-change-null');
    fireEvent.click(btn);

    expect(defaultProps.onSelect).not.toHaveBeenCalled();
  });

  test('handles plain object selection without utc()', () => {
    const onSelect = jest.fn();
    render(<Calendar {...defaultProps} onSelect={onSelect} />);

    const btn = screen.getByTestId('calendar-change-plain');
    fireEvent.click(btn);

    expect(onSelect).toHaveBeenCalledWith('03-16-2024');
  });

  test('respects min and max dates', () => {
    render(<Calendar {...defaultProps} />);

    const propsContent = screen.getByTestId('calendar-props').textContent;
    const props = JSON.parse(propsContent || '{}');

    const expectedMinDate = dayjs.utc(defaultProps.minDate).startOf('day').format();
    const expectedMaxDate = dayjs.utc(defaultProps.maxDate).startOf('day').format();

    expect(props.minDate).toBe(expectedMinDate);
    expect(props.maxDate).toBe(expectedMaxDate);
    expect(props.disableFuture).toBe(false);
  });

  test('passes timezone as UTC', () => {
    render(<Calendar {...defaultProps} />);

    const propsContent = screen.getByTestId('calendar-props').textContent;
    const props = JSON.parse(propsContent || '{}');

    expect(props.timezone).toBe('UTC');
  });

  test('handles undefined maxDate', () => {
    const { maxDate, ...propsWithoutMax } = defaultProps;
    const mockToday = dayjs.utc('2024-03-15T00:00:00Z');
    
    const spy = jest.spyOn(dayjs, 'utc').mockImplementation(() => mockToday);
    
    render(<Calendar {...propsWithoutMax} />);

    const propsContent = screen.getByTestId('calendar-props').textContent;
    const props = JSON.parse(propsContent || '{}');

    // With no maxDate, component passes maxDate=today and keeps disableFuture false
    expect(props.disableFuture).toBe(false);
    expect(props.maxDate).toBe(mockToday.startOf('day').format());

    spy.mockRestore();
  });

  test('handles undefined defaultDate', () => {
    const { defaultDate, ...propsWithoutDefault } = defaultProps;
    render(<Calendar {...propsWithoutDefault} />);

    expect(screen.getByTestId('calendar-value')).toBeEmptyDOMElement();
  });

  test('handles undefined minDate', () => {
    const { minDate, ...propsWithoutMin } = defaultProps;
    render(<Calendar {...propsWithoutMin} />);

    const propsContent = screen.getByTestId('calendar-props').textContent;
    const props = JSON.parse(propsContent || '{}');

    expect(props.minDate).toBeUndefined();
  });

  test('normalizes dates to UTC start of day', () => {
    const nonNormalizedDate = '2024-03-01T15:30:45Z';
    const normalizedDate = dayjs.utc(nonNormalizedDate).startOf('day');
    
    render(<Calendar {...defaultProps} defaultDate={nonNormalizedDate} />);
    
    const propsContent = screen.getByTestId('calendar-props').textContent;
    const props = JSON.parse(propsContent || '{}');
    
    expect(props.defaultValue).toBe(normalizedDate.format());
    expect(screen.getByTestId('calendar-value')).toHaveTextContent('2024-03-01');
  });
});