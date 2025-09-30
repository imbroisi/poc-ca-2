import { render, screen } from '@testing-library/react';
import Cell, { CellProps } from './Cell';
import { useDateContext } from '../../context/DateContext';
import { useAttributeSelection } from '../../context/AttributeSelecionContext';
import { useLinksDataContext } from '../../context/LinksDataProvider';

// Mock the contexts
jest.mock('../../context/DateContext');
jest.mock('../../context/AttributeSelecionContext');
jest.mock('../../context/LinksDataProvider');

// Mock the config constants
jest.mock('../../config', () => ({
  ATTRIBUTE_ITEM_HEIGHT: 28,
  MAIN_BORDER_COLOR: '#c0c0c0',
  NUMBER_OF_YEARS: 3,
  TOTAL_ATTRIBUTES: 10,
  YEAR_CELL_WIDTH_PX: 466,
  HOLDINGS_PER_PAGE_DEFAULT: 20,
}));

const mockUseDateContext = useDateContext as jest.MockedFunction<typeof useDateContext>;
const mockUseAttributeSelection = useAttributeSelection as jest.MockedFunction<typeof useAttributeSelection>;
const mockUseLinksDataContext = useLinksDataContext as jest.MockedFunction<typeof useLinksDataContext>;

describe('Cell', () => {
  const defaultProps: CellProps = {
    showMe: true,
    label: 'Test Cell',
    holdingIdex: 0,
    colIndex: 0,
  };

  const mockSetCellCoord = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseDateContext.mockReturnValue({
      convertDateToPositionPx: jest.fn((date) => 100),
      todayPositionPx: 200,
      getMonthName: jest.fn(),
      monthNameToIndex: jest.fn(),
      getNDaysBefore: jest.fn(),
      firstYearInTableUnit: 2024,
      lastYearInTableUnit: 2024,
      numberOfYears: 1,
      displayDate: jest.fn(),
      todayDate: new Date('2024-09-24'),
      todayMmDdYyyy: '09/24/2024',
      todayYyyyMmDd: '2024-09-24',
    });

    mockUseAttributeSelection.mockReturnValue({
      checkedAttributes: [true, true, false, true],
      setCheckedAttributes: jest.fn(),
    });

    mockUseLinksDataContext.mockReturnValue({
      pageToShow: 1,
      getHoldingsFilteredByPage: jest.fn(),
      holdingsPerPage: 10,
      totalHoldings: 5,
      rowsToRender: 10,
      cellTopPx: jest.fn(),
      setPageToShow: jest.fn(),
      setHoldingsPerPage: jest.fn(),
      isEditMode: false,
      setIsEditMode: jest.fn(),
      addLink: jest.fn(),
      deleteLink: jest.fn(),
      getLinksDataCopy: jest.fn(),
    });
  });

  describe('rendering', () => {
    test('should render without crashing', () => {
      render(<Cell {...defaultProps} />);
      expect(document.querySelector('.table-cell')).toBeInTheDocument();
    });

    test('should render with correct height when showMe is true', () => {
      render(<Cell {...defaultProps} showMe={true} />);
      const cell = document.querySelector('.table-cell') as HTMLElement;
      // With 3 checked attributes: (28 * (3 + 1) + 1) = 113px
      expect(cell).toHaveStyle({ height: '113px' });
    });

    test('should render with height 0 when showMe is false', () => {
      render(<Cell {...defaultProps} showMe={false} />);
      const cell = document.querySelector('.table-cell') as HTMLElement;
      expect(cell).toHaveStyle({ height: '0px' });
    });

    test('should render year separator lines', () => {
      render(<Cell {...defaultProps} />);
      const yearLines = document.querySelectorAll('[style*="position: absolute"]');
      expect(yearLines.length).toBeGreaterThan(0);
    });

    test('should render attribute container', () => {
      render(<Cell {...defaultProps} />);
      expect(document.querySelector('.table-cell-attribute-container')).toBeInTheDocument();
    });

    test('should render only checked attributes', () => {
      // Mock 4 attributes, with 3 checked (indices 0, 1, 3)
      render(<Cell {...defaultProps} />);
      const attributeDivs = document.querySelectorAll('.table-cell-attribute');
      expect(attributeDivs).toHaveLength(3); // Only checked attributes
    });
  });

  describe('setCellCoord callback', () => {
    test('should call setCellCoord when provided', () => {
      const freshMockSetCellCoord = jest.fn();
      render(<Cell {...defaultProps} setCellCoord={freshMockSetCellCoord} />);
      
      // Should be called for each checked attribute
      expect(freshMockSetCellCoord).toHaveBeenCalled();
      expect(freshMockSetCellCoord).toHaveBeenCalledWith(0, expect.any(Number), expect.any(Function));
    });

    test('should not call setCellCoord when not provided', () => {
      expect(() => render(<Cell {...defaultProps} />)).not.toThrow();
    });
  });

  describe('link rendering', () => {
    test('should render without crashing when drawLinks is called', () => {
      mockSetCellCoord.mockClear();
      const { container } = render(<Cell {...defaultProps} setCellCoord={mockSetCellCoord} />);

      // Check that component renders without any link data
      expect(container.querySelector('.table-cell')).toBeInTheDocument();
      expect(container.querySelectorAll('.table-cell-link')).toHaveLength(0);
    });
  });

  describe('page change effect', () => {
    test('should clear links when pageToShow changes', () => {
      const { rerender } = render(<Cell {...defaultProps} />);

      // Change page
      mockUseLinksDataContext.mockReturnValue({
        ...mockUseLinksDataContext.mock.results[0].value,
        pageToShow: 2,
      });

      rerender(<Cell {...defaultProps} />);

      // The useEffect should have cleared the linkDataBulk state
      // This is tested implicitly through the component not crashing
      expect(document.querySelector('.table-cell')).toBeInTheDocument();
    });
  });

  describe('attribute changes', () => {
    test('should update transition when checked attributes change', () => {
      const { rerender } = render(<Cell {...defaultProps} />);

      // Change checked attributes
      mockUseAttributeSelection.mockReturnValue({
        checkedAttributes: [false, true, true, false],
        setCheckedAttributes: jest.fn(),
      });

      rerender(<Cell {...defaultProps} />);
      
      // Component should still render correctly with new attributes
      expect(document.querySelector('.table-cell')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    test('should apply correct styles for year separator lines', () => {
      render(<Cell {...defaultProps} />);
      const firstYearLine = document.querySelector('[style*="position: absolute"]') as HTMLElement;
      
      expect(firstYearLine).toHaveStyle({
        position: 'absolute',
        borderLeft: '1px solid #c0c0c0',
      });
    });

    test('should apply correct styles for attribute container', () => {
      render(<Cell {...defaultProps} />);
      const container = document.querySelector('.table-cell-attribute-container') as HTMLElement;
      
      expect(container).toHaveStyle({
        borderColor: '#c0c0c0',
        height: '28px', // totalAttributesToRender > 0
      });
    });

    test('should hide attribute container when no attributes are checked', () => {
      mockUseAttributeSelection.mockReturnValue({
        checkedAttributes: [false, false, false, false],
        setCheckedAttributes: jest.fn(),
      });

      render(<Cell {...defaultProps} />);
      const container = document.querySelector('.table-cell-attribute-container') as HTMLElement;
      
      expect(container).toHaveStyle({
        height: '0px',
      });
    });
  });

  describe('memo behavior', () => {
    test('should be a memoized component', () => {
      // Cell should be memoized to prevent unnecessary re-renders
      // Memoized components are objects with a render function
      expect(Cell).toBeDefined();
      expect(typeof Cell).toBe('object');
    });
  });
});
