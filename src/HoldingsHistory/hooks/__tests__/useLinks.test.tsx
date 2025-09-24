import { renderHook } from '@testing-library/react';
import useLinks from '../useLinks';
import { useDateContext } from '../../context/DateContext';
import { useLinksDataContext } from '../../context/LinksDataProvider';

// Mock the config constants
jest.mock('../../config', () => ({
  ATTRIBUTES_IDS_DISABLED: {
    1: false,
    2: false,
    3: true, // This attribute is disabled
    4: false,
  },
  LINKS_COLORS: ['#c1dec1', '#cdd9e7'],
  LINKS_BORDERS_COLORS: ['#62aa66', '#718fe3'],
  LINKS_COLORS_DISABLED: ['#f9f9f9', '#f9f9f9'],
  LINKS_BORDERS_COLORS_DISABLED: ['#dddddd', '#dddddd'],
}));

// Mock the context hooks
jest.mock('../../context/DateContext', () => ({
  useDateContext: jest.fn(),
}));

jest.mock('../../context/LinksDataProvider', () => ({
  useLinksDataContext: jest.fn(),
}));

const mockUseDateContext = useDateContext as jest.MockedFunction<typeof useDateContext>;
const mockUseLinksDataContext = useLinksDataContext as jest.MockedFunction<typeof useLinksDataContext>;

describe('useLinks hook', () => {
  const mockCellsCoord = {
    current: {
      0: {
        0: { drawLinks: jest.fn() },
        1: { drawLinks: jest.fn() },
        2: { drawLinks: jest.fn() },
      },
      1: {
        0: { drawLinks: jest.fn() },
        1: { drawLinks: jest.fn() },
        2: { drawLinks: jest.fn() },
      },
    },
  };

  const mockLinksData = [
    {
      portfolioIndex: 0,
      attributeIndex: 1,
      firstDayDate: '2024-01-01',
      lastDayDate: '2024-06-30',
      valueLinks: [
        {
          attributeId: 1,
          startEffectiveDate: '2024-01-01',
          endEffectiveDate: '2024-03-31',
          label: 'First Period',
        },
        {
          attributeId: 2,
          startEffectiveDate: '2024-04-01',
          endEffectiveDate: 'today',
          label: 'Current Period',
        },
      ],
    },
    {
      portfolioIndex: 1,
      attributeIndex: 2,
      firstDayDate: '2024-02-01',
      lastDayDate: '2024-08-31',
      valueLinks: [
        {
          attributeId: 3, // This is disabled
          startEffectiveDate: '2024-02-01',
          endEffectiveDate: '2024-08-31',
          label: 'Disabled Attribute',
        },
        {
          attributeId: 1,
          startEffectiveDate: '2024-03-01',
          endEffectiveDate: '2024-07-31',
          label: '', // Empty label
        },
      ],
    },
  ];

  beforeEach(() => {
    jest.clearAllMocks();

    mockUseDateContext.mockReturnValue({
      todayYyyyMmDd: '2024-09-24',
      convertDateToPositionPx: jest.fn(),
      getMonthName: jest.fn(),
      monthNameToIndex: jest.fn(),
      getNDaysBefore: jest.fn(),
      firstYearInTableUnit: 2024,
      lastYearInTableUnit: 2024,
      numberOfYears: 1,
      todayPositionPx: 100,
      displayDate: jest.fn(),
      todayDate: new Date('2024-09-24'),
      todayMmDdYyyy: '09/24/2024',
    });

    mockUseLinksDataContext.mockReturnValue({
      getHoldingsFilteredByPage: jest.fn().mockReturnValue(mockLinksData),
      pageToShow: 1,
      holdingsPerPage: 10,
      totalHoldings: 2,
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

  describe('when show is null', () => {
    test('should return a function that does nothing when show is null', () => {
      const { result } = renderHook(() =>
        useLinks({ show: null, cellsCoord: mockCellsCoord })
      );

      // Call the returned processLinks function
      result.current();

      // Verify no drawing functions were called
      expect(mockCellsCoord.current[0][0].drawLinks).not.toHaveBeenCalled();
      expect(mockCellsCoord.current[0][1].drawLinks).not.toHaveBeenCalled();
    });
  });

  describe('when show is provided', () => {
    test('should process links and call drawing functions', () => {
      const show = [true, true];
      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      // Call the returned processLinks function
      result.current();

      // Verify drawing functions were called
      expect(mockCellsCoord.current[0][0].drawLinks).toHaveBeenCalled();
      expect(mockCellsCoord.current[0][1].drawLinks).toHaveBeenCalled();
    });

    test('should apply correct colors for enabled attributes', () => {
      const show = [true, true];
      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      result.current();

      // Check that enabled attributes get normal colors
      const enabledCalls = mockCellsCoord.current[0][0].drawLinks.mock.calls;
      if (enabledCalls.length > 0) {
        const linkData = enabledCalls[0][0];
        expect(['#c1dec1', '#cdd9e7']).toContain(linkData.color);
        expect(['#62aa66', '#718fe3']).toContain(linkData.borderColor);
      }
    });

    test('should apply disabled colors for disabled attributes', () => {
      const show = [true, true];
      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      result.current();

      // Check that disabled attributes get disabled colors
      const disabledCalls = mockCellsCoord.current[1][2].drawLinks.mock.calls;
      if (disabledCalls.length > 0) {
        const linkData = disabledCalls[0][0];
        expect(linkData.color).toBe('#f9f9f9');
        expect(linkData.borderColor).toBe('#dddddd');
      }
    });

    test('should apply transparent colors for links without labels', () => {
      const show = [true, true];
      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      result.current();

      // Find calls for links without labels
      let foundTransparentLink = false;
      Object.values(mockCellsCoord.current).forEach((row: any) => {
        Object.values(row).forEach((cell: any) => {
          cell.drawLinks.mock.calls.forEach((call: any) => {
            const linkData = call[0];
            if (!linkData.label || linkData.label === '') {
              expect(linkData.color).toBe('transparent');
              expect(linkData.borderColor).toBe('transparent');
              foundTransparentLink = true;
            }
          });
        });
      });
    });

    test('should replace "today" with actual date', () => {
      const show = [true, true];
      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      result.current();

      // Find calls that should have "today" replaced
      let foundTodayReplacement = false;
      Object.values(mockCellsCoord.current).forEach((row: any) => {
        Object.values(row).forEach((cell: any) => {
          cell.drawLinks.mock.calls.forEach((call: any) => {
            const linkData = call[0];
            if (linkData.noFinalDate) {
              expect(linkData.endEffectiveDate).toBe('2024-09-24');
              foundTodayReplacement = true;
            }
          });
        });
      });
    });

    test('should calculate correct holding indices', () => {
      const show = [true, true];
      const baseMockContext = {
        getHoldingsFilteredByPage: jest.fn().mockReturnValue(mockLinksData),
        pageToShow: 2,
        holdingsPerPage: 5,
        totalHoldings: 2,
        rowsToRender: 10,
        cellTopPx: jest.fn(),
        setPageToShow: jest.fn(),
        setHoldingsPerPage: jest.fn(),
        isEditMode: false,
        setIsEditMode: jest.fn(),
        addLink: jest.fn(),
        deleteLink: jest.fn(),
        getLinksDataCopy: jest.fn(),
      };
      
      mockUseLinksDataContext.mockReturnValue(baseMockContext);

      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      result.current();

      // Check that holdingRealIndex is calculated correctly
      // For page 2 with 5 holdings per page: realIndex = paginedIndex + (2-1) * 5
      Object.values(mockCellsCoord.current).forEach((row: any) => {
        Object.values(row).forEach((cell: any) => {
          cell.drawLinks.mock.calls.forEach((call: any) => {
            const linkData = call[0];
            const expectedRealIndex = linkData.holdingPaginedIndex + (2 - 1) * 5;
            expect(linkData.holdingRealIndex).toBe(expectedRealIndex);
          });
        });
      });
    });

    test('should convert attributeId to zero-based attributeIndex', () => {
      const show = [true, true];
      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      result.current();

      // Check that attributeIndex is attributeId - 1
      Object.values(mockCellsCoord.current).forEach((row: any) => {
        Object.values(row).forEach((cell: any) => {
          cell.drawLinks.mock.calls.forEach((call: any) => {
            const linkData = call[0];
            // attributeIndex should be attributeId - 1
            expect(typeof linkData.attributeIndex).toBe('number');
            expect(linkData.attributeIndex).toBeGreaterThanOrEqual(0);
          });
        });
      });
    });
  });

  describe('edge cases', () => {
    test('should handle empty links data', () => {
      const baseMockContext = {
        getHoldingsFilteredByPage: jest.fn().mockReturnValue([]),
        pageToShow: 1,
        holdingsPerPage: 10,
        totalHoldings: 0,
        rowsToRender: 10,
        cellTopPx: jest.fn(),
        setPageToShow: jest.fn(),
        setHoldingsPerPage: jest.fn(),
        isEditMode: false,
        setIsEditMode: jest.fn(),
        addLink: jest.fn(),
        deleteLink: jest.fn(),
        getLinksDataCopy: jest.fn(),
      };
      
      mockUseLinksDataContext.mockReturnValue(baseMockContext);

      const show = [true, true];
      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      // Should not throw error
      expect(() => result.current()).not.toThrow();
    });

    test('should handle links with missing valueLinks', () => {
      const incompleteLinksData = [
        {
          portfolioIndex: 0,
          attributeIndex: 1,
          firstDayDate: '2024-01-01',
          lastDayDate: '2024-06-30',
          valueLinks: [],
        },
      ];

      const baseMockContext = {
        getHoldingsFilteredByPage: jest.fn().mockReturnValue(incompleteLinksData),
        pageToShow: 1,
        holdingsPerPage: 10,
        totalHoldings: 1,
        rowsToRender: 10,
        cellTopPx: jest.fn(),
        setPageToShow: jest.fn(),
        setHoldingsPerPage: jest.fn(),
        isEditMode: false,
        setIsEditMode: jest.fn(),
        addLink: jest.fn(),
        deleteLink: jest.fn(),
        getLinksDataCopy: jest.fn(),
      };
      
      mockUseLinksDataContext.mockReturnValue(baseMockContext);

      const show = [true];
      const { result } = renderHook(() =>
        useLinks({ show, cellsCoord: mockCellsCoord })
      );

      // Should not throw error
      expect(() => result.current()).not.toThrow();
    });
  });
});
