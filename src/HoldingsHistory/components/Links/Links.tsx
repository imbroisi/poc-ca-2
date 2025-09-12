/* istanbul ignore file */
// TODO: test this component

import { CELL_HEIGHT_PX, LINKS_BORDERS_COLORS, LINKS_COLORS } from '../../config';
import { useDateContext } from '../../context/DateContext';
import { LinksDataTypes, useLinksDataContext } from '../../context/LinksDataProvider';
import FloatingMenu from '../FloatingMenu';
import './Links.css';
import { useMessageOverContext } from '../../context/MessageOverContext';
import { useRef } from 'react';
import MessageOverDelete from '../GlobalMessageOver/MessageOverDelete';
import { useHoldings } from '../../context/HoldingsContext';
import { useVisibleHistoryFilter } from '../../hooks/useVisibleHistoryFilter';

interface LinksDataTypesWithColor extends LinksDataTypes {
  color: string;
  borderColor: string;
  noFinalDate?: boolean;
}

const Links = ({ visibleAttributes }: { visibleAttributes: string[]}) => {
  const { getLinksDataCopy } = useLinksDataContext();
  const { convertDateToPositionPx, todayMmDdYyyy, displayDate } = useDateContext();
  const { holdings } = useHoldings();

    // 1. Filter: only keep links whose attribute is visible in the left table

  const isVisible = useVisibleHistoryFilter(holdings);
  // useVisibleAttributeIdSet

  const { cellTopPx, deleteLink } = useLinksDataContext();
  const messageOver = useMessageOverContext();
  const linkToDelete = useRef<LinksDataTypesWithColor | null>(null);

  const rawLinks = typeof getLinksDataCopy === 'function' ? getLinksDataCopy() : [];
  // const filteredLinks = rawLinks.filter(i => )
  const filteredLinks = rawLinks.filter((link) =>
    visibleAttributes.includes(link.attributeId)
  );

  const linksDataCopy = Array.isArray(filteredLinks) ? (filteredLinks as LinksDataTypesWithColor[]) : [];
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
    console.log("onInfoClicked =>> linkData", linkData);
  }

    // 3. Compute visible row index (based on visible attributes array, not raw attributeIndex)
    const getVisibleRowTop = (attributeId: string) => {
      const idx = visibleAttributes.indexOf(attributeId);
      return idx >= 0 ? idx * CELL_HEIGHT_PX : -9999;
    };

  return (
    <tr>
      <th>
        {linksDataCopy.map((linkData) => {
          console.log(" =>> linkData.firstDayDate", linkData.firstDayDate);
          const style = {
            top: cellTopPx(linkData.portfolioIndex, linkData.attributeIndex),
            left: convertDateToPositionPx(linkData.firstDayDate),
            width: convertDateToPositionPx(linkData.lastDayDate, 1) - convertDateToPositionPx(linkData.firstDayDate),
            height: CELL_HEIGHT_PX - 2,
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
