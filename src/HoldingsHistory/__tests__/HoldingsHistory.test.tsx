import { render, screen } from '@testing-library/react';
import HoldingsHistory from '../HoldingsHistory';
import { apiGetLinksData } from '../apiMock';

jest.mock('../apiMock', () => ({
  apiGetLinksData: jest.fn(async () => ({ today: '2024-03-05', data: [] })),
}));

// Shallow mocks for heavy children
jest.mock('../components/MainTable', () => ({
  __esModule: true,
  default: () => <div data-testid="main-table" />,
}));

jest.mock('../components/GlobalModal/GlobalModal', () => ({
  __esModule: true,
  default: () => <div data-testid="global-modal" />,
}));

jest.mock('../components/GlobalMessageOver/MessageOver', () => ({
  __esModule: true,
  default: () => <div data-testid="message-over" />,
}));

describe('HoldingsHistory', () => {
  test('renders null before data is loaded', () => {
    (apiGetLinksData as jest.Mock).mockImplementationOnce(() => new Promise(() => {}));
    render(<HoldingsHistory />);
    
    expect(screen.queryByTestId('main-table')).not.toBeInTheDocument();
    expect(screen.queryByTestId('global-modal')).not.toBeInTheDocument();
    expect(screen.queryByTestId('message-over')).not.toBeInTheDocument();
  });

  test('renders after api data resolves', async () => {
    (apiGetLinksData as jest.Mock).mockImplementationOnce(() => ({ today: '2024-03-05', data: [] }));
    render(<HoldingsHistory />);

    expect(await screen.findByTestId('main-table')).toBeInTheDocument();
    expect(await screen.findByTestId('global-modal')).toBeInTheDocument();
    expect(await screen.findByTestId('message-over')).toBeInTheDocument();
  });
});
