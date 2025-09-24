import { render, screen, act } from '@testing-library/react';
import { LinksDataProvider, useLinksDataContext } from '../LinksDataProvider';

jest.mock('../../config', () => ({
  ATTRIBUTE_ITEM_HEIGHT: 28,
  HOLDINGS_PER_PAGE_DEFAULT: 20,
  TOTAL_ATTRIBUTES: 10, // Mock value - represents number of attributes
}));

jest.mock('../DateContext', () => ({
  useDateContext: jest.fn(() => ({
    getNDaysBefore: (date: string, n: number) => {
      const d = new Date(date);
      d.setUTCDate(d.getUTCDate() - n);
      return d.toISOString().spltest('T')[0];
    },
  })),
}));

describe('LinksDataProvider', () => {
  const Wrapper: React.FC<{ data?: any[]; children?: React.ReactNode }> = ({ data = [], children }) => (
    <LinksDataProvider linksDataFromApi={data}>{children}</LinksDataProvider>
  );

  const Probe = () => {
    const ctx = useLinksDataContext();
    return (
      <div>
        <button data-testid="add" onClick={() => ctx.addLink('2024-03-10', '2024-03-05', 1, 0)}>add</button>
        <button data-testid="del" onClick={() => ctx.deleteLink({ portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-03-05', lastDayDate: '2024-03-10', id: 'x' } as any)}>del</button>
        <div data-testid="rows">{ctx.rowsToRender}</div>
        <div data-testid="top">{ctx.cellTopPx(0, 1)}</div>
        <div data-testid="copy">{JSON.stringify(ctx.getLinksDataCopy())}</div>
      </div>
    );
  };

  test('exposes initial copy and computed values', () => {
    render(<Wrapper data={[{ portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-03-01', lastDayDate: '2024-03-05', id: 'a' }]}><Probe /></Wrapper>);

    expect(Number(screen.getByTestId('rows').textContent)).toBeGreaterThan(0);
    expect(Number(screen.getByTestId('top').textContent)).toBeGreaterThan(0);

    const copy = JSON.parse(screen.getByTestId('copy').textContent || '[]');
    expect(copy).toHaveLength(1);
    expect(copy[0].firstDayDate).toBe('2024-03-01');
  });

  test('addLink appends a link', async () => {
    render(<Wrapper data={[]}><Probe /></Wrapper>);

    act(() => {
      screen.getByTestId('add').click();
    });

    const copy = JSON.parse(screen.getByTestId('copy').textContent || '[]');
    expect(copy).toHaveLength(1);
    expect(copy[0]).toEqual({ portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-03-05', lastDayDate: '2024-03-10' });
  });

  test('deleteLink removes link and extends previous link when contiguous', async () => {
    const initial = [
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-03-01', lastDayDate: '2024-03-04', id: 'a' },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-03-05', lastDayDate: '2024-03-08', id: 'b' },
    ];

    render(<Wrapper data={initial}><Probe /></Wrapper>);

    // trigger delete of the second link
    act(() => {
      screen.getByTestId('del').click();
    });

    const copy = JSON.parse(screen.getByTestId('copy').textContent || '[]');
    expect(copy).toHaveLength(1);
    expect(copy[0].firstDayDate).toBe('2024-03-01');
    expect(copy[0].lastDayDate).toBe('2024-03-08');
  });

  test('throws when used outside provider', () => {
    // Suppress console errors for this expected error test
    const originalError = console.error;
    console.error = jest.fn();
    
    const Outside = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      expect(() => useLinksDataContext()).toThrow('useLinksDataContext must be used within a LinksDataProvider');
      return null;
    };
    render(<Outside />);
    
    // Restore console.error
    console.error = originalError;
  });

  test('handles pagination correctly', () => {
    const data = Array.from({ length: 25 }, (_, i) => ({
      portfolioIndex: Math.floor(i / 5),
      attributeIndex: i % 5,
      firstDayDate: '2024-03-01',
      lastDayDate: '2024-03-05',
      id: `link-${i}`
    }));

    const PaginationProbe = () => {
      const ctx = useLinksDataContext();
      return (
        <div>
          <div data-testid="page-data">{JSON.stringify(ctx.getHoldingsFilteredByPage())}</div>
          <div data-testid="current-page">{ctx.pageToShow}</div>
          <div data-testid="per-page">{ctx.holdingsPerPage}</div>
          <button data-testid="next-page" onClick={() => ctx.setPageToShow(2)}>Next</button>
          <button data-testid="change-per-page" onClick={() => ctx.setHoldingsPerPage(10)}>Change Per Page</button>
        </div>
      );
    };

    render(<Wrapper data={data}><PaginationProbe /></Wrapper>);

    // Check initial state
    expect(JSON.parse(screen.getByTestId('page-data').textContent || '[]')).toHaveLength(20);
    expect(screen.getByTestId('current-page').textContent).toBe('1');

    // Test page change
    act(() => {
      screen.getByTestId('next-page').click();
    });
    expect(screen.getByTestId('current-page').textContent).toBe('2');

    // Test holdings per page change
    act(() => {
      screen.getByTestId('change-per-page').click();
    });
    expect(screen.getByTestId('per-page').textContent).toBe('10');
    expect(screen.getByTestId('current-page').textContent).toBe('1'); // Should reset to page 1
  });

  test('handles edit mode state', () => {
    const EditModeProbe = () => {
      const ctx = useLinksDataContext();
      return (
        <div>
          <div data-testid="edit-mode">{String(ctx.isEditMode)}</div>
          <button data-testid="toggle-edit" onClick={() => ctx.setIsEditMode(!ctx.isEditMode)}>Toggle</button>
        </div>
      );
    };

    render(<Wrapper><EditModeProbe /></Wrapper>);

    // Check initial state
    expect(screen.getByTestId('edit-mode').textContent).toBe('true');

    // Toggle edit mode
    act(() => {
      screen.getByTestId('toggle-edit').click();
    });
    expect(screen.getByTestId('edit-mode').textContent).toBe('false');
  });

  test('handles link operations with error cases', () => {
    const data = [
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-03-01', lastDayDate: '2024-03-05', id: 'a' },
      { portfolioIndex: 0, attributeIndex: 1, firstDayDate: '2024-03-06', lastDayDate: '2024-03-10', id: 'b' }
    ];

    const OperationsProbe = () => {
      const ctx = useLinksDataContext();
      return (
        <div>
          <button data-testid="add-link" onClick={() => ctx.addLink('2024-03-15', '2024-03-11', 1, 0)}>Add</button>
          <button data-testid="delete-invalid" onClick={() => ctx.deleteLink({ ...data[0], firstDayDate: '2024-03-20' } as any)}>Delete Invalid</button>
          <div data-testid="links-data">{JSON.stringify(ctx.getLinksDataCopy())}</div>
        </div>
      );
    };

    render(<Wrapper data={data}><OperationsProbe /></Wrapper>);

    // Test adding a new link
    act(() => {
      screen.getByTestId('add-link').click();
    });
    let links = JSON.parse(screen.getByTestId('links-data').textContent || '[]');
    expect(links).toHaveLength(3);
    expect(links[2].firstDayDate).toBe('2024-03-11');

    // Test deleting non-existent link (should not change state)
    act(() => {
      screen.getByTestId('delete-invalid').click();
    });
    links = JSON.parse(screen.getByTestId('links-data').textContent || '[]');
    expect(links).toHaveLength(3);
  });
});
