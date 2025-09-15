import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FloatingMenu from './FloatingMenu';
import React from 'react';

// Mock MUI Menu and MenuItem to simple elements exposing relevant props
jest.mock('@mui/material/Menu', () => ({
  __esModule: true,
  default: ({ open, onClose, anchorReference, anchorPosition, children }: any) => (
    <div data-testid="mock-menu" data-open={open} data-anchor-ref={anchorReference} data-top={anchorPosition?.top} data-left={anchorPosition?.left}>
      <button data-testid="mock-menu-close" onClick={onClose}>close</button>
      {children}
    </div>
  ),
}));

jest.mock('@mui/material/MenuItem', () => ({
  __esModule: true,
  default: ({ onClick, children, className }: any) => (
    <div data-testid="mock-menu-item" className={className} onClick={onClick}>{children}</div>
  ),
}));

jest.mock('@mui/icons-material/Delete', () => ({
  __esModule: true,
  default: () => <span data-testid="icon-delete" />,
}));

jest.mock('@mui/icons-material/Info', () => ({
  __esModule: true,
  default: () => <span data-testid="icon-info" />,
}));

describe('FloatingMenu', () => {
  const Child = () => <div data-testid="child">Right-click me</div>;

  test('renders children', () => {
    const onDelete = jest.fn();
    const onInfo = jest.fn();
    render(
      <FloatingMenu onDelete={onDelete} onInfo={onInfo}>
        <Child />
      </FloatingMenu>
    );
    expect(screen.getByTestId('child')).toBeInTheDocument();
  });

  test('opens menu on click and positions by mouse coords', async () => {
    const onDelete = jest.fn();
    const onInfo = jest.fn();
    render(
      <FloatingMenu onDelete={onDelete} onInfo={onInfo}>
        <Child />
      </FloatingMenu>
    );

    const childElement = screen.getByTestId('child');
    fireEvent.click(childElement, { clientX: 100, clientY: 200 });

    const menu = screen.getByTestId('mock-menu');
    await waitFor(() => expect(menu).toHaveAttribute('data-open', 'true'));
    // account for +2 and -6 offsets in component
    expect(menu).toHaveAttribute('data-left', (100 + 2).toString());
    expect(menu).toHaveAttribute('data-top', (200 - 6).toString());
  });

  test('clicking Info calls onInfo with coords and closes', async () => {
    const onDelete = jest.fn();
    const onInfo = jest.fn();
    render(
      <FloatingMenu onDelete={onDelete} onInfo={onInfo}>
        <Child />
      </FloatingMenu>
    );

    const childElement = screen.getByTestId('child');
    fireEvent.click(childElement, { clientX: 50, clientY: 60 });

    await waitFor(() => expect(screen.getByTestId('mock-menu')).toHaveAttribute('data-open', 'true'));
    fireEvent.click(screen.getByText('Info'));
    expect(onInfo).toHaveBeenCalledWith([52, 54]);
    await waitFor(() => expect(screen.getByTestId('mock-menu')).toHaveAttribute('data-open', 'false'));
  });

  test('clicking Delete calls onDelete with coords and closes', async () => {
    const onDelete = jest.fn();
    const onInfo = jest.fn();
    render(
      <FloatingMenu onDelete={onDelete} onInfo={onInfo}>
        <Child />
      </FloatingMenu>
    );

    const childElement = screen.getByTestId('child');
    fireEvent.click(childElement, { clientX: 10, clientY: 20 });

    // ensure menu open first
    await waitFor(() => expect(screen.getByTestId('mock-menu')).toHaveAttribute('data-open', 'true'));
    fireEvent.click(screen.getByText('Delete'));

    expect(onDelete).toHaveBeenCalledWith([12, 14]);
    await waitFor(() => expect(screen.getByTestId('mock-menu')).toHaveAttribute('data-open', 'false'));
  });

  test('onClose handler closes the menu', () => {
    const onDelete = jest.fn();
    const onInfo = jest.fn();
    render(
      <FloatingMenu onDelete={onDelete} onInfo={onInfo}>
        <Child />
      </FloatingMenu>
    );

    const childElement = screen.getByTestId('child');
    fireEvent.click(childElement, { clientX: 10, clientY: 20 });

    // click the mock close button inside menu
    fireEvent.click(screen.getByTestId('mock-menu-close'));

    const menu = screen.getByTestId('mock-menu');
    expect(menu).toHaveAttribute('data-open', 'false');
  });
});
