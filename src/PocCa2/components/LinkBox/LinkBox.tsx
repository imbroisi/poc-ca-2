import { getBoxTopLineColor, stringToNumberCoordinate } from '../../utils';
import './LinkBox.css';

export interface LinkBoxProps {
  startCellString?: string;
  endCellString?: string;
  cellWidthPx: number;
  onClick: () => void;
}

const LinkBox = ({ startCellString, endCellString, cellWidthPx, onClick }: LinkBoxProps) => {
  if (!startCellString || !endCellString) return null;

  const start = stringToNumberCoordinate(startCellString);
  const end = stringToNumberCoordinate(endCellString);
  const widthPx = `${(end - start) * cellWidthPx}px`;

  const backgroundColor = getBoxTopLineColor();

  return (
    <div
      onClick={onClick}
      className="link-box"
      style={{ width: widthPx }}
    >
      <div className="link-box-line" style={{ backgroundColor }} />
      Option 1
    </div>
  );
}

export default LinkBox
