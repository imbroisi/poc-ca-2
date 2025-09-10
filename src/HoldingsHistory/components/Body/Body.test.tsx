import { render, screen, fireEvent } from '@testing-library/react';
import Body from './Body';
import { useLinksDataContext } from '../../context/LinksDataProvider';
import { useDateContext } from '../../context/DateContext';

// Mock the components and contexts
jest.mock('../../context/LinksDataProvider', () => ({
  useLinksDataContext: jest.fn(),
}));

jest.mock('../../context/DateContext', () => ({
  useDateContext: jest.fn(),
}));

jest.mock('../TodayLine', () => ({
  __esModule: true,
  default: ({ left, rowsToRender }: { left: number; rowsToRender: number }) => (
    <tr data-testid="mock-today-line">
      <td data-testid="mock-today-line-content">TodayLine: {left}, {rowsToRender}</td>
    </tr>
  ),
}));

jest.mock('../Links', () => ({
  __esModule: true,
  default: () => (
    <tr data-testid="mock-links">
      <td data-testid="mock-links-content">Links Component</td>
    </tr>
  ),
}));

jest.mock('../AddLinkButtons', () => ({
  __esModule: true,
  default: ({ onDatePicked }: { onDatePicked: Function }) => (
    <tr data-testid="mock-add-link-buttons" onClick={() => onDatePicked('2024-03-25', '2024-03-20', 1, 2)}>
      <td data-testid="mock-add-link-buttons-content">Add Link Buttons</td>
    </tr>
  ),
}));

const TestWrapper = () => (
  <table>
    <Body />
  </table>
);

const renderBody = () => {
  return render(<TestWrapper />);
};

describe('Body', () => {
  const mockAddLink = jest.fn();
  
  const defaultContextValues = {
    linksContext: {
      totalAttributes: 2,
      rowsToRender: 6,
      addLink: mockAddLink,
    },
    dateContext: {
      numberOfYears: 3,
      todayPositionPx: 500,
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLinksDataContext as jest.Mock).mockReturnValue(defaultContextValues.linksContext);
    (useDateContext as jest.Mock).mockReturnValue(defaultContextValues.dateContext);
  });

  test('renders correct number of rows and cells', () => {
    renderBody();

    const bodyRows = Array.from(document.querySelectorAll('tr')).slice(0, 6); // Only the main rows
    expect(bodyRows).toHaveLength(6); // rowsToRender

    // Get all cells in body rows
    const cells = document.querySelectorAll('th');
    expect(cells).toHaveLength(18);
  });

  test('renders child components', () => {
    renderBody();

    // Verify components are rendered
    expect(screen.getByTestId('mock-today-line')).toBeInTheDocument();
    expect(screen.getByTestId('mock-links')).toBeInTheDocument();
    expect(screen.getByTestId('mock-add-link-buttons')).toBeInTheDocument();

    // Verify component content
    expect(screen.getByTestId('mock-today-line-content')).toHaveTextContent('TodayLine: 500, 6');
    expect(screen.getByTestId('mock-links-content')).toHaveTextContent('Links Component');
    expect(screen.getByTestId('mock-add-link-buttons-content')).toHaveTextContent('Add Link Buttons');
  });

  test('handles date picked correctly', () => {
    renderBody();

    const addLinkButtons = screen.getByTestId('mock-add-link-buttons');
    fireEvent.click(addLinkButtons);

    expect(mockAddLink).toHaveBeenCalledWith(
      '2024-03-25',  // lastDayStr
      '2024-03-20',  // firstDayStr
      1,            // cellIndex
      2             // cellRowIndex
    );
  });

  test('applies correct styles to rows', () => {
    renderBody();

    const bodyRows = Array.from(document.querySelectorAll('tr')).slice(0, 6); // Only the main rows
    
    // First two rows should have border color
    expect(bodyRows[0]).toHaveStyle({ borderColor: '#ddd' });
    expect(bodyRows[1]).toHaveStyle({ borderColor: '#ddd' });
    
    // Third row should have transparent border
    expect(bodyRows[2]).toHaveStyle({ borderColor: 'transparent' });
  });

  test('applies correct styles to cells', () => {
    renderBody();

    const cells = document.querySelectorAll('th');
    cells.forEach(cell => {
      expect(cell).toHaveStyle({
        height: '28px',
        borderColor: '#ddd'
      });
    });
  });
});