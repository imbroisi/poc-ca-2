import { render, screen, fireEvent } from '@testing-library/react';
import FilterAttributes from './FilterAttributes';
import { useAttributeSelection } from '../../context/AttributeSelecionContext';

// Mock the context
jest.mock('../../context/AttributeSelecionContext');

// Mock the config
jest.mock('../../config', () => ({
  ATTRIBUTES: {
    'CRM Client': 'enabled',
    'CRM Service': 'enabled',
    'Investing Entity': 'enabled',
    'Holding Contract Type': 'enabled',
  },
}));

const mockUseAttributeSelection = useAttributeSelection as jest.MockedFunction<typeof useAttributeSelection>;

describe('FilterAttributes', () => {
  const mockSetCheckedAttributes = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    
    mockUseAttributeSelection.mockReturnValue({
      checkedAttributes: [true, false, true, false],
      setCheckedAttributes: mockSetCheckedAttributes,
    });
  });

  describe('rendering', () => {
    test('should render without crashing', () => {
      render(<FilterAttributes />);
      expect(screen.getByText('Attributes')).toBeInTheDocument();
    });

    test('should render the title "Attributes"', () => {
      render(<FilterAttributes />);
      const title = screen.getByText('Attributes');
      expect(title).toBeInTheDocument();
      expect(title).toHaveStyle({ textTransform: 'uppercase' });
    });

    test('should render "Clear Selected Items" button', () => {
      render(<FilterAttributes />);
      expect(screen.getByText('Clear Selected Items')).toBeInTheDocument();
    });

    test('should render all attributes from config', () => {
      render(<FilterAttributes />);
      expect(screen.getByText('CRM Client')).toBeInTheDocument();
      expect(screen.getByText('CRM Service')).toBeInTheDocument();
      expect(screen.getByText('Investing Entity')).toBeInTheDocument();
      expect(screen.getByText('Holding Contract Type')).toBeInTheDocument();
    });

    test('should render checkboxes for each attribute', () => {
      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      expect(checkboxes).toHaveLength(4); // 4 attributes in mock config
    });
  });

  describe('checkbox states', () => {
    test('should reflect the current checked state from context', () => {
      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      expect(checkboxes[0]).toBeChecked(); // true
      expect(checkboxes[1]).not.toBeChecked(); // false
      expect(checkboxes[2]).toBeChecked(); // true
      expect(checkboxes[3]).not.toBeChecked(); // false
    });

    test('should handle all unchecked state', () => {
      mockUseAttributeSelection.mockReturnValue({
        checkedAttributes: [false, false, false, false],
        setCheckedAttributes: mockSetCheckedAttributes,
      });

      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked();
      });
    });

    test('should handle all checked state', () => {
      mockUseAttributeSelection.mockReturnValue({
        checkedAttributes: [true, true, true, true],
        setCheckedAttributes: mockSetCheckedAttributes,
      });

      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      checkboxes.forEach(checkbox => {
        expect(checkbox).toBeChecked();
      });
    });
  });

  describe('interactions', () => {
    test('should call setCheckedAttributes when checkbox is clicked', () => {
      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      fireEvent.click(checkboxes[0]);
      
      expect(mockSetCheckedAttributes).toHaveBeenCalledWith([false, false, true, false]);
    });

    test('should toggle unchecked checkbox to checked', () => {
      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      fireEvent.click(checkboxes[1]); // Was false, should become true
      
      expect(mockSetCheckedAttributes).toHaveBeenCalledWith([true, true, true, false]);
    });

    test('should call setCheckedAttributes with empty array when "Clear Selected Items" is clicked', () => {
      render(<FilterAttributes />);
      const clearButton = screen.getByText('Clear Selected Items');
      
      fireEvent.click(clearButton);
      
      expect(mockSetCheckedAttributes).toHaveBeenCalledWith([]);
    });

    test('should handle multiple checkbox clicks', () => {
      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      fireEvent.click(checkboxes[0]); // Toggle first
      fireEvent.click(checkboxes[3]); // Toggle fourth
      
      expect(mockSetCheckedAttributes).toHaveBeenCalledTimes(2);
      expect(mockSetCheckedAttributes).toHaveBeenNthCalledWith(1, [false, false, true, false]);
      expect(mockSetCheckedAttributes).toHaveBeenNthCalledWith(2, [true, false, true, true]);
    });
  });

  describe('styling', () => {
    test('should apply correct styles to main container', () => {
      render(<FilterAttributes />);
      const container = screen.getByText('Attributes').parentElement;
      
      expect(container).toHaveStyle({
        padding: '6px',
        fontSize: '10px',
        fontWeight: '400',
      });
    });

    test('should apply correct styles to clear button', () => {
      render(<FilterAttributes />);
      const clearButton = screen.getByText('Clear Selected Items');
      
      expect(clearButton).toHaveStyle({
        marginTop: '10px',
        marginBottom: '10px',
        color: '#3cabc9',
        cursor: 'pointer',
      });
    });

    test('should apply correct styles to attribute items', () => {
      render(<FilterAttributes />);
      const firstAttributeContainer = screen.getByText('CRM Client').parentElement;
      
      expect(firstAttributeContainer).toHaveStyle({
        marginTop: '4px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
      });
    });

    test('should apply correct styles to attribute labels', () => {
      render(<FilterAttributes />);
      const attributeLabel = screen.getByText('CRM Client');
      
      expect(attributeLabel).toHaveStyle({
        fontSize: '12px',
        fontWeight: '500',
        marginLeft: '2px',
      });
    });
  });

  describe('accessibility', () => {
    test('should have clickable clear button', () => {
      render(<FilterAttributes />);
      const clearButton = screen.getByRole('button');
      expect(clearButton).toBeInTheDocument();
      expect(clearButton).toHaveTextContent('Clear Selected Items');
    });

    test('should have accessible checkboxes', () => {
      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      checkboxes.forEach(checkbox => {
        expect(checkbox).toBeVisible();
        expect(checkbox).toHaveAttribute('type', 'checkbox');
      });
    });

    test('should have clickable attribute containers', () => {
      render(<FilterAttributes />);
      const attributeContainers = screen.getAllByText(/CRM|Investing|Holding/).map(el => el.parentElement);
      
      attributeContainers.forEach(container => {
        expect(container).toHaveStyle({ cursor: 'pointer' });
      });
    });
  });

  describe('edge cases', () => {
    test('should handle empty checkedAttributes array', () => {
      mockUseAttributeSelection.mockReturnValue({
        checkedAttributes: [],
        setCheckedAttributes: mockSetCheckedAttributes,
      });

      render(<FilterAttributes />);
      const checkboxes = screen.getAllByRole('checkbox');
      
      checkboxes.forEach(checkbox => {
        expect(checkbox).not.toBeChecked();
      });
    });

    test('should handle checkedAttributes array longer than attributes', () => {
      mockUseAttributeSelection.mockReturnValue({
        checkedAttributes: [true, false, true, false, true, true], // More items than attributes
        setCheckedAttributes: mockSetCheckedAttributes,
      });

      expect(() => render(<FilterAttributes />)).not.toThrow();
    });
  });
});
