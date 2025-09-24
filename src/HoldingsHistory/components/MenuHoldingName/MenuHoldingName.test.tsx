import { render, screen, fireEvent } from '@testing-library/react';
import MenuHoldingName, { MenuHoldingNameProps } from './MenuHoldingName';

// Mock FontAwesome icon
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon, size, ...props }: any) => (
    <span data-testid="font-awesome-icon" data-icon={icon?.iconName} data-size={size} {...props}>
      Icon
    </span>
  ),
}));

// Mock the config
jest.mock('../../config', () => ({
  ATTRIBUTE_ITEM_HEIGHT: 28,
  MAIN_BORDER_COLOR: '#c0c0c0',
}));

describe('MenuHoldingName', () => {
  const defaultProps: MenuHoldingNameProps = {
    onClick: jest.fn(),
    rotatedArrow: false,
    holdingName: 'Test Holding',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('rendering', () => {
    test('should render without crashing', () => {
      render(<MenuHoldingName {...defaultProps} />);
      expect(document.querySelector('.fixed-column-cell-content')).toBeInTheDocument();
    });

    test('should render the holding name', () => {
      render(<MenuHoldingName {...defaultProps} />);
      expect(screen.getByText('Test Holding')).toBeInTheDocument();
    });

    test('should render the FontAwesome chevron icon', () => {
      render(<MenuHoldingName {...defaultProps} />);
      expect(screen.getByTestId('font-awesome-icon')).toBeInTheDocument();
    });

    test('should render the menu holding name span', () => {
      render(<MenuHoldingName {...defaultProps} />);
      expect(document.querySelector('.menu-holding-name')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    test('should apply correct height based on config', () => {
      render(<MenuHoldingName {...defaultProps} />);
      const container = document.querySelector('.fixed-column-cell-content') as HTMLElement;
      
      expect(container).toHaveStyle({
        height: '29px', // ATTRIBUTE_ITEM_HEIGHT + 1 = 28 + 1 = 29
        borderColor: '#c0c0c0',
      });
    });

    test('should not rotate arrow when rotatedArrow is false', () => {
      render(<MenuHoldingName {...defaultProps} rotatedArrow={false} />);
      const arrow = document.querySelector('.menu-holding-name') as HTMLElement;
      
      expect(arrow).toHaveStyle({
        transform: 'none',
      });
    });

    test('should rotate arrow when rotatedArrow is true', () => {
      render(<MenuHoldingName {...defaultProps} rotatedArrow={true} />);
      const arrow = document.querySelector('.menu-holding-name') as HTMLElement;
      
      expect(arrow).toHaveStyle({
        transform: 'rotate(90deg)',
      });
    });
  });

  describe('interactions', () => {
    test('should call onClick when arrow is clicked', () => {
      const mockOnClick = jest.fn();
      render(<MenuHoldingName {...defaultProps} onClick={mockOnClick} />);
      
      const arrow = document.querySelector('.menu-holding-name') as HTMLElement;
      fireEvent.click(arrow);
      
      expect(mockOnClick).toHaveBeenCalledTimes(1);
    });

    test('should handle multiple clicks', () => {
      const mockOnClick = jest.fn();
      render(<MenuHoldingName {...defaultProps} onClick={mockOnClick} />);
      
      const arrow = document.querySelector('.menu-holding-name') as HTMLElement;
      fireEvent.click(arrow);
      fireEvent.click(arrow);
      fireEvent.click(arrow);
      
      expect(mockOnClick).toHaveBeenCalledTimes(3);
    });
  });

  describe('props handling', () => {
    test('should display different holding names', () => {
      const { rerender } = render(<MenuHoldingName {...defaultProps} holdingName="First Holding" />);
      expect(screen.getByText('First Holding')).toBeInTheDocument();
      
      rerender(<MenuHoldingName {...defaultProps} holdingName="Second Holding" />);
      expect(screen.getByText('Second Holding')).toBeInTheDocument();
      expect(screen.queryByText('First Holding')).not.toBeInTheDocument();
    });

    test('should handle empty holding name', () => {
      render(<MenuHoldingName {...defaultProps} holdingName="" />);
      expect(document.querySelector('.fixed-column-cell-content')).toBeInTheDocument();
    });

    test('should handle long holding names', () => {
      const longName = 'This is a very long holding name that might overflow the container';
      render(<MenuHoldingName {...defaultProps} holdingName={longName} />);
      expect(screen.getByText(longName)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    test('should have clickable arrow', () => {
      render(<MenuHoldingName {...defaultProps} />);
      const arrow = document.querySelector('.menu-holding-name') as HTMLElement;
      expect(arrow).toBeInTheDocument();
    });

    test('should render visible holding name', () => {
      render(<MenuHoldingName {...defaultProps} />);
      const holdingName = screen.getByText('Test Holding');
      expect(holdingName).toBeVisible();
    });
  });
});
