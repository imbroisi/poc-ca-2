import { MAIN_TABLE } from '../../../config';
import { useMainTableContext } from '../../../context/MainTableContext';
import './CellUi.css';

export interface CellUiProps {
  color: string;
  borderVisible: boolean;
  onClick: (e: any) => void;
  content?: string;
  colSpaned?: number;
  isHeader?: boolean;
}

const {
  CELL_MONTH_SPLITED_WIDTH_PX, 
  CELL_DAY_WIDTH_PX, 
  CELL_HEIGHT_PX, 
  CELL_BORDER_COLOR, 
  CELL_BACKGROUND_COLOR 
} = MAIN_TABLE;

const CellUi = ({ content = '', color, onClick, borderVisible, colSpaned = 1, isHeader = false }: CellUiProps) => {
  const { model } = useMainTableContext();


  // const minWidthIsHeader = isHeader ? CELL_MONTH_SPLITED_WIDTH_PX * colSpaned : '100%';
  const minWidthIsHeader = (CELL_MONTH_SPLITED_WIDTH_PX) * colSpaned;

  // console.log("1) ===>> colSpaned minWidthIsHeader", colSpaned, minWidthIsHeader);

  return (
    <div
      role="button"
      onClick={onClick}
      className="cell-ui"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color,
        boxSizing: 'border-box',
        background: CELL_BACKGROUND_COLOR,
        borderColor: CELL_BORDER_COLOR,
        
        borderLeftColor: borderVisible ? CELL_BORDER_COLOR : 'transparent',
        // borderLeftColor: borderVisible ? 'orange' : CELL_BORDER_COLOR,

        minWidth: model === 'month-day' ? CELL_DAY_WIDTH_PX : minWidthIsHeader,
        // maxWidth: model === 'month-day' ? CELL_DAY_WIDTH_PX : minWidthIsHeader,
        width: '100%',
        height: CELL_HEIGHT_PX,
      }}
    >
      {content}
    </div>
  );
};

export default CellUi;
