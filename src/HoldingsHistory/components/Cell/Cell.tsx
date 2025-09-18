import { memo, useState } from 'react';
import './Cell.css';
import { ATTRIBUTE_ITEM_HEIGHT, NUMBER_OF_YEARS, TOTAL_ATTRIBUTES, YEAR_CELL_WIDTH_PX } from '../../config';
import { useDateContext } from '../../context/DateContext';

export interface CellProps {
  showMe: boolean;
  label: string;
  holdingIdex: number;
  colIndex?: number;
  setCellCoord?: (holdingIdex: number, attributeIndex: number, drawLinks: any) => void;
}

const Cell = memo(({ showMe, label, holdingIdex, colIndex, setCellCoord }: CellProps) => {
  const [linkDataBulk, setLinkData] = useState<any[]>([]);
  const { convertDateToPositionPx } = useDateContext();

  const drawLinks = (data: any) => {
    setLinkData((prev: any) => [
      ...prev,
      data
    ]);
  }

  return (
    <div
      className="table-cell"
      style={{
        height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT * (TOTAL_ATTRIBUTES + 1) + 1}px` : '0',
        boxSizing: 'border-box',
      }}>
        
      
      {Array.from({ length: NUMBER_OF_YEARS }).map((_, yearIndex) => {
        return (
          <div
            key={yearIndex} 
            style={{ 
              position: 'absolute', 
              left: `${yearIndex * YEAR_CELL_WIDTH_PX - 1}px` ,
              borderLeft: '1px solid #bbb',
              height: `${ATTRIBUTE_ITEM_HEIGHT * (TOTAL_ATTRIBUTES + 1)}px`,
            }}>
          </div>
        );
      })}

      <div style={{
        height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
        backgroundColor: '#fafafa',
        borderBottom: '1px solid #ccc',
        boxSizing: 'border-box',
      }} />
      {Array.from({ length: TOTAL_ATTRIBUTES }).map((_, attributeIndex) => {
        setCellCoord?.(holdingIdex, attributeIndex, drawLinks);
        return (
          <div key={attributeIndex} style={{
            position: 'relative',
            height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT}px` : '0',
            overflow: 'hidden',
            transition: 'height 0.2s ease-in-out',
            fontWeight: 'normal',
          }}>

            {linkDataBulk.map((linkData) => (
              <>
                {linkData?.portfolioIndex === holdingIdex && linkData?.attributeIndex === attributeIndex && (
                  <div style={{
                    position: 'absolute',
                    top: 2,
                    right: convertDateToPositionPx(linkData?.lastDayDate),
                    height: ATTRIBUTE_ITEM_HEIGHT - 6,
                    width: convertDateToPositionPx(linkData?.firstDayDate) - convertDateToPositionPx(linkData?.lastDayDate),
                    backgroundColor: linkData?.color,
                    border: `1px solid ${linkData?.borderColor}`,
                    borderRadius: 3,
                    fontSize: 12,
                    fontWeight: 400,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'left',
                    paddingLeft: '6px',
                    boxSizing: 'border-box',
                  }}>
                    {linkData?.label || '<todo label>'}
                  </div>
                )}
              </>
            ))}
          </div>
        )

      })}

    </div>
  );
});

export default Cell;
