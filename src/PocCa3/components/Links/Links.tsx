import { CELL_HEIGHT_PX, LINKS_COLORS } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './Links.css';

export interface LinksProps {
  linksData?: LinksData[];
}

interface LinksData {
  id: string;
  portfolioIndex: number;
  attributeIndex: number;
  color?: string;
  firstDayDate: string;
  lastDayDate: string;
  combined?: string;
  linksData?: LinksData[];
}

const linksDataTEST: LinksData[] = [
  { id: '1', portfolioIndex: 0, attributeIndex: 1, firstDayDate: '04/03/2023', lastDayDate: '12/31/2023' },
  { id: '2', portfolioIndex: 2, attributeIndex: 2, firstDayDate: '06/15/2023', lastDayDate: '08/30/2023' },
  { id: '3', portfolioIndex: 0, attributeIndex: 1, firstDayDate: '03/01/2024', lastDayDate: '03/15/2024' },
  { id: '4', portfolioIndex: 0, attributeIndex: 1, firstDayDate: '08/15/2024', lastDayDate: '03/15/2025' },
  { id: '5', portfolioIndex: 0, attributeIndex: 0, firstDayDate: '10/16/2024', lastDayDate: '12/31/2024' },
  { id: '6', portfolioIndex: 1, attributeIndex: 1, firstDayDate: '01/01/2024', lastDayDate: '03/20/2024' },
];

// const prepareLinksData = (linksData: LinksData[]): LinksData[] => {
//   // First, group linksData by portfolioIndex
//   const portfolioGroups = linksData.reduce((groups, linkData) => {
//     const portfolio = linkData.portfolioIndex;
//     if (!groups[portfolio]) {
//       groups[portfolio] = [];
//     }
//     groups[portfolio].push(linkData);
//     return groups;
//   }, {} as { [key: number]: LinksData[] });

//   // Sort each portfolio group by attributeIndex in reverse
//   Object.values(portfolioGroups).forEach(group => {
//     group.sort((a, b) => b.attributeIndex - a.attributeIndex);
//   });

//   // Flatten the groups back into an array, maintaining portfolio order
//   return Object.keys(portfolioGroups)
//     .sort((a, b) => Number(a) - Number(b)) // Sort portfolio indices ascending
//     .flatMap(portfolio => portfolioGroups[Number(portfolio)]);
// };





const Links = ({ linksData = linksDataTEST }: LinksProps) => {
  const { convertDateToPositionPx, totalAttributes } = useDateContext();

  // ordering links to set their colors
  const prepareLinksData = () => {
    const splitIntoGroups = (linksData: LinksData[]): LinksData[][] => {
      const groups = linksData.reduce((acc, linkData) => {
        const key = `${linkData.portfolioIndex}-${linkData.attributeIndex}`;
        if (!acc[key]) acc[key] = [];
        acc[key].push(linkData);
        return acc;
      }, {} as { [key: string]: LinksData[] });

      return Object.values(groups);
    };

    const sortedGroups = splitIntoGroups(linksData).map(group =>
      group.sort((a, b) => new Date(a.firstDayDate).getTime() - new Date(b.firstDayDate).getTime())
    );

    sortedGroups.forEach((group) => {
      group.forEach((linkData, index) => {
        linkData.color = LINKS_COLORS[index % LINKS_COLORS.length];
      });
    });
    
    // for (const group of sortedGroups) {
    // //    group.forEach((linkData, index) => {
    // //     linkData.color = LINKS_COLORS[index % LINKS_COLORS.length];
    // //   });
    // // }

    return sortedGroups.flat();
  };

  const linksDataReady = prepareLinksData();

  return (
    <tr>
      <th>
        {linksDataReady.map((linkData: LinksData) => {
          const left = convertDateToPositionPx(linkData.firstDayDate);
          const width = convertDateToPositionPx(linkData.lastDayDate, 1) - left;
          const top = CELL_HEIGHT_PX + 2 + (CELL_HEIGHT_PX + 1) * ((1 + totalAttributes) * linkData.portfolioIndex + linkData.attributeIndex);
          const height = CELL_HEIGHT_PX - 2;
          const backgroundColor = linkData.color;

          return (
            <div
              key={linkData.id}
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
