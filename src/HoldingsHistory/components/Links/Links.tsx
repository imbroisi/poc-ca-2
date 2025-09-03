import { CELL_HEIGHT_PX, LINKS_BORDERS_COLORS, LINKS_COLORS } from '../../config';
import { useDateContext } from '../../context/DateContext';
import { LinksDataTypes, useLinksDataContext } from '../../context/LinksDataProvider';
import './Links.css';

interface LinksDataTypesWithColor extends LinksDataTypes {
  color: string;
  borderColor: string;
  noFinalDate?: boolean;
}

const Links = () => {
  const { getLinksDataCopy } = useLinksDataContext();
  const { convertDateToPositionPx, todayMmDdYyyy } = useDateContext();
  const { totalAttributes, cellTopPx } = useLinksDataContext();

  const linksDataCopy = getLinksDataCopy() as LinksDataTypesWithColor[];

  const replaceToday = () => {
    linksDataCopy.forEach((linkData) => {
      console.log("linkData.lastDayDate =", linkData.lastDayDate);
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

  console.log("linksDataCopy =", linksDataCopy);

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
          const label = `${linkData.firstDayDate} - ${linkData.noFinalDate ? '' : linkData.lastDayDate}`;

          return (
            <div
              key={key}
              className="links-rectangle"
              style={style}
            >
              {label}
            </div>
          )
        })} 
      </th>
    </tr>
  );
}

export default Links;
