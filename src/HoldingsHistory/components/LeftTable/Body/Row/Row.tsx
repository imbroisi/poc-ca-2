import CollapseCell from '../../../CollapseCell';
import { HoldingId, VisibleLeftRow } from '../../../../types/expandTypes';
import "./Row.css";

interface RowProps {
  row: VisibleLeftRow,
  toggleHolding: (id: HoldingId) => void,
  expanded: ReadonlySet<HoldingId>,
}

const Row = ({ row, toggleHolding, expanded }: RowProps) => {
  const isHolding = row.kind === "holding";

  if (isHolding) {
    return (
      <tr className={`tl-row-holding ${!expanded.has(row.holdingId) ? 'collapsed' : ''}`}>
        <CollapseCell
          row={row}
          depth={0}
          isExpanded={expanded.has(row.holdingId)}
          hasChildren={row.hasChildren}
          onToggle={() => toggleHolding(row.holdingId)}
        />
        <td className="tl-cell-date">
          <span className="tl-cell-pair__secondary">{row.secondaryLabel}</span>
        </td>
      </tr>
    );
  }

  // attribute row
  return (
    <tr className="tl-row">
      <td className="tl-cell">
        <div className="tl-cell-pair tl-cell-pair--child">
          <span className="tl-cell-pair__primary tl-cell-indent">{row.primaryLabel}</span>
        </div>
      </td>
    </tr>

  );
};

export default Row;