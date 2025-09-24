import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { ModalProvider, useModal } from '../ModalContext';

jest.mock('../../utils/utils', () => ({
  disableAllScrolling: jest.fn(),
  enableAllScrolling: jest.fn(),
}));

describe('ModalContext', () => {
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <ModalProvider>{children}</ModalProvider>
  );

  const Probe = () => {
    const ctx = useModal();
    return (
      <div>
        <div data-testid="open">{String(ctx.isOpen)}</div>
        <div data-testid="content">{ctx.content ? 'has' : 'none'}</div>
        <div data-testid="title">{ctx.title || ''}</div>
        <div data-testid="icon">{String(ctx.icon || '')}</div>
        <button data-testid="do-open" onClick={() => ctx.openModal(<span>hello</span>)}>open</button>
        <button data-testid="do-close" onClick={() => ctx.closeModal()}>close</button>
        <button data-testid="set-title" onClick={() => ctx.handleSetTitle('MyTitle')}>title</button>
        <button data-testid="set-icon" onClick={() => ctx.handleSetIcon('my-icon' as any)}>icon</button>
      </div>
    );
  };

  test('open and close toggles and manages content', () => {
    render(<Wrapper><Probe /></Wrapper>);

    expect(screen.getByTestId('open').textContent).toBe('false');
    expect(screen.getByTestId('content').textContent).toBe('none');

    act(() => {
      screen.getByTestId('do-open').click();
    });
    expect(screen.getByTestId('open').textContent).toBe('true');
    expect(screen.getByTestId('content').textContent).toBe('has');

    act(() => {
      screen.getByTestId('do-close').click();
    });
    expect(screen.getByTestId('open').textContent).toBe('false');
    expect(screen.getByTestId('content').textContent).toBe('none');
  });

  test('title and icon setters', () => {
    render(<Wrapper><Probe /></Wrapper>);

    act(() => {
      screen.getByTestId('set-title').click();
    });
    expect(screen.getByTestId('title').textContent).toBe('MyTitle');

    act(() => {
      screen.getByTestId('set-icon').click();
    });
    expect(screen.getByTestId('icon').textContent).toBe('my-icon');
  });

  test('throws outside provider', () => {
    // Suppress console errors for this expected error test
    const originalError = console.error;
    console.error = jest.fn();
    
    const Outside = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      expect(() => useModal()).toThrow('useModal must be used within a ModalProvider');
      return null;
    };
    render(<Outside />);
    
    // Restore console.error
    console.error = originalError;
  });
});
