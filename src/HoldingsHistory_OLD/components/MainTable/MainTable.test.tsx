import { render, screen } from '@testing-library/react';
import React from 'react';
import MainTable from './MainTable';

jest.mock('../Table', () => ({
  __esModule: true,
  default: ({ children }: any) => <table data-testid="mock-table">{children}</table>,
}));

jest.mock('../Header', () => ({
  __esModule: true,
  default: () => <thead data-testid="mock-header"><tr><th>H</th></tr></thead>,
}));

jest.mock('../Body', () => ({
  __esModule: true,
  default: () => <tbody data-testid="mock-body"><tr><td>B</td></tr></tbody>,
}));

describe('MainTable', () => {
  test('renders Table with Header and Body', () => {
    render(<MainTable />);

    expect(screen.getByTestId('mock-table')).toBeInTheDocument();
    expect(screen.getByTestId('mock-header')).toBeInTheDocument();
    expect(screen.getByTestId('mock-body')).toBeInTheDocument();
  });
});
