import React, { useMemo } from "react";
import { Row } from "./Row";
import { useExpandedHoldingsActions, useExpandedHoldingsState } from "../../../context/ExpandedHoldingsContext";
import { flattenLeftRowsForHoldings } from "../../../utils/flattenLeftRowsForHoldings";
import "../LeftTable.css";
import { VisibleLeftRow } from "../../../types/expandTypes";
import { useHoldings } from "../../../context/HoldingsContext";


const Body: React.FC = () => {
  const { expanded } = useExpandedHoldingsState();
  const { toggleHolding } = useExpandedHoldingsActions();
  const { holdings } = useHoldings();

  const flatRows = useMemo(
    () => holdings?.length ? flattenLeftRowsForHoldings(holdings, expanded) : [],
    [holdings, expanded]
  );

  if (!flatRows.length) {
    return <div className="skeleton-table">Loading rows…</div>;
  }

  return (
    <tbody>
      {flatRows.map((row: VisibleLeftRow) => {
        const isHolding = row.kind === "holding";

        const key = isHolding ? `holding-${row.holdingId}` : `attr-${row.attributeId}`;

      return ( 
          <Row
            key={key}
            row={row}
            toggleHolding={toggleHolding}
            expanded={expanded}
          />
        )
      })}
    </tbody>
  );
};

export default Body;
