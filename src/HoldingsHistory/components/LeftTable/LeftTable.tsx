import React from "react";
import "./LeftTable.css";
import { Holding } from "../../types/expandTypes";
import { HeaderLeft } from "./HeaderLeft";
import Filters from "./Filters/Filters";
import Body from "./Body/Body";

interface HoverState {
  columnIndex: number | null;
  rowIndex: number | null;
}

export interface LeftTableProps {
  hoverState?: HoverState;
  onCheckboxChange?: (rowIndex: number, isChecked: boolean) => void; // mantém contrato legado
  rowsSelected?: boolean[];
  editMode?: boolean;
  resetCheckedRows?: () => void;
  baseRowIndexOffset?: number; // default 2
}

const LeftTable: React.FC<LeftTableProps> = ({
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
      // style={{ ['--compare-time' as any]: `${500}` }}
      >
      <HeaderLeft />
      <Filters />
      <Body />
    </table>
  );
}


export default LeftTable;