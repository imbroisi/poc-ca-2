import React from "react";
import "./Filters.css";

interface FiltersProps {
  nameFilterSlot?: React.ReactNode;
  dateFilterSlot?: React.ReactNode;
}

function Filters({ nameFilterSlot, dateFilterSlot }: FiltersProps) {
  return (
    <tbody>
      <tr>
        <td className="tl-filter-row">
          <div className="tl-filter-cell table-cell">
            {nameFilterSlot || <span aria-hidden="true">{`<Filter>`}</span>}
          </div>
        </td>
        <td className="tl-filter-row">
          <div className="tl-filter-cell table-cell">
            {dateFilterSlot || <span aria-hidden="true">{`<Filter>`}</span>}
          </div>
        </td>
      </tr>
    </tbody>
  );
}

export default Filters;
