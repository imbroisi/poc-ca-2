/* istanbul ignore file */
// TODO: test this component

import { LINKS_BORDERS_COLORS, LINKS_COLORS } from '../config';
import { useDateContext } from '../context/DateContext';
import { LinksDataTypes, useLinksDataContext } from '../context/LinksDataProvider';

interface LinksDataTypesWithColor extends LinksDataTypes {
  color: string;
  borderColor: string;
  noFinalDate?: boolean;
}

const useLinks = ({ show, cellsCoord }: { show: boolean[], cellsCoord: any }) => {
  const { getLinksDataCopy } = useLinksDataContext();
  const { todayYyyyMmDd } = useDateContext();
  // const { deleteLink } = useLinksDataContext();
  // const messageOver = useMessageOverContext();
  // const linkToDelete = useRef<LinksDataTypesWithColor | null>(null);
  const processLinks = () => {

    if (!show) return;

    const filteredLinks = getLinksDataCopy();
    const linksDataCopy = filteredLinks as LinksDataTypesWithColor[];

    const replaceToday = () => {
      linksDataCopy.forEach((linkData) => {
        if (linkData.lastDayDate === 'today') {
          linkData.lastDayDate = todayYyyyMmDd;
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
        group.sort((a, b) => new Date((b).firstDayDate).getTime() - new Date((a).firstDayDate).getTime())
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

    // const onDeleteClicked = (linkData: LinksDataTypesWithColor, mousePosition: [number, number]) => {
    //   linkToDelete.current = linkData;
    //   messageOver.setPosition([mousePosition[0] - 20, mousePosition[1] - 110]);
    //   messageOver.setConfirmButtonText('Delete');
    //   messageOver.open(
    //     <MessageOverDelete linkData={linkData} />
    //   );
    //   messageOver.onConfirm(() => {
    //     if (linkToDelete.current) {
    //       deleteLink(linkToDelete.current);
    //     }
    //   });
    // }

    // const onInfoClicked = (linkData: LinksDataTypesWithColor, mousePosition: [number, number]) => {
    //   // TODO: implement this
    //   // console.log("onInfoClicked =>> linkData", linkData);
    // }

    show.forEach((_, index) => {
      linksDataCopy.forEach((linkData) => {
        if (linkData.portfolioIndex === index) {
          cellsCoord.current[linkData.portfolioIndex][linkData.attributeIndex].drawLinks(linkData);
        }
      })
    })
  }

  return processLinks;
}

export default useLinks;
