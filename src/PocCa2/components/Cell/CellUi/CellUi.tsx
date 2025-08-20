import './CellUi.css';

export interface CellUiProps {
  color: string;
  background: string;
  borderColor: string;
  borderVisible: boolean;
  onClick: () => void;
}

const CellUi = ({ color, background, borderColor, borderVisible, onClick }: CellUiProps) => {
  return (
    <div
      onClick={onClick}
      className="cell-ui"
      style={{
        color,
        background,
        borderColor: borderVisible ? borderColor : 'transparent',
      }}
    />
  );
};

export default CellUi;
