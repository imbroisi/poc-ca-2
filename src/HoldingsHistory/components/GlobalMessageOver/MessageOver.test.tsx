import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';
import MessageOver from './MessageOver';

jest.mock('../../utils/utils', () => ({
  disableAllScrolling: jest.fn(),
  enableAllScrolling: jest.fn(),
}));

// Mock context
jest.mock('../../context/MessageOverContext', () => ({
  useMessageOverContext: jest.fn(),
}));

import { disableAllScrolling, enableAllScrolling } from '../../utils/utils';
import { useMessageOverContext } from '../../context/MessageOverContext';

describe('MessageOver', () => {
  const baseContext = {
    content: 'Hello World',
    isOpen: true,
    opacity: 0.8,
    position: [120, 240] as [number, number],
    confirmButtonText: 'Confirm',
    close: jest.fn(),
    fireConfirmed: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('does not render when isOpen is false', () => {
    (useMessageOverContext as jest.Mock).mockReturnValue({
      ...baseContext,
      isOpen: false,
    });

    const { container } = render(<MessageOver />);
    expect(container.firstChild).toBeNull();
  });

  test('renders with correct content and styles when open', () => {
    (useMessageOverContext as jest.Mock).mockReturnValue(baseContext);

    render(<MessageOver />);

    expect(screen.getByText('Hello World')).toBeInTheDocument();
    const container = screen.getByText('Hello World').closest('.message-over-container') as HTMLElement;
    expect(container).toHaveStyle({ left: '120px' });
    expect(container).toHaveStyle({ top: '240px' });
    expect(container).toHaveStyle({ opacity: 0.8 as any });
  });

  test('adds and removes scroll lock with lifecycle', () => {
    (useMessageOverContext as jest.Mock).mockReturnValue(baseContext);

    const { unmount } = render(<MessageOver />);
    expect(disableAllScrolling).toHaveBeenCalled();

    unmount();
    expect(enableAllScrolling).toHaveBeenCalled();
  });

  test('confirm button calls fireConfirmed and does not bubble', () => {
    const fireConfirmed = jest.fn();
    (useMessageOverContext as jest.Mock).mockReturnValue({
      ...baseContext,
      fireConfirmed,
    });

    render(<MessageOver />);

    fireEvent.click(screen.getByText('Confirm'));
    expect(fireConfirmed).toHaveBeenCalled();
  });

  test('cancel button calls close', () => {
    const close = jest.fn();
    (useMessageOverContext as jest.Mock).mockReturnValue({
      ...baseContext,
      close,
    });

    render(<MessageOver />);

    fireEvent.click(screen.getByText('Cancel'));
    expect(close).toHaveBeenCalled();
  });

  test('click outside calls close', () => {
    const close = jest.fn();
    (useMessageOverContext as jest.Mock).mockReturnValue({
      ...baseContext,
      close,
    });

    render(<MessageOver />);

    // simulate outside click
    fireEvent.mouseDown(document);
    expect(close).toHaveBeenCalled();
  });

  test('hides buttons when confirmButtonText is falsy', () => {
    (useMessageOverContext as jest.Mock).mockReturnValue({
      ...baseContext,
      confirmButtonText: undefined,
    });

    render(<MessageOver />);

    expect(screen.queryByText('Confirm')).toBeNull();
    expect(screen.queryByText('Cancel')).toBeNull();
  });
});
