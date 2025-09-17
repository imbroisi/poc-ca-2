/* istanbul ignore file */
// export const LINK_HEIGHT_PX = 23;
// export const ATTRIBUTE_ITEM_HEIGHT = LINK_HEIGHT_PX + 3;
export const CELL_BORDER_COLOR = '#ddd';

// TODO: maybe replace by selectable number of years (e.g. selected by the user)
export const NUMBER_OF_YEARS = 3;
export const YEAR_CELL_WIDTH_PX = 466;

// TODO: review this methode when definition on how the pagination will be implemented (because of collase/expand sections)
export const ROWS_BY_PAGE = 30;

export const TODAY_LINE_COLOR = '#3cabc9'; // TODO: primary/aqua-80

export const LINKS_COLORS = [
  '#c1dec1', // TODO: shades/green/20
  '#cdd9e7', // TODO: shades/blue-gray/20
];

export const LINKS_BORDERS_COLORS = [
  '#62aa66', // TODO: primary/green-80
  '#718fe3', // TODO: primary/blue-gray-80
];

export const ATTRIBUTES = {
  'CRM Client': 'enabled',
  'CRM Service': 'enabled',
  'Investing Entity': 'enabled',
  'Holding Contract Type': 'enabled',
  'Tradable': 'enabled',
  'Holding Type': 'enabled',
  'Custody Location': 'disabled',
  'Cash Account': 'disabled',
  'Transfer Account': 'disabled',
  'Service Type': 'disabled',
};

export const TOTAL_ATTRIBUTES = Object.keys(ATTRIBUTES).length;
export const ATTRIBUTE_ITEM_HEIGHT = 27;
export const HOLDINGS_PER_PAGE = 20;
