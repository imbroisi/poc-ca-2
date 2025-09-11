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

interface LinksDataTypesWithColor extends LinksDataTypes {
  color: string;
  borderColor: string;
  noFinalDate?: boolean;
}

const Links = () => {
  const { getLinksDataCopy, cellTopPx, deleteLink } = useLinksDataContext();
  const { convertDateToPositionPx, todayMmDdYyyy, displayDate } = useDateContext();
  const messageOver = useMessageOverContext();
  const linkToDelete = useRef<LinksDataTypesWithColor | null>(null);

  const linksDataCopy = getLinksDataCopy() as LinksDataTypesWithColor[];
  
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

  return (
    <tr>
      <th>
        {linksDataCopy.map((linkData) => {
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
