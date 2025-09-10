import React from 'react';
import { CELL_HEIGHT_PX } from '../../../config';
import './Filters.css';

function Filters({ nameFilterSlot, dateFilterSlot }: any) {

  return (
    <tr className="tl-filter-row" style={{ fontSize: 12 }}>
      <th className="tl-filter-cell">
        {nameFilterSlot ?? null}
        <td className='table-cell'>Filter</td>
      </th>
      <th className="tl-filter-cell">
        {dateFilterSlot ?? null}
        <td className='table-cell'>
          Filter
        </td>
      
      </th>
  </tr>
  )
}

export default Filters