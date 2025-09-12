import React from "react";
import "./LeftTable.css";
import { HeaderLeft } from "./HeaderLeft";
import Filters from "./Filters/Filters";
import { LeftTableBody } from "./Body";


const LeftTable: React.FC = () => {

  return (
    <div className="table-left-container">
      <table className="tl-table">
        <HeaderLeft />
        <Filters />
        <LeftTableBody />
      </table>
    </div>

  );
}


export default LeftTable;