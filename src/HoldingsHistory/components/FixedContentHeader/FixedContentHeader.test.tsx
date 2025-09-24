import { render } from '@testing-library/react';
import FixedContentHeader from './FixedContentHeader';

describe('FixedContentHeader', () => {
  describe('rendering', () => {
    test('should render without crashing', () => {
      render(<FixedContentHeader />);
      expect(document.querySelector('.fixed-column-header')).toBeInTheDocument();
    });

    test('should render three div elements', () => {
      render(<FixedContentHeader />);
      const header = document.querySelector('.fixed-column-header');
      expect(header?.children).toHaveLength(3);
    });

    test('should apply correct styles to div elements', () => {
      render(<FixedContentHeader />);
      const header = document.querySelector('.fixed-column-header');
      const firstDiv = header?.children[0] as HTMLElement;
      const secondDiv = header?.children[1] as HTMLElement;
      const thirdDiv = header?.children[2] as HTMLElement;

      expect(firstDiv).toHaveStyle({
        height: '30px',
        width: '100%',
        borderBottom: '1px solid #ccc',
      });

      expect(secondDiv).toHaveStyle({
        height: '40px',
        width: '100%',
        borderBottom: '1px solid #ccc',
      });

      expect(thirdDiv).toHaveStyle({
        height: '30px',
        width: '100%',
      });
    });
  });

  describe('component structure', () => {
    test('should have correct CSS class', () => {
      const { container } = render(<FixedContentHeader />);
      expect(container.firstChild).toHaveClass('fixed-column-header');
    });

    test('should render as a single container div', () => {
      const { container } = render(<FixedContentHeader />);
      expect(container.children).toHaveLength(1);
    });
  });
});
