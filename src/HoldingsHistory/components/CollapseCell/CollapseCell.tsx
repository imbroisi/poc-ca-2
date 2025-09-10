import { TreeNodeBase } from "../../types/treeNodeTypes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import './CollapseCell.css';


export interface CollapseCellProps {
  node: TreeNodeBase;
  depth: number;       
  isExpanded: boolean; 
  hasChildren: boolean; 
  onToggle: () => void;
  renderLabel?: (node: TreeNodeBase) => React.ReactNode;
}

const CollapseCell = ({ node, depth, isExpanded, hasChildren = false, onToggle, renderLabel }: CollapseCellProps) => {
  const leftPad = 12 + depth * 16;
  return (
    <div className="collapse-cell-container">
      {hasChildren ? (
        <button
          type="button"
          aria-controls={`row-${node.id}`}
          aria-expanded={isExpanded}
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onToggle(); }
          }}
          className="expand-button"
        >
          <span aria-hidden>{
            <FontAwesomeIcon icon={isExpanded ? faChevronUp : faChevronDown} />
          }
          </span>
        </button>
      ) : (
        <span className="mr-2 inline-block w-6" />
      )}
      <span id={`row-${node.id}`}>
        {renderLabel ? renderLabel(node) : node.label}
      </span>
    </div>
  );
}
export default CollapseCell;
