import { render, screen, act } from '@testing-library/react';
import { LinksDataProvider, useLinksDataContext } from '../LinksDataProvider';

jest.mock('../../config', () => ({
  ATTRIBUTE_ITEM_HEIGHT: 28,
  ROWS_BY_PAGE: 20,
}));

jest.mock('../DateContext', () => ({
  useDateContext: jest.fn(() => ({
    getNDaysBefore: (date: string, n: number) => {
      const d = new Date(date);
      d.setUTCDate(d.getUTCDate() - n);
      return d.toISOString().split('T')[0];
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
    const Outside = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      expect(() => useLinksDataContext()).toThrow('useLinksDataContext must be used within a LinksDataProvider');
      return null;
    };
    render(<Outside />);
  });
});
