import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

// Mock the HoldingsHistory component since it has complex dependencies
jest.mock('./HoldingsHistory/HoldingsHistory', () => {
  return function MockedHoldingsHistory() {
    return <div data-testid="holdings-history-component">Holdings History Component</div>;
  };
});

describe('App Component', () => {
  test('renders without crashing', () => {
    render(<App />);
    expect(screen.getByTestId('holdings-history-component')).toBeInTheDocument();
  });

  test('renders HoldingsHistory component', () => {
    render(<App />);
    expect(screen.getByText('Holdings History Component')).toBeInTheDocument();
  });

  test('has correct container styling', () => {
    const { container } = render(<App />);
    const appContainer = container.firstChild as HTMLElement;
    
    expect(appContainer).toHaveStyle({
      height: 'calc(100vh)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      border: '4px solid orange',
      boxSizing: 'border-box',
      padding: '50px',
    });
  });
});

