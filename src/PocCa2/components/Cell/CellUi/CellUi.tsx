import { useMainTableContext } from '../../../context/MainTableContext';
import './CellUi.css';

export interface CellUiProps {
  color: string;
  background: string;
  borderColor: string;
  borderVisible: boolean;
  onClick: () => void;
  content?: string;
}

const CellUi = ({ content = '', color, background, borderColor, borderVisible, onClick }: CellUiProps) => {
  const { mainProps } = useMainTableContext();

  console.log('borderColor', borderColor)

  return (
    <div
      onClick={onClick}
      className="cell-ui"
      style={{
        color,
        background,
        borderColor: borderVisible ? borderColor : 'transparent',
        minWidth: mainProps.model === 'month-day' ? '32px' : '60px',
      }}
    >
      {content}
    </div>
  );
};

export default CellUi;
