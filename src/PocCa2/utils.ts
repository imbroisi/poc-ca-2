export const numberToStringCoordinate = (num: number): string => {
  let columnString = '';
  while (num >= 0) {
    columnString = String.fromCharCode((num % 26) + 65) + columnString;
    num = Math.floor(num / 26) - 1;
  }
  return columnString;
};

export const stringToNumberCoordinate = (str: string): number => {
  let num = 0;
  for (let i = 0; i < str.length; i++) {
    num = num * 26 + (str.charCodeAt(i) - 65 + 1);
  }
  return num - 1;
};

export const getBoxTopLineColor = (): string => {
  // TODO: implement
  return 'orange';
};
