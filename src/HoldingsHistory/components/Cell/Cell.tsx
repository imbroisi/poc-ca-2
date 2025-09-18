import { memo, useState } from 'react';
import './Cell.css';
import { ATTRIBUTE_ITEM_HEIGHT, TOTAL_ATTRIBUTES } from '../../config';
import { useDateContext } from '../../context/DateContext';

export interface CellProps {
  showMe: boolean;
  label: string;
  // isTodayColumn?: boolean;
  holdingIdex: number;
  colIndex?: number;
  setCellCoord?: (holdingIdex: number, attributeIndex: number, drawLinks: any) => void;
}

const Cell = memo(({ showMe, label, holdingIdex, colIndex, setCellCoord }: CellProps) => {
  // const Cell = ({ key, showMe, label }: CellProps) => {
  const [linkDataBulk, setLinkData] = useState<any[]>([]);
  const { convertDateToPositionPx, todayMmDdYyyy, displayDate } = useDateContext();


  // console.log('===>> RENDERING CELL holdingIdex', holdingIdex);

  const drawLinks = (data: any) => {
    console.log("==>> drawLinks!!!!!!! ==> ", data);
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
        // borderTop: '1px solid #ccc',
        // border: '1px solid #ccc',
        boxSizing: 'border-box',
        // borderTop: '1px solid #ccc',
        // overflow: 'hidden',
        // transition: 'height 2s ease-in-out'
      }} />
      {/* {label} */}
      {/* </div> */}
      {/* </div> */}
      {/* {label} */}

      {Array.from({ length: TOTAL_ATTRIBUTES }).map((_, attributeIndex) => {
        // if (isTodayColumn) {
        setCellCoord?.(holdingIdex, attributeIndex, drawLinks);
        // }
        // const border = '1px solid orange';

        // const style = {
        //   // top: 'unset',//getCorrectRowPosition(linkData),
        //   // right: convertDateToPositionPx(linkData?.firstDayDate),
        //   // width: convertDateToPositionPx(linkData?.lastDayDate, 1) - convertDateToPositionPx(linkData?.firstDayDate),
        //   height: ATTRIBUTE_ITEM_HEIGHT - 4,
        //   backgroundColor: linkData?.color,
        //   borderLeftColor: linkData?.borderColor,
        //   borderRightColor: linkData?.borderColor,
        // };

        // console.log("\n\n+++++++==>> linkData", linkData);
        // const tmplastDayDate = convertDateToPositionPx(linkData?.lastDayDate);

        // console.log("+++++++==>> tmplastDayDate", tmplastDayDate);
        // console.log("==>> colIndex", colIndex, linkData?.colIndex);
        // console.log("\n\n==>> holdingIdex", holdingIdex);
        // console.log("==>> linkData?.portfolioIndex", linkData?.portfolioIndex);

        // const right = convertDateToPositionPx(linkData?.lastDayDate);
        // const width = convertDateToPositionPx(linkData?.firstDayDate) - convertDateToPositionPx(linkData?.lastDayDate);

        // console.log("+++++++==>> right", right);

        return (
          <div key={attributeIndex} style={{
            position: 'relative',
            height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT}px` : '0',
            overflow: 'hidden',
            transition: 'height 2s ease-in-out',
            fontWeight: 'normal',
            // lineHeight: '1.3',
            // boxSizing: 'border-box',
            // paddingLeft: '10px',
            // paddingTop: '4px',
            // paddingBottom: '4px',

            // border: border,
            // paddingTop: '2px',
          }}>


          {linkDataBulk.map((linkData) => {
            return (
              linkData?.portfolioIndex === holdingIdex && linkData?.attributeIndex === attributeIndex && (
                <div style={{
                  position: 'absolute',
                  top: 2,
                  right: convertDateToPositionPx(linkData?.lastDayDate),//: convertDateToPositionPx(linkData?.lastDayDate),
                  height: ATTRIBUTE_ITEM_HEIGHT - 6,
                  width: convertDateToPositionPx(linkData?.firstDayDate) - convertDateToPositionPx(linkData?.lastDayDate),//: 300,//style?.width,
                  backgroundColor: linkData?.color,//'orange',//style?.backgroundColor,
                  // borderLeftColor: linkData?.borderLeftColor,
                  // borderRightColor: linkData?.borderRightColor,
                  border: `1px solid ${linkData?.borderColor}`,
                  zIndex: 1000,
                  borderRadius: 4,

                }}></div>
              )
            )
          })}

            {/* {linkData?.portfolioIndex === holdingIdex && linkData?.attributeIndex === attributeIndex && ( */}
              {/* <div style={{
                position: 'absolute',
                top: 2,
                right: convertDateToPositionPx(linkData?.lastDayDate),//: convertDateToPositionPx(linkData?.lastDayDate),
                height: ATTRIBUTE_ITEM_HEIGHT - 4,
                width: convertDateToPositionPx(linkData?.firstDayDate) - convertDateToPositionPx(linkData?.lastDayDate),//: 300,//style?.width,
                backgroundColor: linkData?.color,//'orange',//style?.backgroundColor,
                // borderLeftColor: linkData?.borderLeftColor,
                // borderRightColor: linkData?.borderRightColor,
                border: `1px solid ${linkData?.borderColor}`,
                zIndex: 1000,
                borderRadius: 4,
                  
              }}></div>
            )} */}


          </div>
        )
      })}

    </div>
  );
});

export default Cell;
