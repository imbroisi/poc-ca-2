import { render, screen } from '@testing-library/react';
import ColumnHeading from './ColumnHeading';

describe('ColumnHeading', () => {
  const defaultProps = {
    heading: 'Test Heading',
    enabled: true,
  };

  describe('when enabled is true', () => {
    test('should render the heading text', () => {
      render(<ColumnHeading {...defaultProps} />);
      expect(screen.getByText('Test Heading')).toBeInTheDocument();
    });

    test('should render the column heading container', () => {
      render(<ColumnHeading {...defaultProps} />);
      expect(document.querySelector('.column-heading-container')).toBeInTheDocument();
    });

    test('should render separator when not last column', () => {
      render(<ColumnHeading {...defaultProps} isLast={false} />);
      expect(document.querySelector('.column-separator')).toBeInTheDocument();
    });

    test('should not render separator when is last column', () => {
      render(<ColumnHeading {...defaultProps} isLast={true} />);
      expect(document.querySelector('.column-separator')).not.toBeInTheDocument();
    });

    test('should apply correct styles when not last', () => {
      render(<ColumnHeading {...defaultProps} isLast={false} />);
      const container = document.querySelector('.column-heading-container') as HTMLElement;
      
      expect(container).toHaveStyle({
        paddingLeft: '12px',
        width: '70%',
        paddingRight: '10px',
      });
    });

    test('should apply correct styles when is last', () => {
      render(<ColumnHeading {...defaultProps} isLast={true} />);
      const container = document.querySelector('.column-heading-container') as HTMLElement;
      
      expect(container).toHaveStyle({
        paddingLeft: '0px',
        width: 'unset',
        paddingRight: '12px',
      });
    });
  });

  describe('when enabled is false', () => {
    test('should not render anything', () => {
      render(<ColumnHeading {...defaultProps} enabled={false} />);
      expect(screen.queryByText('Test Heading')).not.toBeInTheDocument();
      expect(document.querySelector('.column-heading-container')).not.toBeInTheDocument();
      expect(document.querySelector('.column-separator')).not.toBeInTheDocument();
    });

    test('should return null', () => {
      const { container } = render(<ColumnHeading {...defaultProps} enabled={false} />);
      expect(container.firstChild).toBeNull();
    });
  });

  describe('default props', () => {
    test('should default isLast to false', () => {
      render(<ColumnHeading heading="Test" enabled={true} />);
      expect(document.querySelector('.column-separator')).toBeInTheDocument();
    });
  });

  describe('edge cases', () => {
    test('should handle empty heading string', () => {
      render(<ColumnHeading heading="" enabled={true} />);
      expect(document.querySelector('.column-heading-container')).toBeInTheDocument();
      // Empty string renders but creates empty content
      const container = document.querySelector('.column-heading-container');
      expect(container).toHaveTextContent('');
    });

    test('should handle long heading text', () => {
      const longHeading = 'This is a very long heading text that might overflow the container';
      render(<ColumnHeading heading={longHeading} enabled={true} />);
      expect(screen.getByText(longHeading)).toBeInTheDocument();
    });

    test('should handle special characters in heading', () => {
      const specialHeading = 'Heading with @#$% special chars & symbols';
      render(<ColumnHeading heading={specialHeading} enabled={true} />);
      expect(screen.getByText(specialHeading)).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    test('should render heading text as accessible content', () => {
      render(<ColumnHeading {...defaultProps} />);
      const headingElement = screen.getByText('Test Heading');
      expect(headingElement).toBeVisible();
    });
  });
});
