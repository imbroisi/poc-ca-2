import { render } from '@testing-library/react';
import ReferenceDataHeader from './ReferenceDataHeader';

// Mock ColumnHeading component
jest.mock('../ColumnHeading', () => {
  return function MockColumnHeading({ heading, enabled, isLast }: any) {
    return (
      <div 
        data-testid="column-heading" 
        data-heading={heading} 
        data-enabled={enabled}
        data-is-last={isLast}
      >
        {enabled ? heading : null}
      </div>
    );
  };
});

// Mock the config
jest.mock('../../config', () => ({
  MAIN_BORDER_COLOR: '#c0c0c0',
}));

describe('ReferenceDataHeader', () => {
  const defaultProps = {
    columnHeadings: [
      { heading: 'Column 1', enabled: true },
      { heading: 'Column 2', enabled: true },
      { heading: 'Column 3', enabled: false },
    ],
  };

  describe('rendering', () => {
    test('should render without crashing', () => {
      render(<ReferenceDataHeader {...defaultProps} />);
      expect(document.querySelector('.reference-data-header-container')).toBeInTheDocument();
    });

    test('should render the reference data row', () => {
      render(<ReferenceDataHeader {...defaultProps} />);
      expect(document.querySelector('.reference-data-row')).toBeInTheDocument();
    });

    test('should render ColumnHeading for each column heading', () => {
      render(<ReferenceDataHeader {...defaultProps} />);
      const columnHeadings = document.querySelectorAll('[data-testid="column-heading"]');
      expect(columnHeadings).toHaveLength(3);
    });

    test('should pass correct props to ColumnHeading components', () => {
      render(<ReferenceDataHeader {...defaultProps} />);
      const columnHeadings = document.querySelectorAll('[data-testid="column-heading"]');
      
      expect(columnHeadings[0]).toHaveAttribute('data-heading', 'Column 1');
      expect(columnHeadings[0]).toHaveAttribute('data-enabled', 'true');
      expect(columnHeadings[0]).toHaveAttribute('data-is-last', 'false');
      
      expect(columnHeadings[1]).toHaveAttribute('data-heading', 'Column 2');
      expect(columnHeadings[1]).toHaveAttribute('data-enabled', 'true');
      expect(columnHeadings[1]).toHaveAttribute('data-is-last', 'false');
      
      expect(columnHeadings[2]).toHaveAttribute('data-heading', 'Column 3');
      expect(columnHeadings[2]).toHaveAttribute('data-enabled', 'false');
      expect(columnHeadings[2]).toHaveAttribute('data-is-last', 'true');
    });
  });

  describe('styling', () => {
    test('should apply correct border styles', () => {
      render(<ReferenceDataHeader {...defaultProps} />);
      const headerContainer = document.querySelector('.reference-data-header-container') as HTMLElement;
      const dataRow = document.querySelector('.reference-data-row') as HTMLElement;
      
      expect(headerContainer).toHaveStyle({
        borderBottom: '1px solid #c0c0c0',
      });
      
      expect(dataRow).toHaveStyle({
        borderBottom: '1px solid #c0c0c0',
      });
    });
  });

  describe('edge cases', () => {
    test('should handle empty columnHeadings array', () => {
      render(<ReferenceDataHeader columnHeadings={[]} />);
      const columnHeadings = document.querySelectorAll('[data-testid="column-heading"]');
      expect(columnHeadings).toHaveLength(0);
    });

    test('should handle single column heading', () => {
      const singleColumnProps = {
        columnHeadings: [{ heading: 'Single Column', enabled: true }],
      };
      
      render(<ReferenceDataHeader {...singleColumnProps} />);
      const columnHeadings = document.querySelectorAll('[data-testid="column-heading"]');
      expect(columnHeadings).toHaveLength(1);
      expect(columnHeadings[0]).toHaveAttribute('data-is-last', 'true');
    });

    test('should handle all disabled columns', () => {
      const disabledProps = {
        columnHeadings: [
          { heading: 'Column 1', enabled: false },
          { heading: 'Column 2', enabled: false },
        ],
      };
      
      render(<ReferenceDataHeader {...disabledProps} />);
      const columnHeadings = document.querySelectorAll('[data-testid="column-heading"]');
      columnHeadings.forEach(heading => {
        expect(heading).toHaveAttribute('data-enabled', 'false');
      });
    });

    test('should handle columnHeadings with special characters', () => {
      const specialProps = {
        columnHeadings: [
          { heading: 'Column & Special Chars #1', enabled: true },
          { heading: 'Column with "quotes"', enabled: true },
        ],
      };
      
      render(<ReferenceDataHeader {...specialProps} />);
      const columnHeadings = document.querySelectorAll('[data-testid="column-heading"]');
      expect(columnHeadings[0]).toHaveAttribute('data-heading', 'Column & Special Chars #1');
      expect(columnHeadings[1]).toHaveAttribute('data-heading', 'Column with "quotes"');
    });
  });

  describe('component structure', () => {
    test('should render as a React fragment', () => {
      const { container } = render(<ReferenceDataHeader {...defaultProps} />);
      // React fragments don't create wrapper elements
      expect(container.children).toHaveLength(2); // header-container and data-row
    });

    test('should have correct CSS classes', () => {
      render(<ReferenceDataHeader {...defaultProps} />);
      expect(document.querySelector('.reference-data-header-container')).toBeInTheDocument();
      expect(document.querySelector('.reference-data-row')).toBeInTheDocument();
    });
  });

  describe('isLast prop calculation', () => {
    test('should correctly identify the last column', () => {
      render(<ReferenceDataHeader {...defaultProps} />);
      const columnHeadings = document.querySelectorAll('[data-testid="column-heading"]');
      
      expect(columnHeadings[0]).toHaveAttribute('data-is-last', 'false');
      expect(columnHeadings[1]).toHaveAttribute('data-is-last', 'false');
      expect(columnHeadings[2]).toHaveAttribute('data-is-last', 'true');
    });
  });
});
