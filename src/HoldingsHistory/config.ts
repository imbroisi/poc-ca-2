/* istanbul ignore file */
// export const LINK_HEIGHT_PX = 23;
// export const ATTRIBUTE_ITEM_HEIGHT = LINK_HEIGHT_PX + 3;
export const CELL_BORDER_COLOR = '#ddd';

// TODO: maybe replace by selectable number of years (e.g. selected by the user)
export const NUMBER_OF_YEARS = 3;
export const YEAR_CELL_WIDTH_PX = 466;

export const TODAY_LINE_COLOR = '#3cabc9'; // TODO: primary/aqua-80

export const LINKS_COLORS = [
  '#c1dec1', // TODO: shades/green/20
  '#cdd9e7', // TODO: shades/blue-gray/20
];

export const LINKS_BORDERS_COLORS = [
  '#62aa66', // TODO: primary/green-80
  '#718fe3', // TODO: primary/blue-gray-80
];

export const LINKS_COLORS_DISABLED = [
  '#f9f9f9', // TODO: shades/green/20
  '#f9f9f9', // TODO: shades/blue-gray/20
];

export const LINKS_BORDERS_COLORS_DISABLED = [
  '#dddddd', // TODO: primary/green-80
  '#dddddd', // TODO: primary/blue-gray-80
];

export const MAIN_BORDER_COLOR = '#c0c0c0';

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

// TODO: replace by AM values in iohibStaticAttributes
export const ATTRIBUTES_IDS = {
  'CRM Client': 1,
  'CRM Service': 2,
  'Investing Entity': 3,
  'Holding Contract Type': 4,
  'Tradable': 5,
  'Holding Type': 6,
  'Custody Location': 7,
  'Cash Account': 8,
  'Transfer Account': 9,
  'Service Type': 10,
};

// TODO: check AM values in iohibStaticAttributes
export const ATTRIBUTES_IDS_DISABLED: boolean[] = [];
Array.from(Object.keys(ATTRIBUTES)).forEach((attribute, index) => {
  ATTRIBUTES_IDS_DISABLED[index + 1] = ATTRIBUTES[attribute as keyof typeof ATTRIBUTES] === 'disabled';
});

export const HOLDINGS_PER_PAGE_OPTIONS = [5, 10, 20, 50];
export const HOLDINGS_PER_PAGE_DEFAULT = 10;

export const TOTAL_ATTRIBUTES = Object.keys(ATTRIBUTES).length;
export const ATTRIBUTE_ITEM_HEIGHT = 27;
export const HOLDINGS_PER_PAGE = 20;
// Height of one holding row when expanded: name row + all attribute rows
export const ROW_EXPANDED_HEIGHT = ATTRIBUTE_ITEM_HEIGHT * (TOTAL_ATTRIBUTES + 1);

export const FOOTER_HEIGHT = '60px';
