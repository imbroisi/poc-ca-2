import React, { useEffect, useMemo, useState, useCallback } from "react";
import CollapseCell from "../CollapseCell";
import { useExpandedHoldings } from "../../context/ExpandContext";
import { flattenLeftRowsForHoldings } from "../../utils/flattenLeftRowsForHoldings";
import "./LeftTable.css";
import { Holding, HoldingId } from "../../types/expandTypes";
import { useLinksDataContext } from "../../context/LinksDataProvider";
import { HeaderLeft } from "./HeaderLeft";
import Filters from "./Filters/Filters";
import Body from "./Body/Body";

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


  return (
    <table
      className="tl-table"
      style={{ ['--compare-time' as any]: `${500}` }}>
      <HeaderLeft />
      <Filters />
      <Body holdings={holdings} />
    </table>
  );
}


export default LeftTable;