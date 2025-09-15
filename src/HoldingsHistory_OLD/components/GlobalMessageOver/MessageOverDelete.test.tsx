import { render, screen } from '@testing-library/react';
import React from 'react';
import MessageOverDelete from './MessageOverDelete';

describe('MessageOverDelete', () => {
  test('renders static labels and date range from linkData', () => {
    const linkData = {
      firstDayDate: '2024-01-10',
      lastDayDate: '2024-03-20',
    };

    render(<MessageOverDelete linkData={linkData} />);

    expect(screen.getByText(/Delete/i)).toBeInTheDocument();
    expect(screen.getByText(/Holding: \(TODO\)/i)).toBeInTheDocument();
    expect(screen.getByText(/Attribute: \(TODO\)/i)).toBeInTheDocument();
    expect(screen.getByText('2024-01-10 - 2024-03-20')).toBeInTheDocument();
  });
});
