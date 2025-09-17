/* istanbul ignore file */
// TODO: test this component

import { ATTRIBUTE_ITEM_HEIGHT, LINKS_BORDERS_COLORS, LINKS_COLORS, TOTAL_ATTRIBUTES } from '../../config';
import { useDateContext } from '../../context/DateContext';
import { LinksDataTypes, useLinksDataContext } from '../../context/LinksDataProvider';
import FloatingMenu from '../FloatingMenu';
import './Links.css';
import { useMessageOverContext } from '../../context/MessageOverContext';
import { useRef } from 'react';
import MessageOverDelete from '../GlobalMessageOver/MessageOverDelete';
import { useHoldings } from '../../context/HoldingsContext';
import { useVisibleHistoryFilter } from '../../hooks/useVisibleHistoryFilter';
import { useExpandedHoldingsState } from '../../context/ExpandedHoldingsContext';

interface LinksDataTypesWithColor extends LinksDataTypes {
  color: string;
  borderColor: string;
  noFinalDate?: boolean;
}

interface LinksProps {
  visibleAttributes: string[];
  // positionRef?: React.RefObject<HTMLDivElement>;
  show?: boolean[];
}

const Links = ({ visibleAttributes, show }: LinksProps) => {
  const { getLinksDataCopy } = useLinksDataContext();
  const { convertDateToPositionPx, todayMmDdYyyy, displayDate } = useDateContext();
  const { holdings } = useHoldings();
  const { expanded } = useExpandedHoldingsState();

  // 1. Filter: only keep links whose attribute is visible in the left table
  // Provide fallback for holdings to prevent "not iterable" error
  const safeHoldings = holdings && Array.isArray(holdings) ? holdings : [];
  const isVisible = useVisibleHistoryFilter(safeHoldings);

  const { cellTopPx, deleteLink } = useLinksDataContext();
  const messageOver = useMessageOverContext();
  const linkToDelete = useRef<LinksDataTypesWithColor | null>(null);

  // Filter links to only show those for expanded holdings and visible attributes
  const rawLinks = getLinksDataCopy();
  // console.log("==>> rawLinks", rawLinks);

  const filteredLinks = rawLinks;

  // const filteredLinks = rawLinks.filter((link) => {
  //   // Check if the holding for this link is expanded
  //   const isHoldingExpanded = expanded.has(link.holdingId);
  //   // Check if the attribute is visible (which already respects expanded state)
  //   const isAttributeVisible = visibleAttributes.includes(link.attributeId);

  //   return isHoldingExpanded && isAttributeVisible;
  // });

  // Get vertical position of positionRef element
  // const verticalPosition = positionRef?.current ? positionRef.current.getBoundingClientRect() : null;
  // console.log("==>> positionRef vertical position:", {
  //   element: positionRef?.current,
  //   top: verticalPosition?.top,
  //   bottom: verticalPosition?.bottom,
  //   y: verticalPosition?.y,
  //   height: verticalPosition?.height
  // });

  // const verticalTop = verticalPosition?.top;

  const linksDataCopy = filteredLinks as LinksDataTypesWithColor[];

  // Calculate correct row position based on visible rows structure
  const getCorrectRowPosition = (linkData: LinksDataTypesWithColor) => {
    const rowsPerPortfolio = TOTAL_ATTRIBUTES + 1;
    const rowHeight = ATTRIBUTE_ITEM_HEIGHT;
    const headerOffset = ATTRIBUTE_ITEM_HEIGHT;

    // IMPORTANT: do not remove the -2, it is used to prevent the links from being misaligned
    const holdingRow = linkData.portfolioIndex * (rowsPerPortfolio * rowHeight);
    const attributeRow = linkData.attributeIndex * rowHeight + 1;

    const correctionPerPortfolio = linkData.portfolioIndex * (rowHeight * rowsPerPortfolio);
    console.log("-----------------------> correctionPerPortfolio", correctionPerPortfolio)

    return holdingRow + attributeRow - correctionPerPortfolio;
  };

  // const getCorrectRowPosition = (holdingId: string, attributeId: string) => {
  //   let rowIndex = 0;

  //   for (const holding of holdings) {
  //     // Count the holding row
  //     if (holding.id === holdingId) {
  //       // If this is a holding row (no attributeId), return the holding row position
  //       if (!attributeId) {
  //         return rowIndex * ATTRIBUTE_ITEM_HEIGHT + ATTRIBUTE_ITEM_HEIGHT + 2;
  //       }
  //       // If looking for an attribute, increment past the holding row
  //       rowIndex++;

  //       // Only count attribute rows if the holding is expanded
  //       if (expanded.has(holding.id)) {
  //         for (const attribute of holding.attributes) {
  //           if (attribute.id === attributeId) {
  //             return rowIndex * ATTRIBUTE_ITEM_HEIGHT + ATTRIBUTE_ITEM_HEIGHT + 2;
  //           }
  //           rowIndex++;
  //         }
  //       }
  //       console.log("1) ==>> rowIndex", rowIndex);
  //       return -9999; // Attribute not found or holding collapsed
  //     } else {
  //       // Count this holding row
  //       rowIndex++;
  //       // Count its attributes if expanded
  //       if (expanded.has(holding.id)) {
  //         rowIndex += holding.attributes.length;
  //       }
  //     }
  //   }
  //   console.log("2) ==>> rowIndex", rowIndex);

  //   return -9999; // Not found
  // };

  const replaceToday = () => {
    linksDataCopy.forEach((linkData) => {
      if (linkData.lastDayDate === 'today') {
        linkData.lastDayDate = todayMmDdYyyy;
        linkData.noFinalDate = true;
      }
    });
  }

  const includeColorsToLinks = () => {
    const splitIntoGroups = (data: LinksDataTypes[]) => {
      const groups = data.reduce((acc, linkData) => {
        const key = `${(linkData).portfolioIndex}-${(linkData).attributeIndex}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(linkData as LinksDataTypesWithColor);
        return acc;
      }, {} as { [key: string]: LinksDataTypesWithColor[] });

      return Object.values(groups);
    };

    const sortedGroups = splitIntoGroups(linksDataCopy).map(group =>
      group.sort((a, b) => new Date((a).firstDayDate).getTime() - new Date((b).firstDayDate).getTime())
    );

    sortedGroups.forEach((group) => {
      group.forEach((linkData, index) => {
        (linkData).color = LINKS_COLORS[index % LINKS_COLORS.length];
        (linkData).borderColor = LINKS_BORDERS_COLORS[index % LINKS_BORDERS_COLORS.length];
      });
    });
  };

  replaceToday();
  includeColorsToLinks();

  const onDeleteClicked = (linkData: LinksDataTypesWithColor, mousePosition: [number, number]) => {
    linkToDelete.current = linkData;
    messageOver.setPosition([mousePosition[0] - 20, mousePosition[1] - 110]);
    messageOver.setConfirmButtonText('Delete');
    messageOver.open(
      <MessageOverDelete linkData={linkData} />
    );
    messageOver.onConfirm(() => {
      if (linkToDelete.current) {
        deleteLink(linkToDelete.current);
      }
    });
  }

  const onInfoClicked = (linkData: LinksDataTypesWithColor, mousePosition: [number, number]) => {
    // TODO: implement this
    // console.log("onInfoClicked =>> linkData", linkData);
  }

  // 3. Compute visible row index (based on visible attributes array, not raw attributeIndex)
  const getVisibleRowTop = (attributeId: string) => {
    const idx = visibleAttributes.indexOf(attributeId);
    return idx >= 0 ? idx * ATTRIBUTE_ITEM_HEIGHT : -9999;
  };

  // console.log("==>> ATTRIBUTE_ITEM_HEIGHT", ((ATTRIBUTE_ITEM_HEIGHT)));
  // console.log("==>> TOTAL_ATTRIBUTES + 1", (TOTAL_ATTRIBUTES + 1));
  // console.log("==>> ((ATTRIBUTE_ITEM_HEIGHT) * (TOTAL_ATTRIBUTES + 1))", ((ATTRIBUTE_ITEM_HEIGHT) * (TOTAL_ATTRIBUTES + 1)));

  let cnt = 0;

  return (
    <div style={{ position: 'absolute' }}>
      {show?.map((showMe, index) => {
        if (!showMe) cnt += 1;
        return (
          <div key={index} style={{
            position: 'relative',
            top: `-${cnt}px`,
            // top: 0,
            // marginBottom: `${ATTRIBUTE_ITEM_HEIGHT}px`,
            marginTop: `${ATTRIBUTE_ITEM_HEIGHT}px`,
            // top: `${ATTRIBUTE_ITEM_HEIGHT + index * ATTRIBUTE_ITEM_HEIGHT * TOTAL_ATTRIBUTES + 1}px`, 
            height: showMe ? ((ATTRIBUTE_ITEM_HEIGHT) * (TOTAL_ATTRIBUTES)) + 1 : 0,
            transition: 'height 0.2s ease-in-out',

            // IMPORTANT: do not remove this border and boxSizing, they are used to prevent the links from being misaligned
            border: '1px solid blue',
            boxSizing: 'border-box',

            // width: '100%',
            // backgroundColor: 'red',
            zIndex: index * 2 + 2,
            // paddingTop: `${ATTRIBUTE_ITEM_HEIGHT}px`,
          }}>

            {linksDataCopy.map((linkData) => {
              if (linkData.portfolioIndex !== index) return null;

              // console.log("\n\n==>> index linkData", index , linkData);


              const style = {
                top: getCorrectRowPosition(linkData),
                left: convertDateToPositionPx(linkData.firstDayDate),
                width: convertDateToPositionPx(linkData.lastDayDate, 1) - convertDateToPositionPx(linkData.firstDayDate),
                height: ATTRIBUTE_ITEM_HEIGHT - 3,
                backgroundColor: linkData.color,
                borderLeftColor: linkData.borderColor,
                borderRightColor: linkData.borderColor,
              };

              // console.log("-----------------------> style.top", style.top)

              const key = `${(linkData).portfolioIndex}-${(linkData).attributeIndex}-${(linkData).firstDayDate}`;
              const label = `${displayDate(linkData.firstDayDate)} - ${linkData.noFinalDate ? '' : displayDate(linkData.lastDayDate)}`;

              // console.log("==>> style", style);

              return (
                // <FloatingMenu
                //   key={key}
                //   onDelete={(mousePosition: [number, number]) => onDeleteClicked(linkData, mousePosition)}
                //   onInfo={(mousePosition: [number, number]) => onInfoClicked(linkData, mousePosition)}
                // >
                <div
                  key={key}
                  className="links-rectangle"
                  style={style}
                >
                  {/* {style.top}  */}
                  {linkData.portfolioIndex} {linkData.attributeIndex} {style.top}
                </div>
                // </FloatingMenu>
              )
            })}







          </div>
        );
      })}
    </div>

  );

  // return (
  //   <div style={{ position: 'relative', zIndex: 0, height: '0 !important' }}>
  //     {linksDataCopy.map((linkData) => {
  //       const style = {
  //         top: getCorrectRowPosition(linkData),
  //         left: convertDateToPositionPx(linkData.firstDayDate),
  //         width: convertDateToPositionPx(linkData.lastDayDate, 1) - convertDateToPositionPx(linkData.firstDayDate),
  //         height: 0,//LINK_HEIGHT_PX,
  //         backgroundColor: linkData.color,
  //         borderLeftColor: linkData.borderColor,
  //         borderRightColor: linkData.borderColor,
  //       };
  //       const key = `${(linkData).portfolioIndex}-${(linkData).attributeIndex}-${(linkData).firstDayDate}`;
  //       const label = `${displayDate(linkData.firstDayDate)} - ${linkData.noFinalDate ? '' : displayDate(linkData.lastDayDate)}`;

  //       // console.log("==>> linkData", linkData);
  //       // console.log("==>> style", style);

  //       return (
  //         // <FloatingMenu
  //         //   key={key}
  //         //   onDelete={(mousePosition: [number, number]) => onDeleteClicked(linkData, mousePosition)}
  //         //   onInfo={(mousePosition: [number, number]) => onInfoClicked(linkData, mousePosition)}
  //         // >
  //           <div
  //             key={key}
  //             className="links-rectangle"
  //             style={style}
  //           >
  //             {/* {label} */}
  //           </div>
  //         // </FloatingMenu>
  //       )
  //     })}
  //   </div>
  // );
}

export default Links;
