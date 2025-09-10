import { render, screen, fireEvent, within } from '@testing-library/react';
import Dropdown from './Dropdown';
import React from 'react';

jest.mock('@fortawesome/react-fontawesome', () => ({
  __esModule: true,
  FontAwesomeIcon: () => <span data-testid="fa-icon" />,
}));

describe('Dropdown', () => {
  const label = 'Choose an option';
  const options = ['Apple', 'Banana', 'Cherry'];

  test('renders label and button', () => {
    const onSelect = jest.fn();
    render(<Dropdown label={label} options={options} onSelect={onSelect} />);

    expect(screen.getByText(label)).toBeInTheDocument();
    // Initially no selection text
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  test('selects defaultValue via effect and calls onSelect once', () => {
    const onSelect = jest.fn();
    render(
      <Dropdown
        label={label}
        options={options}
        onSelect={onSelect}
        defaultValue="Banana"
      />
    );

    // Button should show default selection
    expect(screen.getByRole('button')).toHaveTextContent('Banana');
    // onSelect called with default once
    expect(onSelect).toHaveBeenCalledTimes(1);
    expect(onSelect).toHaveBeenCalledWith('Banana');
  });

  test('opens the list on button click and shows options', () => {
    const onSelect = jest.fn();
    render(<Dropdown label={label} options={options} onSelect={onSelect} defaultValue="Banana" />);

    const button = screen.getByRole('button', { name: /Banana/i });
    fireEvent.click(button);

    // Options visible (scope to list to avoid duplicate matches with button text)
    const list = screen.getByRole('list');
    expect(within(list).getByText('Apple')).toBeInTheDocument();
    expect(within(list).getByText('Banana')).toBeInTheDocument();
    expect(within(list).getByText('Cherry')).toBeInTheDocument();
  });

  test('clicking an option calls onSelect and closes list', () => {
    const onSelect = jest.fn();
    render(<Dropdown label={label} options={options} onSelect={onSelect} defaultValue="Banana" />);

    const button = screen.getByRole('button', { name: /Banana/i });
    fireEvent.click(button);
    const list = screen.getByRole('list');
    fireEvent.click(within(list).getByText('Apple'));

    // Second call with Apple (first was defaultValue)
    expect(onSelect).toHaveBeenCalledTimes(2);
    expect(onSelect).toHaveBeenCalledWith('Apple');

    // Button now shows Apple
    expect(screen.getByRole('button')).toHaveTextContent('Apple');

    // List should be closed
    expect(screen.queryByRole('list')).toBeNull();
  });

  test('shows check icon next to selected option', () => {
    const onSelect = jest.fn();
    render(<Dropdown label={label} options={options} onSelect={onSelect} defaultValue="Banana" />);

    const button = screen.getByRole('button', { name: /Banana/i });
    fireEvent.click(button);

    // Banana is selected, should have an icon rendered in its li (query within list)
    const list = screen.getByRole('list');
    const bananaOption = within(list).getByText('Banana').closest('li');
    expect(bananaOption).not.toBeNull();
    if (bananaOption) {
      expect(bananaOption.querySelector('[data-testid="fa-icon"]')).not.toBeNull();
    }
  });

  test('clicking outside closes the dropdown', () => {
    const onSelect = jest.fn();
    render(<Dropdown label={label} options={options} onSelect={onSelect} defaultValue="Banana" />);

    const button = screen.getByRole('button', { name: /Banana/i });
    fireEvent.click(button);

    // Ensure open
    expect(screen.getByText('Apple')).toBeInTheDocument();

    // Click outside
    fireEvent.mouseDown(document);

    // List closed
    expect(screen.queryByText('Apple')).toBeNull();
  });
});
