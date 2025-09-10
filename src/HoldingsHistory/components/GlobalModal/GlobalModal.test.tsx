import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import GlobalModal from './GlobalModal';

jest.mock('@fortawesome/react-fontawesome', () => ({
  __esModule: true,
  FontAwesomeIcon: ({ icon }: any) => <span data-testid="fa-icon">{String(icon)}</span>,
}));

jest.mock('../../context/ModalContext', () => ({
  useModal: jest.fn(),
}));

import { useModal } from '../../context/ModalContext';

describe('GlobalModal', () => {
  const base = {
    isOpen: true,
    closeModal: jest.fn(),
    content: <div data-testid="modal-content">Body</div>,
    title: 'My Title',
    icon: 'my-icon',
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when closed', () => {
    (useModal as jest.Mock).mockReturnValue({ ...base, isOpen: false });
    const { container } = render(<GlobalModal />);
    expect(container.firstChild).toBeNull();
  });

  test('renders content and header when open', () => {
    (useModal as jest.Mock).mockReturnValue(base);
    render(<GlobalModal />);

    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
    expect(screen.getByText('My Title')).toBeInTheDocument();
    expect(screen.getAllByTestId('fa-icon').length).toBeGreaterThan(0);
  });

  test('overlay click closes modal', () => {
    const closeModal = jest.fn();
    (useModal as jest.Mock).mockReturnValue({ ...base, closeModal });

    render(<GlobalModal />);

    // Close via overlay (outer element with class modal-overlay)
    fireEvent.click(screen.getByText('Body').parentElement!.parentElement!);

    expect(closeModal).toHaveBeenCalled();
  });

  test('close button closes modal', () => {
    const closeModal = jest.fn();
    (useModal as jest.Mock).mockReturnValue({ ...base, closeModal });

    render(<GlobalModal />);

    const closeBtn = screen.getByRole('button');
    fireEvent.click(closeBtn);
    expect(closeModal).toHaveBeenCalled();
  });

  test('renders without header when no title and no icon', () => {
    (useModal as jest.Mock).mockReturnValue({ ...base, title: undefined, icon: undefined });

    render(<GlobalModal />);

    expect(screen.queryByText('My Title')).toBeNull();
    // Still renders content
    expect(screen.getByTestId('modal-content')).toBeInTheDocument();
  });
});
