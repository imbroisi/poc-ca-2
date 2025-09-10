import { render, screen } from '@testing-library/react';
import React from 'react';
import YearsRow from './YearsRow';

jest.mock('../../context/DateContext', () => ({
  useDateContext: jest.fn(),
}));

jest.mock('../../config', () => ({
  CELL_BORDER_COLOR: '#ddd',
  CELL_HEIGHT_PX: 28,
  YEAR_CELL_WIDTH_PX: 120,
}));

import { useDateContext } from '../../context/DateContext';

describe('YearsRow', () => {
  beforeEach(() => {
    (useDateContext as jest.Mock).mockReturnValue({
      firstYearInTableUnit: 2020,
      numberOfYears: 4,
    });
  });

  const renderWithTable = (ui: React.ReactElement) => render(<table><thead><tr>{ui}</tr></thead></table>);

  test('renders correct number of year cells with labels', () => {
    renderWithTable(<YearsRow />);

    const cells = document.querySelectorAll('th.years-row');
    expect(cells).toHaveLength(4);

    const labels = Array.from(cells).map(cell => cell.textContent?.trim());
    expect(labels).toEqual(['2020', '2021', '2022', '2023']);
  });

  test('applies expected styles', () => {
    renderWithTable(<YearsRow />);

    const cells = document.querySelectorAll('th.years-row');
    cells.forEach(cell => {
      expect(cell).toHaveStyle({ height: '28px' });
      expect(cell).toHaveStyle({ borderColor: '#ddd' });
      expect(cell).toHaveStyle({ width: '120px' });
    });
  });
});
