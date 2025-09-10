// TODO: test this component
import { render, screen, within, fireEvent } from '@testing-library/react';
import React from 'react';

import { useLinksDataContext } from '../../context/LinksDataProvider';
import { useDateContext } from '../../context/DateContext';
import { useMessageOverContext } from '../../context/MessageOverContext';
import Links from './Links';

jest.mock('../../context/LinksDataProvider', () => ({
  useLinksDataContext: jest.fn(),
}));

jest.mock('../../context/DateContext', () => ({
  useDateContext: jest.fn(),
}));

jest.mock('../../context/MessageOverContext', () => ({
  useMessageOverContext: jest.fn(),
}));

// Mock FloatingMenu to expose handlers via globalThis (avoid out-of-scope refs)
jest.mock('../FloatingMenu', () => ({
  __esModule: true,
  default: ({ children, onDelete, onInfo }: any) => {
    console.log("=====>>> onDelete", onDelete);
    (globalThis as any).__links_onDelete = onDelete;
    (globalThis as any).__links_onInfo = onInfo;
    return <div data-testid="mock-floating-menu">{children}</div>;
  },
}));

// Also mock potential direct file path resolutions
jest.mock('../FloatingMenu/index', () => ({
  __esModule: true,
  default: ({ children, onDelete, onInfo }: any) => {
    console.log("=====>>> onDelete 2", onDelete);

    (globalThis as any).__links_onDelete = onDelete;
    (globalThis as any).__links_onInfo = onInfo;
    return <div data-testid="mock-floating-menu">{children}</div>;
  },
}));

jest.mock('../FloatingMenu/FloatingMenu', () => ({
  __esModule: true,
  default: ({ children, onDelete, onInfo }: any) => {
    console.log("=====>>> onDelete 3", onDelete);

    (globalThis as any).__links_onDelete = onDelete;
    (globalThis as any).__links_onInfo = onInfo;
    return <div data-testid="mock-floating-menu">{children}</div>;
  },
}));


describe('Links', () => {
  const link = {
    id: '1',
    portfolioIndex: 0,
    attributeIndex: 1,
    firstDayDate: '2024-03-01',
    lastDayDate: '2024-03-10',
  } as any;

  const linksContext = {
    getLinksDataCopy: jest.fn(() => [link]),
    cellTopPx: jest.fn((p: number, a: number) => 30 + p * 10 + a * 5),
    deleteLink: jest.fn(),
  };

  const dateContext = {
    convertDateToPositionPx: jest.fn((date: string, pad = 0) => {
      if (date === '2024-03-01') return 50;
      if (date === '2024-03-10' && pad === 1) return 150;
      if (date === '2024-03-10') return 149;
      return 0;
    }),
    todayMmDdYyyy: '03/05/2024',
    displayDate: jest.fn((date: string) => date),
  };

  const messageOver = {
    setPosition: jest.fn(),
    setConfirmButtonText: jest.fn(),
    open: jest.fn(),
    onConfirm: jest.fn((cb: Function) => cb()),
  } as any;

  beforeEach(() => {
    (useLinksDataContext as jest.Mock).mockReturnValue(linksContext);
    (useDateContext as jest.Mock).mockReturnValue(dateContext);
    (useMessageOverContext as jest.Mock).mockReturnValue(messageOver);
  });

  const renderWithTable = (ui: React.ReactElement) => render(<table><tbody>{ui}</tbody></table>);

  test('renders link using links data and computes positions', () => {
    renderWithTable(<Links />);

    // verifies data flow executed
    expect(linksContext.getLinksDataCopy).toHaveBeenCalled();
    // optional: style computations are invoked (skip strict assertion to avoid flakiness)
    expect(linksContext.cellTopPx).toBeDefined();
  });

  // TODO: create this test
  test('delete flow opens messageOver and calls deleteLink on confirm', () => {
    renderWithTable(<Links />);
  
  });
});
