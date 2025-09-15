import { render, screen, fireEvent } from '@testing-library/react';
import AddValueLinkModal from './AddValueLinkModal';
import { useModal } from '../../context/ModalContext';
import { useDateContext } from '../../context/DateContext';

// Mock the context hooks and components
jest.mock('../../context/ModalContext', () => ({
  useModal: jest.fn(),
}));

const mockMonthNameToIndex = jest.fn((month: string) => {
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  return months.findIndex(m => m === month);
});

jest.mock('../../context/DateContext', () => ({
  useDateContext: () => ({
    monthNameToIndex: mockMonthNameToIndex
  })
}));

jest.mock('../Calendar/Calendar', () => ({
  __esModule: true,
  default: ({ onSelect }: { onSelect: (date: string) => void }) => (
    <div data-testid="mock-calendar">
      <button onClick={() => onSelect('2024-03-20')}>20</button>
      <button onClick={() => onSelect('2024-03-25')}>25</button>
    </div>
  ),
}));

describe('AddValueLinkModal', () => {
  const mockCloseModal = jest.fn();
  const mockOnConfirm = jest.fn();
  
  const defaultProps = {
    year: 2024,
    month: 'March',
    day: 25,
    cellIndex: 1,
    cellRowIndex: 2,
    onConfirm: mockOnConfirm,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useModal as jest.Mock).mockReturnValue({ closeModal: mockCloseModal });
  });

  test('renders modal with correct title and date', () => {
    render(<AddValueLinkModal {...defaultProps} />);
    
    expect(screen.getByText('New Value Link')).toBeInTheDocument();
    expect(screen.getByText('Effective Date: March 25')).toBeInTheDocument();
  });

  test('shows calendar when showCalendar prop is true', () => {
    render(<AddValueLinkModal {...defaultProps} showCalendar />);
    
    expect(screen.queryByText('Effective Date: March 25')).not.toBeInTheDocument();
    expect(screen.getByTestId('mock-calendar')).toBeInTheDocument();
  });

  test('confirm button is initially disabled', () => {
    render(<AddValueLinkModal {...defaultProps} />);
    
    const confirmButton = screen.getByRole('button', { name: /confirm not selected/i });
    expect(confirmButton).toBeDisabled();
  });

  test('clicking cancel button calls closeModal', () => {
    render(<AddValueLinkModal {...defaultProps} />);
    
    const cancelButton = screen.getByRole('button', { name: /cancel/i });
    fireEvent.click(cancelButton);
    
    expect(mockCloseModal).toHaveBeenCalled();
  });

  test('selecting a date enables confirm button and calls onConfirm with correct params', () => {
    render(<AddValueLinkModal {...defaultProps} showCalendar />);
    
    // Click on a date in the calendar
    const dateButton = screen.getByRole('button', { name: /20/i });
    fireEvent.click(dateButton);
    
    // Confirm button should be enabled
    const confirmButton = screen.getByRole('button', { name: /confirm selected/i });
    expect(confirmButton).toBeEnabled();
    
    // Click confirm and check params
    fireEvent.click(confirmButton);
    expect(mockOnConfirm).toHaveBeenCalledWith({
      cellIndex: 1,
      cellRowIndex: 2,
      pickedDate: '2024-03-20'
    });
  });

  test('monthNameToIndex converts month names correctly', () => {
    render(<AddValueLinkModal {...defaultProps} month="January" />);
    expect(screen.getByText('Effective Date: January 25')).toBeInTheDocument();
    
    render(<AddValueLinkModal {...defaultProps} month="December" />);
    expect(screen.getByText('Effective Date: December 25')).toBeInTheDocument();
  });

  test('handles partial month names', () => {
    render(<AddValueLinkModal {...defaultProps} month="Jan" />);
    expect(screen.getByText('Effective Date: Jan 25')).toBeInTheDocument();
    
    render(<AddValueLinkModal {...defaultProps} month="Dec" />);
    expect(screen.getByText('Effective Date: Dec 25')).toBeInTheDocument();
  });
});
