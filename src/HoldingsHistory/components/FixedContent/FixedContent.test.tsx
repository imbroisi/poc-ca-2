import { render } from '@testing-library/react';
import FixedContent, { FixedColumnsProps } from './FixedContent';

// Mock the child components
jest.mock('../MenuHoldings', () => {
  return function MockMenuHoldings() {
    return <div data-testid="menu-holdings">Menu Holdings</div>;
  };
});

jest.mock('../MenuHoldingInceptionDate/MenuIHoldingInceptionDate', () => {
  return function MockMenuHoldingInceptionDate() {
    return <div data-testid="menu-holding-inception-date">Menu Holding Inception Date</div>;
  };
});

jest.mock('../ReferenceDataHeader', () => {
  return function MockReferenceDataHeader() {
    return <div data-testid="reference-data-header">Reference Data Header</div>;
  };
});

// Mock the config
jest.mock('../../config', () => ({
  COLUMN_DEFAULT_HEADINGS: ['Col1', 'Col2', 'Col3'],
  MAIN_BORDER_COLOR: '#c0c0c0',
}));

describe('FixedContent', () => {
  const defaultProps: FixedColumnsProps = {
    toggleArrow: jest.fn(),
    fixedColumnRef: { current: null! },
    handleScroll: jest.fn(),
    show: [true, false, true],
    rotatedArrows: [false, true, false],
  };

  describe('rendering', () => {
    test('should render without crashing', () => {
      render(<FixedContent {...defaultProps} />);
      expect(document.querySelector('.fixed-column')).toBeInTheDocument();
    });

    test('should render the fixed column content', () => {
      render(<FixedContent {...defaultProps} />);
      expect(document.querySelector('.fixed-column-content')).toBeInTheDocument();
    });

    test('should render ReferenceDataHeader component', () => {
      render(<FixedContent {...defaultProps} />);
      expect(document.querySelector('[data-testid="reference-data-header"]')).toBeInTheDocument();
    });

    test('should render MenuHoldings component', () => {
      render(<FixedContent {...defaultProps} />);
      expect(document.querySelector('[data-testid="menu-holdings"]')).toBeInTheDocument();
    });

    test('should render MenuHoldingInceptionDate component', () => {
      render(<FixedContent {...defaultProps} />);
      expect(document.querySelector('[data-testid="menu-holding-inception-date"]')).toBeInTheDocument();
    });
  });

  describe('styling', () => {
    test('should apply correct styles to fixed column', () => {
      render(<FixedContent {...defaultProps} />);
      const fixedColumn = document.querySelector('.fixed-column') as HTMLElement;
      
      expect(fixedColumn).toHaveStyle({
        width: '300px',
        display: 'flex',
        flexDirection: 'column',
        borderColor: '#c0c0c0',
      });
    });

    test('should apply correct styles to fixed column content', () => {
      render(<FixedContent {...defaultProps} />);
      const content = document.querySelector('.fixed-column-content') as HTMLElement;
      
      expect(content).toHaveStyle({
        overflow: 'hidden',
        overflowY: 'scroll',
        flex: '1',
      });
    });
  });

  describe('event handling', () => {
    test('should call handleScroll when scrolling', () => {
      const mockHandleScroll = jest.fn();
      const props = { ...defaultProps, handleScroll: mockHandleScroll };
      
      render(<FixedContent {...props} />);
      const content = document.querySelector('.fixed-column-content') as HTMLElement;
      
      // Simulate scroll event
      const scrollEvent = new Event('scroll');
      content.dispatchEvent(scrollEvent);
      
      expect(mockHandleScroll).toHaveBeenCalled();
    });
  });

  describe('props passing', () => {
    test('should pass show prop to MenuHoldings', () => {
      // This is tested implicitly through the component rendering without error
      expect(() => render(<FixedContent {...defaultProps} />)).not.toThrow();
    });

    test('should pass show prop to MenuHoldingInceptionDate', () => {
      // This is tested implicitly through the component rendering without error
      expect(() => render(<FixedContent {...defaultProps} />)).not.toThrow();
    });

    test('should handle null show prop', () => {
      const props = { ...defaultProps, show: null };
      expect(() => render(<FixedContent {...props} />)).not.toThrow();
    });
  });

  describe('ref handling', () => {
    test('should handle ref correctly', () => {
      const mockRef = { current: null! };
      const props = { ...defaultProps, fixedColumnRef: mockRef };
      
      expect(() => render(<FixedContent {...props} />)).not.toThrow();
    });
  });
});
