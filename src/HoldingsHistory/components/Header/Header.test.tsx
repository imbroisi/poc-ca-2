import { render, screen } from '@testing-library/react';
import React from 'react';
import Header from './Header';

jest.mock('../../context/DateContext', () => ({
  useDateContext: jest.fn(),
}));

jest.mock('../YearsRow', () => ({
  __esModule: true,
  default: () => (
    <th data-testid="mock-years-row">YearsRow</th>
  ),
}));

import { useDateContext } from '../../context/DateContext';

describe('Header', () => {
  const base = {
    numberOfYears: 4,
  };

  beforeEach(() => {
    (useDateContext as jest.Mock).mockReturnValue(base);
  });

  const renderWithTable = (ui: React.ReactElement) => {
    return render(<table>{ui}</table>);
  };

  test('renders thead and YearsRow', () => {
    renderWithTable(<Header />);

    // thead exists
    expect(document.querySelector('thead')).toBeInTheDocument();
    // YearsRow rendered once
    expect(screen.getByTestId('mock-years-row')).toBeInTheDocument();
  });

  test('renders correct number of header cells with styles', () => {
    renderWithTable(<Header />);

    const cells = document.querySelectorAll('th.header-cell');
    expect(cells).toHaveLength(base.numberOfYears);

    cells.forEach(cell => {
      expect(cell).toHaveStyle({ borderColor: '#ddd' });
      expect(cell).toHaveStyle({ height: '28px' });
    });
  });
});
