import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import './CollapseCell.css';
import { VisibleLeftRow } from '../../types/expandTypes';


export interface CollapseCellProps {
  row: VisibleLeftRow;
  depth: number;       
  isExpanded: boolean; 
  hasChildren: boolean; 
  onToggle: () => void;
  renderLabel?: (node: any) => React.ReactNode;
}

const CollapseCell = ({ row, depth, isExpanded, hasChildren = false, onToggle, renderLabel }: CollapseCellProps) => {
  // const leftPad = 12 + depth * 16;
  return (
      <td className="collapse-cell-container">
        {hasChildren ? (
          <button
            type="button"
            aria-controls={`row-${row.holdingId}`}
            aria-expanded={isExpanded}
            onClick={onToggle}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); }
            }}
            className="expand-button"
          >
            <span aria-hidden>
              {isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
            </span>
          </button>
        ) : (
          <span className="mr-2 inline-block w-6" />
        )}
        <span id={`row-${row.holdingId}`} className={hasChildren ? "cell-parent" : "cell-child"}>{row.primaryLabel}
        </span>
      </td>
   
  );
}
export default CollapseCell;
