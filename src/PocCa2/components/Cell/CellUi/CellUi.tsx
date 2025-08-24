import { MAIN_TABLE } from '../../../config';
import { useMainTableContext } from '../../../context/MainTableContext';
import './CellUi.css';

export interface CellUiProps {
  color: string;
  borderVisible: boolean;
  onClick: (e: any) => void;
  content?: string;
}

const {
  CELL_MONTH_WIDTH_PX, 
  CELL_DAY_WIDTH_PX, 
  CELL_HEIGHT_PX, 
  CELL_BORDER_COLOR, 
  CELL_BACKGROUND_COLOR 
} = MAIN_TABLE;

const CellUi = ({ content = '', color, borderVisible, onClick }: CellUiProps) => {
  const { model } = useMainTableContext();

  return (
    <div
      role="button"
      onClick={onClick}
      className="cell-ui"
      style={{
        color,
        background: CELL_BACKGROUND_COLOR,
        borderColor: borderVisible ? CELL_BORDER_COLOR : 'transparent',
        minWidth: model === 'month-day' ? CELL_DAY_WIDTH_PX : CELL_MONTH_WIDTH_PX,
        height: CELL_HEIGHT_PX,
      }}
    >
      {content}
    </div>
  );
};

export default CellUi;
