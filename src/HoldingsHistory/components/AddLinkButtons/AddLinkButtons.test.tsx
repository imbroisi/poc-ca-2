import { render, screen, fireEvent } from '@testing-library/react';
import AddLinkButtons from './AddLinkButtons';
import { useLinksDataContext } from '../../context/LinksDataProvider';
import { useDateContext } from '../../context/DateContext';
import { useModal } from '../../context/ModalContext';

// Mock the context hooks
jest.mock('../../context/LinksDataProvider', () => ({
  useLinksDataContext: jest.fn(),
}));

jest.mock('../../context/DateContext', () => ({
  useDateContext: jest.fn(),
}));

jest.mock('../../context/ModalContext', () => ({
  useModal: jest.fn(),
}));

describe('AddLinkButtons', () => {
  const mockOnDatePicked = jest.fn();
  const mockOpenModal = jest.fn();
  const mockCloseModal = jest.fn();
  const mockGetNDaysBefore = jest.fn();
  const mockGetMonthName = jest.fn();
  
  const defaultProps = {
    onDatePicked: mockOnDatePicked,
  };

  const mockLinksContext = {
    totalAttributes: 2,
    rowsToRender: 6,
    cellTopPx: jest.fn((row, col) => row * 100 + col * 10),
    isEditMode: true,
  };

  const mockDateContext = {
    todayPositionPx: 1000,
    convertDateToPositionPx: jest.fn((date) => date === '2024-03-01' ? 800 : 900),
    todayMmDdYyyy: '03/25/2024',
    getMonthName: mockGetMonthName,
    getNDaysBefore: mockGetNDaysBefore,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useLinksDataContext as jest.Mock).mockReturnValue({
      ...mockLinksContext,
      getLinksDataCopy: () => [
        { portfolioIndex: 0, attributeIndex: 0, firstDayDate: '2024-03-01' },
        { portfolioIndex: 1, attributeIndex: 1, firstDayDate: '2024-03-15' },
      ],
    });
    (useDateContext as jest.Mock).mockReturnValue(mockDateContext);
    (useModal as jest.Mock).mockReturnValue({ openModal: mockOpenModal, closeModal: mockCloseModal });
    mockGetNDaysBefore.mockReturnValue('2024-03-24');
    mockGetMonthName.mockReturnValue('March');
  });

  test('renders add buttons for each cell', () => {
    render(<table><thead><AddLinkButtons {...defaultProps} /></thead></table>);
    
    const buttons = screen.getAllByRole('button');

    // 2 rows (6/(2+1)) * 2 attributes = 4 buttons
    expect(buttons).toHaveLength(4);
  });

  test('does not open modal when not in edit mode', () => {
    (useLinksDataContext as jest.Mock).mockReturnValue({
      ...mockLinksContext,
      isEditMode: false,
      getLinksDataCopy: () => [
        { portfolioIndex: 0, attributeIndex: 0, firstDayDate: '2024-03-01' },
        { portfolioIndex: 1, attributeIndex: 1, firstDayDate: '2024-03-15' },
      ],
    });

    render(<table><tbody><AddLinkButtons {...defaultProps} /></tbody></table>);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);
    
    expect(mockOpenModal).not.toHaveBeenCalled();
  });

  test('opens modal with correct props when clicking add button', () => {
    render(<table><tbody><AddLinkButtons {...defaultProps} /></tbody></table>);    
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    expect(mockOpenModal).toHaveBeenCalledTimes(1);
    expect(mockGetNDaysBefore).toHaveBeenCalledWith('03/25/2024', 0);
    expect(mockGetMonthName).toHaveBeenCalledWith(2); // March is 3-1
  });

  test('calls onDatePicked with correct params when handling date picked', () => {
    render(<table><tbody><AddLinkButtons {...defaultProps} /></tbody></table>);
    const buttons = screen.getAllByRole('button');
    fireEvent.click(buttons[0]);

    // Get the onConfirm callback from the mock call
    const modalComponent = mockOpenModal.mock.calls[0][0];  
    const onConfirm = modalComponent.props.onConfirm;

    // Simulate confirming date in modal
    onConfirm({ pickedDate: '2024-03-20', cellIndex: 0, cellRowIndex: 0 });

    expect(mockOnDatePicked).toHaveBeenCalledWith('2024-03-24', '2024-03-20', 0, 0);
    expect(mockCloseModal).toHaveBeenCalled();
  });

  test('positions buttons correctly based on link data', () => {
    render(<table><tbody><AddLinkButtons {...defaultProps} /></tbody></table>);
    const buttons = screen.getAllByRole('button');
    
     expect(buttons[0]).toHaveStyle({
       left: '980px'  // todayPositionPx (1000) - 20
     });
  });
});
