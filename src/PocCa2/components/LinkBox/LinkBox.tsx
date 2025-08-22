import { useMainTableContext } from '../../context/MainTableContext';
import { getBoxTopLineColor } from '../../utils';
import './LinkBox.css';

export interface LinkBoxProps {
  startCell?: string;
  endCell?: string;
  onClick: () => void;
}

const LinkBox = ({ startCell, endCell, onClick }: LinkBoxProps) => {
  const { mainProps } = useMainTableContext();

  if (!startCell || !endCell) return null;

  const cellWidthPx = mainProps.model === 'month-day' ? 32 : 100;

  const start = +startCell.split('-')[1];
  const end = +endCell.split('-')[1];
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
