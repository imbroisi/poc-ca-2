import React, { useEffect, useMemo, useState, useCallback } from "react";
import CollapseCell from "../CollapseCell";
import { useExpandedHoldings } from "../../context/ExpandContext";
import { flattenLeftRowsForHoldings } from "../../utils/flattenLeftRowsForHoldings";
import "./LeftTable.css";
import { Holding, HoldingId } from "../../types/expandTypes";
import { useLinksDataContext } from "../../context/LinksDataProvider";

interface HoverState {
  columnIndex: number | null;
  rowIndex: number | null;
}

export interface LeftTableProps {
  holdings?: Holding[];
  hoverState?: HoverState;
  onCheckboxChange?: (rowIndex: number, isChecked: boolean) => void; // mantém contrato legado
  rowsSelected?: boolean[];
  editMode?: boolean;
  resetCheckedRows?: () => void;
  baseRowIndexOffset?: number; // default 2
}

const LeftTable: React.FC<LeftTableProps> = ({
  holdings = [],
  hoverState,
  onCheckboxChange,
  rowsSelected,
  editMode,
  resetCheckedRows,
  baseRowIndexOffset = 2,
}) => {
  // const { compareLink } = useValueLink();
  const { getLinksDataCopy } = useLinksDataContext();
  const { state, toggleHolding } = useExpandedHoldings();

  // const [tripleCheckboxState, setTripleCheckboxState] = useState<TripleCheckboxStates>("off");
  const [compareRowHeight, setCompareRowHeight] = useState(0);

  const links = useMemo(() => {
    const rawLinks = getLinksDataCopy();
    return rawLinks.map((item, idx) => ({
      ...item,
      name: `Holding ${idx + 1}`,
    }));
  }, [getLinksDataCopy]);

  const flatRows = useMemo(() =>  flattenLeftRowsForHoldings(holdings, state.expanded), [holdings, state.expanded]);

  // totalRows legado: considera SOMENTE linhas de atributo (selecionáveis)
  const totalRows = useMemo(() => flatRows.filter(r => r.kind === "attribute").length, [flatRows]);

  useEffect(() => {
    // if (!editMode && rowsSelected.length > 0) resetCheckedRows();
  }, [editMode, resetCheckedRows, rowsSelected]);

  useEffect(() => {
    let totalChecked = 0;
    for (let i = 0; i < totalRows; i+=1) { 
      // if (rowsSelected[i]) totalChecked+=1;
    }
    // setTripleCheckboxState(totalChecked === totalRows ? "on" : totalChecked > 0 ? "semi" : "off");
  }, [rowsSelected, totalRows]);

  // useEffect(() => { setCompareRowHeight(compareLink ? H * 2 + 1 : 0); }, [compareLink]);

  const handleMasterClick = () => {
    // const next = ({ off: "on", on: "off", semi: "on" } as const)[tripleCheckboxState];
    // const check = next !== "off";
    // for (let i = 0; i < totalRows; i+=1) onCheckboxChange(i + baseRowIndexOffset, check);
    // setTripleCheckboxState(next);
  };

  const onToggleHolding = useCallback((holdingId: HoldingId) => toggleHolding(holdingId), [toggleHolding]);

  let attributeRowCounter = 0; // mapeia índice visual de atributos -> índice global

  return (
    <table className="tl-table" style={{ ['--compare-time' as any]: `${500}` }}>
      <tbody>
        <tr>
          <td className="tl-th tl-th--sticky">
            {editMode && (
              <div className="tl-th__select-all">
                {/* <TripleCheckbox value={tripleCheckboxState} onClick={handleMasterClick} /> */}
                <span className="tl-th__label">All</span>
              </div>
            )}
          </td>
        </tr>
        <tr />

        {flatRows.map((row, visibleIdx) => {
          const isHolding = row.kind === "holding";
          // const isHovered = hoverState.rowIndex === (isHolding ? -1 : attributeRowCounter + baseRowIndexOffset) && hoverState.rowIndex !== 1;
          // const isCompareRow = !isHolding && compareLink?.rowIndex === attributeRowCounter;
          // const rowHeight = isCompareRow ? compareRowHeight : 32;

          // calcula índice global apenas para linhas de atributo
          const globalRowIndex = isHolding ? null : attributeRowCounter + baseRowIndexOffset;

          const tr = (
            <tr key={isHolding ? row.holdingId : row.attributeId} className={"tl-row"}>
              <td className="tl-td">
                <div className="tl-td__content" style={{ ['--row-h' as any]: `${32}px` }}>
                  {isHolding ? (
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
                  ) : (
                    <div className="tl-cell-pair tl-cell-pair--child">
                      <span className="tl-cell-pair__primary tl-cell-pair__indent">{row.primaryLabel}</span>
                      {/* <span className="tl-cell-pair__secondary">{row.secondaryLabel}</span> */}
                      {/* {editMode && (
                        <input
                          type="checkbox"
                          className="tl-checkbox"
                          checked={Boolean(rowsSelected[attributeRowCounter])}
                          onChange={(e) => globalRowIndex !== null && onCheckboxChange(globalRowIndex, e.target.checked)}
                          disabled={!editMode}
                        />
                      )} */}
                    </div>
                  )}
                </div>
              </td>
            </tr>
          );

          if (!isHolding) attributeRowCounter+=1; // incrementa só nas linhas de atributo
          return tr;
        })}
      </tbody>
    </table>
  );
};

export default LeftTable;