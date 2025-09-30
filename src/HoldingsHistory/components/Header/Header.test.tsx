import { render, screen } from '@testing-library/react';
import Header from './Header';

// Mock the config constants
jest.mock('../../config', () => ({
  HEADER_HEIGHT: 50,
  MAIN_BORDER_COLOR: '#c0c0c0',
}));

describe('Header', () => {
  describe('rendering', () => {
    test('should render without crashing', () => {
      render(<Header />);
      expect(screen.getByText('Holdings')).toBeInTheDocument();
    });

    test('should render the "Holdings" text', () => {
      render(<Header />);
      expect(screen.getByText('Holdings')).toBeInTheDocument();
    });

    test('should have the correct CSS class', () => {
      render(<Header />);
      expect(document.querySelector('.holdings-history-header')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    test('should apply correct height from config', () => {
      render(<Header />);
      const header = document.querySelector('.holdings-history-header') as HTMLElement;
      
      expect(header).toHaveStyle({
        height: '50px',
      });
    });

    test('should apply correct border color from config', () => {
      render(<Header />);
      const header = document.querySelector('.holdings-history-header') as HTMLElement;
      
      expect(header).toHaveStyle({
        borderColor: '#c0c0c0',
      });
    });
  });

  describe('accessibility', () => {
    test('should render text content that is accessible', () => {
      render(<Header />);
      const headerText = screen.getByText('Holdings');
      expect(headerText).toBeVisible();
    });
  });

  describe('component structure', () => {
    test('should render as a single div element', () => {
      const { container } = render(<Header />);
      expect(container.children).toHaveLength(1);
      expect(container.firstChild).toHaveClass('holdings-history-header');
    });

    test('should contain only text content', () => {
      render(<Header />);
      const header = document.querySelector('.holdings-history-header');
      expect(header).toHaveTextContent('Holdings');
      expect(header?.children).toHaveLength(0); // No child elements, just text
    });
  });
});
