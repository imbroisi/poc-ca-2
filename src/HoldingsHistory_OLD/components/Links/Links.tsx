/* istanbul ignore file */
// TODO: test this component

import { ATTRIBUTE_ITEM_HEIGHT, LINK_HEIGHT_PX, LINKS_BORDERS_COLORS, LINKS_COLORS } from '../../config';
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

const Links = ({ visibleAttributes }: { visibleAttributes: string[]}) => {
  const { getLinksDataCopy } = useLinksDataContext();
  const { convertDateToPositionPx, todayMmDdYyyy, displayDate } = useDateContext();
  const { holdings } = useHoldings();
  const { expanded } = useExpandedHoldingsState();

  // 1. Filter: only keep links whose attribute is visible in the left table
  const isVisible = useVisibleHistoryFilter(holdings);

  const { cellTopPx, deleteLink } = useLinksDataContext();
  const messageOver = useMessageOverContext();
  const linkToDelete = useRef<LinksDataTypesWithColor | null>(null);

  // Filter links to only show those for expanded holdings and visible attributes
  const rawLinks = getLinksDataCopy();
  const filteredLinks = rawLinks.filter((link) => {
    // Check if the holding for this link is expanded
    const isHoldingExpanded = expanded.has(link.holdingId);
    // Check if the attribute is visible (which already respects expanded state)
    const isAttributeVisible = visibleAttributes.includes(link.attributeId);
    
    return isHoldingExpanded && isAttributeVisible;
  });

  const linksDataCopy = filteredLinks as LinksDataTypesWithColor[];

  // Calculate correct row position based on visible rows structure
  const getCorrectRowPosition = (holdingId: string, attributeId: string) => {
    let rowIndex = 0;
    
    for (const holding of holdings) {
      // Count the holding row
      if (holding.id === holdingId) {
        // If this is a holding row (no attributeId), return the holding row position
        if (!attributeId) {
          return rowIndex * ATTRIBUTE_ITEM_HEIGHT + ATTRIBUTE_ITEM_HEIGHT + 2;
        }
        // If looking for an attribute, increment past the holding row
        rowIndex++;
        
        // Only count attribute rows if the holding is expanded
        if (expanded.has(holding.id)) {
          for (const attribute of holding.attributes) {
            if (attribute.id === attributeId) {
              return rowIndex * ATTRIBUTE_ITEM_HEIGHT + ATTRIBUTE_ITEM_HEIGHT + 2;
            }
            rowIndex++;
          }
        }
        return -9999; // Attribute not found or holding collapsed
      } else {
        // Count this holding row
        rowIndex++;
        // Count its attributes if expanded
        if (expanded.has(holding.id)) {
          rowIndex += holding.attributes.length;
        }
      }
    }
    return -9999; // Not found
  };

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
    console.log("onInfoClicked =>> linkData", linkData);
  }

    // 3. Compute visible row index (based on visible attributes array, not raw attributeIndex)
    const getVisibleRowTop = (attributeId: string) => {
      const idx = visibleAttributes.indexOf(attributeId);
      return idx >= 0 ? idx * ATTRIBUTE_ITEM_HEIGHT : -9999;
    };

  return (
    <tr>
      <th>
        {linksDataCopy.map((linkData) => {
          const style = {
            top: getCorrectRowPosition(linkData.holdingId, linkData.attributeId) + 1,
            left: convertDateToPositionPx(linkData.firstDayDate),
            width: convertDateToPositionPx(linkData.lastDayDate, 1) - convertDateToPositionPx(linkData.firstDayDate),
            height: LINK_HEIGHT_PX,
            backgroundColor: linkData.color,
            borderLeftColor: linkData.borderColor,
            borderRightColor: linkData.borderColor,
          };
          const key = `${(linkData).portfolioIndex}-${(linkData).attributeIndex}-${(linkData).firstDayDate}`;
          const label = `${displayDate(linkData.firstDayDate)} - ${linkData.noFinalDate ? '' : displayDate(linkData.lastDayDate)}`;

          return (
            <FloatingMenu
              key={key}
              onDelete={(mousePosition: [number, number]) => onDeleteClicked(linkData, mousePosition)}
              onInfo={(mousePosition: [number, number]) => onInfoClicked(linkData, mousePosition)}
            >
              <div
                className="links-rectangle"
                style={style}
              >
                {label}
              </div>
            </FloatingMenu>
          )
        })}
      </th>
    </tr>
  );
}

export default Links;
