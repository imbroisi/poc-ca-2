import { memo, useState } from 'react';
import './Cell.css';
import { ATTRIBUTE_ITEM_HEIGHT, TOTAL_ATTRIBUTES } from '../../config';
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
                  }}>
                    {label}
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
