import { memo, useState } from 'react';
import './Cell.css';
import { ATTRIBUTE_ITEM_HEIGHT, MAIN_BORDER_COLOR, NUMBER_OF_YEARS, TOTAL_ATTRIBUTES, YEAR_CELL_WIDTH_PX } from '../../config';
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
      }}>


      {/* Vertical lines for Years separation in attributes area */}
      {Array.from({ length: NUMBER_OF_YEARS }).map((_, yearIndex) => {
        return (
          <div
            key={yearIndex}
            style={{
              position: 'absolute',
              left: `${yearIndex * YEAR_CELL_WIDTH_PX - 1}px`,
              borderLeft: `1px solid ${MAIN_BORDER_COLOR}`,
              height: `${ATTRIBUTE_ITEM_HEIGHT * (TOTAL_ATTRIBUTES + 1)}px`,
            }}>
          </div>
        );
      })}

      <div
        className="table-cell-attribute-container"
        style={{
          height: `${ATTRIBUTE_ITEM_HEIGHT}px`,
          borderColor: MAIN_BORDER_COLOR,
        }} />

      {Array.from({ length: TOTAL_ATTRIBUTES }).map((_, attributeIndex) => {
        setCellCoord?.(holdingIdex, attributeIndex, drawLinks);
        return (
          <div
            key={attributeIndex}
            className="table-cell-attribute"
            style={{
              height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT}px` : 0,
            }}>

            {linkDataBulk.map((linkData, index) => (
              <div key={`${linkData?.portfolioIndex}-${linkData?.attributeIndex}-${linkData?.firstDayDate}-${index}`}>
                {linkData?.portfolioIndex === holdingIdex && linkData?.attributeIndex === attributeIndex && (
                  <div
                    className="table-cell-link"
                    style={{
                      right: convertDateToPositionPx(linkData?.lastDayDate),
                      height: ATTRIBUTE_ITEM_HEIGHT - 6 ,
                      width: convertDateToPositionPx(linkData?.firstDayDate) - convertDateToPositionPx(linkData?.lastDayDate),
                      backgroundColor: linkData?.color,
                      border: `1px solid ${linkData?.borderColor}`,
                    }}>
                    <span className="table-cell-label">
                      {linkData?.label || '<todo label>'}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        )
      })}

    </div>
  );
});

export default Cell;
