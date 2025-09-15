import React from 'react';
import "./HeaderLeft.css";

// IOHUB STATIC ATTRIBUTE ID
const HeaderLeft = ({ nameFilterSlot, dateFilterSlot }: any) => {
  return (
    <thead>
      <tr>
        <th className="tl-header-blank" />
        <th className="tl-header-blank tl-header-border" />
      </tr>
      <tr className='th-row'>
        <th className="tl-header">FUND NAME</th>
        <th className="tl-header tl-header-border">INCEPTION DATE</th>
      </tr>
    </thead>
  )
}

export default HeaderLeft;
