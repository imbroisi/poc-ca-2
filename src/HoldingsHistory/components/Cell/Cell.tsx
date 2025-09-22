import { memo, useEffect, useState } from 'react';
import './Cell.css';
import { ATTRIBUTE_ITEM_HEIGHT, MAIN_BORDER_COLOR, NUMBER_OF_YEARS, TOTAL_ATTRIBUTES, YEAR_CELL_WIDTH_PX } from '../../config';
import { useDateContext } from '../../context/DateContext';
import { useLinksDataContext } from '../../context/LinksDataProvider';

export interface CellProps {
  showMe: boolean;
  label: string;
  holdingIdex: number;
  colIndex?: number;
  setCellCoord?: (holdingIdex: number, attributeIndex: number, drawLinks: any) => void;
}

const Cell = memo(({ showMe, label, holdingIdex, colIndex, setCellCoord }: CellProps) => {
  const { pageToShow, holdingsPerPage } = useLinksDataContext();
  const [linkDataBulk, setLinkData] = useState<any[]>([]);
  const { convertDateToPositionPx } = useDateContext();

  const drawLinks = (data: any) => {
    // console.log("2500 ++++++==>> drawLinks() data", data);
    setLinkData((prev: any) => [...prev, data]);
  }

  useEffect(() => {
    // console.log("2501 ==>> pageToShow", pageToShow);
    setLinkData([]);
  }, [pageToShow]);

  // console.log("3000 ==>> holdingIdex", holdingIdex);
  console.log("3001 ==>> linkDataBulk", linkDataBulk);


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

        // console.log("\n3003 ==>> holdingIndex", holdingIdex);
        // console.log("3004 ==>> attributeIndex", attributeIndex);
        // console.log("3005 ==>> linkDataBulk", linkDataBulk);


        return (
          <div
            key={attributeIndex}
            className="table-cell-attribute"
            style={{
              height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT}px` : 0,
            }}>

            {linkDataBulk.map((linkData, index) => {
              // console.log("\n3005 ==>> logic", linkData?.holdingRealIndex === holdingIdex && linkData?.attributeIndex === attributeIndex);
              console.log("3006 ==>> linkData", linkData);
              console.log("3006 ==>> linkData.color", linkData?.color);
              // console.log("3007 ==>> linkData?.startEffectiveDate", linkData?.startEffectiveDate);

              // console.log("\n3008 ==>> linkData?.holdingRealIndex", linkData?.holdingRealIndex);
              // // console.log("3009 ==>> holdingIdex", holdingIdex);
              // console.log("3010 ==>> linkData?.attributeIndex", linkData?.label);
              // console.log("3010 ==>> linkData?.attributeIndex", linkData?.attributeIndex);
              // console.log("3011 ==>> attributeIndex", attributeIndex);
              // console.log("2502 ==>> logic", linkData?.holdingRealIndex === holdingIdex && linkData?.attributeIndex === attributeIndex);
              return (
                <div key={`${linkData?.holdingIndex}-${linkData?.attributeIndex}-${linkData?.startEffectiveDate}-${index}`}>
                  {linkData?.attributeIndex === attributeIndex && (
                    <div
                      className="table-cell-link"
                      style={{
                        right: convertDateToPositionPx(linkData?.endEffectiveDate) - 1,
                        height: ATTRIBUTE_ITEM_HEIGHT - 6,
                        width: convertDateToPositionPx(linkData?.startEffectiveDate) - convertDateToPositionPx(linkData?.endEffectiveDate),
                        backgroundColor: linkData?.color,
                        border: `1px solid ${linkData?.borderColor}`,
                      }}>
                      <span className="table-cell-label">
                        {linkData?.label || ''}
                      </span>
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )
      })}

    </div>
  );
});

export default Cell;
