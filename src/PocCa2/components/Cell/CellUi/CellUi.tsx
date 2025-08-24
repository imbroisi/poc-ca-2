import { MAIN_TABLE } from '../../../config';
import { useMainTableContext } from '../../../context/MainTableContext';
import './CellUi.css';

export interface CellUiProps {
  color: string;
  borderVisible: boolean;
  onClick: (e: any) => void;
  content?: string;
  colSpaned?: number;
}

const {
  CELL_MONTH_SPLITED_WIDTH_PX, 
  CELL_DAY_WIDTH_PX, 
  CELL_HEIGHT_PX, 
  CELL_BORDER_COLOR, 
  CELL_BACKGROUND_COLOR 
} = MAIN_TABLE;

const CellUi = ({ content = '', color, borderVisible, onClick, colSpaned = 1 }: CellUiProps) => {
  const { model } = useMainTableContext();

  console.log("34) ===>> colSpaned", colSpaned);

  return (
    <div
      role="button"
      onClick={onClick}
      className="cell-ui"
      style={{
        color,
        background: CELL_BACKGROUND_COLOR,
        borderColor: borderVisible ? CELL_BORDER_COLOR : 'transparent',
        width: model === 'month-day' ? CELL_DAY_WIDTH_PX : CELL_MONTH_SPLITED_WIDTH_PX * colSpaned,
        height: CELL_HEIGHT_PX,
      }}
    >
      {content}
    </div>
  );
};

export default CellUi;
