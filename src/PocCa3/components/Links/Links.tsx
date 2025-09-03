import { CELL_HEIGHT_PX, LINKS_COLORS } from '../../config';
import { useDateContext } from '../../context/DateContext';
import { LinksDataTypes, useLinksDataContext } from '../../context/LinksDataProvider';
import './Links.css';

interface LinksDataTypesWithColor extends LinksDataTypes {
  color: string;
}

const Links = () => {
  const { linksData } = useLinksDataContext();
  const { convertDateToPositionPx } = useDateContext();
  const { totalAttributes } = useLinksDataContext();

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
  
    const sortedGroups = splitIntoGroups(linksData).map(group =>
      group.sort((a, b) => new Date((a).firstDayDate).getTime() - new Date((b).firstDayDate).getTime())
    );
  
    sortedGroups.forEach((group) => {
      group.forEach((linkData, index) => {
        (linkData).color = LINKS_COLORS[index % LINKS_COLORS.length];
      });
    });
  
    return sortedGroups.flat();
  };

  const linksDataWithColors = includeColorsToLinks();

  return (
    <tr>
      <th>
        {linksDataWithColors.map((linkData) => {
          const left = convertDateToPositionPx(linkData.firstDayDate);
          const width = convertDateToPositionPx(linkData.lastDayDate, 1) - left;
          const top = CELL_HEIGHT_PX + 2 + (CELL_HEIGHT_PX + 1) * ((1 + totalAttributes) * linkData.portfolioIndex + linkData.attributeIndex);
          const height = CELL_HEIGHT_PX - 2;
          const backgroundColor = linkData.color;

          return (
            <div
              key={`${(linkData).portfolioIndex}-${(linkData).attributeIndex}-${(linkData).firstDayDate}`}
              className="links-rectangle"
              style={{ top, left, width, height, backgroundColor }}
            />
          )
        })}
      </th>
    </tr>
  );
}

export default Links;
