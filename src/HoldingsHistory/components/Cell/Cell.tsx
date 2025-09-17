import { memo } from 'react';
import './Cell.css';
import { ATTRIBUTE_ITEM_HEIGHT, TOTAL_ATTRIBUTES } from '../../config';

export interface CellProps {
  // key: number;
  showMe: boolean;
  label: string;
}

const Cell = memo(({ showMe, label }: CellProps) => {
  // const Cell = ({ key, showMe, label }: CellProps) => {

  console.log('===>> RENDERING CELL');

  return (
    <div
      // key={key}
      className="table-cell"
      style={{
        height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT * (TOTAL_ATTRIBUTES + 1) + 1}px` : '0',
        boxSizing: 'border-box',
      }}>
        <div style={{
          height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
          backgroundColor: '#fafafa',
          borderBottom: '1px solid #ccc',
          // borderTop: '1px solid #ccc',
          // border: '1px solid #ccc',
          boxSizing: 'border-box',
          // borderTop: '1px solid #ccc',
          // overflow: 'hidden',
          // transition: 'height 0.2s ease-in-out',
        }} />
          {/* {label} */}
        {/* </div> */}
        {/* </div> */}
      {/* {label} */}

      {/* <div style={{
        height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT}px` : '0',
        overflow: 'hidden',
        transition: 'height 0.2s ease-in-out',
        fontWeight: 'normal',
        lineHeight: '1.3',
        // paddingLeft: '10px',
        // paddingTop: '4px',
        // paddingBottom: '4px',

        border: '1px solid #ccc',
      }} /> */}

    </div>
  );
});

export default Cell;
