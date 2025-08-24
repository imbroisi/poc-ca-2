import { useMainTableContext } from '../../context/MainTableContext';
import { getBoxTopLineColor } from '../../utils';
import './LinkBox.css';
import { MAIN_TABLE } from '../../config';

export interface LinkBoxProps {
  startCell?: string;
  endCell?: string;
  onClick: () => void;
}

const {
  CELL_MONTH_WIDTH_PX, 
  CELL_DAY_WIDTH_PX, 
} = MAIN_TABLE;

const LinkBox = ({ startCell, endCell, onClick }: LinkBoxProps) => {
  const { model } = useMainTableContext();

  if (!startCell || !endCell) return null;

  const cellWidthPx = model === 'month-day' ? CELL_DAY_WIDTH_PX : CELL_MONTH_WIDTH_PX;

  const start = +startCell.split('-')[1];
  const end = +endCell.split('-')[1];

  console.log("309) ===>> start", start);


  const widthPx = `${(end - start) * cellWidthPx / 1}px`;

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
