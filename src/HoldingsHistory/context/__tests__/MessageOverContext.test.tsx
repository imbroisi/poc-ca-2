import { render, screen, act } from '@testing-library/react';
import React from 'react';
import { MessageOverProvider, useMessageOverContext } from '../MessageOverContext';

describe('MessageOverContext', () => {
  const Wrapper: React.FC<{ children?: React.ReactNode }> = ({ children }) => (
    <MessageOverProvider>{children}</MessageOverProvider>
  );

  const Probe = () => {
    const ctx = useMessageOverContext();
    return (
      <div>
        <div data-testid="open">{String(ctx.isOpen)}</div>
        <div data-testid="opacity">{ctx.opacity}</div>
        <div data-testid="content">{ctx.content ? 'has' : 'none'}</div>
        <div data-testid="pos">{ctx.position.join(',')}</div>
        <button data-testid="do-open" onClick={() => ctx.open(<span>hello</span>)}>open</button>
        <button data-testid="do-close" onClick={() => ctx.close()}>close</button>
        <button data-testid="do-confirm" onClick={() => { ctx.onConfirm(() => {}); ctx.fireConfirmed(); }}>confirm</button>
        <button data-testid="set-pos" onClick={() => ctx.setPosition([10,20])}>pos</button>
        <button data-testid="set-text" onClick={() => ctx.setConfirmButtonText('Delete')}>text</button>
      </div>
    );
  };

  beforeEach(() => {
    jest.useFakeTimers();
  });
  afterEach(() => {
    jest.useRealTimers();
  });

  test('open and close control state and content', () => {
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
  });

  test('position and confirmButtonText setters work', () => {
    render(<Wrapper><Probe /></Wrapper>);
    act(() => {
      screen.getByTestId('set-pos').click();
    });
    expect(screen.getByTestId('pos').textContent).toBe('10,20');

    act(() => {
      screen.getByTestId('set-text').click();
    });
    // Not directly exposed in Probe, but ensure no error thrown
  });

  test('fireConfirmed triggers animation and eventually closes', async () => {
    render(<Wrapper><Probe /></Wrapper>);

    // open
    act(() => {
      screen.getByTestId('do-open').click();
    });
    // wait for re-render reflecting open state
    await Promise.resolve();
    expect(screen.getByTestId('open').textContent).toBe('true');

    // trigger confirm which calls closeWithAnimation
    act(() => {
      screen.getByTestId('do-confirm').click();
      // advance timers to finish animation
      jest.advanceTimersByTime(400);
    });

    expect(screen.getByTestId('open').textContent).toBe('false');
  });

  test('throws when used outside provider', () => {
    const Outside = () => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      expect(() => useMessageOverContext()).toThrow('useModal must be used within a ModalProvider');
      return null;
    };
    render(<Outside />);
  });
});
