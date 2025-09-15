import React, { forwardRef } from "react";
import "./LeftTable.css";
import { HeaderLeft } from "./HeaderLeft";
import Filters from "./Filters/Filters";
import { LeftTableBody } from "./Body";

const LeftTable = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="table-left-container">
      <table className="tl-table">
        <HeaderLeft />
        <Filters />
        <LeftTableBody />
      </table>
    </div>

  );
});


export default LeftTable;