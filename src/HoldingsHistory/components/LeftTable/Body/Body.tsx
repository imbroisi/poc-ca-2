import React, { useMemo, useCallback } from "react";
import CollapseCell from "../../CollapseCell";
import { useExpandedHoldings } from "../../../context/ExpandContext";
import { flattenLeftRowsForHoldings } from "../../../utils/flattenLeftRowsForHoldings";
import "../LeftTable.css";
import { Holding, HoldingId, VisibleLeftRow } from "../../../types/expandTypes";
// If you share a constant height with the Body table, import and use it:
import { CELL_HEIGHT_PX } from '../../../config';

interface HoverState {
  columnIndex: number | null;
  rowIndex: number | null;
}

export interface LeftTableProps {
  holdings?: Holding[];
  hoverState?: HoverState;
  // legacy props kept for compatibility; not used here
  onCheckboxChange?: (rowIndex: number, isChecked: boolean) => void;
  rowsSelected?: boolean[];
  editMode?: boolean;
  resetCheckedRows?: () => void;
  baseRowIndexOffset?: number; // default 2
  /** Optional slots for filters (kept empty by default as requested) */
  nameFilterSlot?: React.ReactNode;
  dateFilterSlot?: React.ReactNode;
}

const Body: React.FC<LeftTableProps> = ({
  holdings = [],
  // hoverState, // you can wire this back if needed for row hover states
  // onCheckboxChange,
  // rowsSelected,
  // editMode,
  // resetCheckedRows,
  baseRowIndexOffset = 2,
  nameFilterSlot,
  dateFilterSlot,
}) => {
  const { state, toggleHolding } = useExpandedHoldings();

  const flatRows = useMemo(
    () => flattenLeftRowsForHoldings(holdings, state.expanded),
    [holdings, state.expanded]
  );

  const onToggleHolding = useCallback(
    (holdingId: HoldingId) => toggleHolding(holdingId),
    [toggleHolding]
  );

  let attributeRowCounter = 0; // maps visual attribute row index -> global index

  const renderNameCell = (row: any) => {
    const isHolding = row.kind === "holding";

    if (isHolding) {
      return (
        <CollapseCell
          node={{ id: row.holdingId, label: String(row.primaryLabel) }}
          depth={0}
          isExpanded={state.expanded.has(row.holdingId)}
          hasChildren={row.hasChildren}
          onToggle={() => onToggleHolding(row.holdingId)}
          renderLabel={() => (
            <div className="tl-cell-pair">
              <span className="tl-cell-pair__primary">{row.primaryLabel}</span>
              <span className="tl-cell-pair__secondary">{row.secondaryLabel}</span>
            </div>
          )}
        />
      );
    }

    // attribute row
    return (
      <div className="tl-cell-pair tl-cell-pair--child">
        <span className="tl-cell-pair__primary tl-cell-indent">{row.primaryLabel}</span>
      </div>
    );
  };

  const renderDateCell = (row: any) => {
    // Expecting a date-like label in secondaryLabel (or change to row.inceptionDate if that exists)
    return <span className="tl-date">{row?.secondaryLabel ?? "—"}</span>;
  };

  return (
    <tbody>
      {flatRows.map((row: VisibleLeftRow) => {
        const isHolding = row.kind === "holding";
        // global index for attributes later:
        // const globalRowIndex = isHolding ? null : attributeRowCounter + baseRowIndexOffset;

        const key = isHolding ? `holding-${row.holdingId}` : `attr-${row.attributeId}`;

        const tr = (
          <tr key={key} className="tl-row" style={{ height: CELL_HEIGHT_PX }}>
            <td className="tl-cell">
              {/* <div className="tl-td__content"
              // style={{ height: CELL_HEIGHT_PX }}
              > */}
                {renderNameCell(row)}
              {/* </div> */}
            </td>
            <td className="tl-cell">
              {/* <div className="tl-td__content" 
              // style={{ height: CELL_HEIGHT_PX }}
              > */}
                {renderDateCell(row)}
              {/* </div> */}
            </td>
          </tr>
        );

        if (!isHolding) attributeRowCounter += 1;
        return tr;
      })}
    </tbody>
  );
};

export default Body;
