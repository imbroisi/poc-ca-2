import { render } from '@testing-library/react';
import React from 'react';
import TodayLine from './TodayLine';

jest.mock('../../config', () => ({
  ATTRIBUTE_ITEM_HEIGHT: 28,
  TODAY_LINE_COLOR: '#ff0000',
}));

describe('TodayLine', () => {
  const renderWithTable = (ui: React.ReactElement) => render(<table><tbody>{ui}</tbody></table>);

  test('renders as a table row with a th and the line', () => {
    const { container } = renderWithTable(<TodayLine left={100} rowsToRender={6} />);

    expect(container.querySelector('tr')).not.toBeNull();
    expect(container.querySelector('th')).not.toBeNull();
    expect(container.querySelector('.today-line')).not.toBeNull();
  });

  test('applies correct left and height and CSS var color', () => {
    const { container } = renderWithTable(<TodayLine left={120} rowsToRender={6} />);

    const line = container.querySelector('.today-line') as HTMLElement;
    expect(line).not.toBeNull();

    // left set as number -> inline style reflects px
    expect(line).toHaveStyle({ left: '120px' });
    // height = ATTRIBUTE_ITEM_HEIGHT * (rowsToRender + 1) - 4 = 28 * 7 - 4 = 192
    expect(line).toHaveStyle({ height: '192px' });
    // CSS variable application
    // JSDOM may not compute custom properties, but inline style contains them
    expect(line.getAttribute('style')).toContain('--today-line-color');
  });
});
