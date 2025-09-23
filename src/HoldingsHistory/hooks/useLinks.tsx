/* istanbul ignore file */
// TODO: test this component

import { ATTRIBUTES_IDS_DISABLED, LINKS_BORDERS_COLORS, LINKS_BORDERS_COLORS_DISABLED, LINKS_COLORS, LINKS_COLORS_DISABLED } from '../config';
import { useDateContext } from '../context/DateContext';
import { LinksDataTypes, useLinksDataContext } from '../context/LinksDataProvider';

const useLinks = ({ show, cellsCoord }: { show: boolean[] | null, cellsCoord: any }) => {
  const { getHoldingsFilteredByPage, pageToShow, holdingsPerPage } = useLinksDataContext();
  const { todayYyyyMmDd } = useDateContext();

  const formatLinks = (links: LinksDataTypes[]) => {
    const formatedLinks: any = [];
    links.forEach((link, holdingPaginedIndex) => {
      link.valueLinks.forEach((valueLink, attributeIndex) => {
        formatedLinks.push({
          ...link,
          ...valueLink,
          holdingPaginedIndex,
          holdingRealIndex: holdingPaginedIndex + (pageToShow - 1) * holdingsPerPage,
          attributeIndex: valueLink.attributeId - 1,
        });
      });
    });

    return formatedLinks;
  }

  const processLinks = () => {
    if (!show) return;

    const includeColorsToLinks = () => {
      filteredLinks.forEach((linkData: any, index: number) => {
        const sortedLinks = linkData.valueLinks.sort((a: any, b: any) => new Date(b.startEffectiveDate).getTime() - new Date((a).startEffectiveDate).getTime());
        // console.log("1001 ==>> sortedLinks", sortedLinks);
        sortedLinks.forEach((linkData: any, index: number) => {
          if (!linkData.label) {
            linkData.color = 'transparent';
            linkData.borderColor = 'transparent';
          } else if (ATTRIBUTES_IDS_DISABLED[linkData.attributeId]) {
            linkData.color = LINKS_COLORS_DISABLED[index % LINKS_COLORS_DISABLED.length];
            linkData.borderColor = LINKS_BORDERS_COLORS_DISABLED[index % LINKS_BORDERS_COLORS_DISABLED.length];
          } else {
            linkData.color = LINKS_COLORS[index % LINKS_COLORS.length];
            linkData.borderColor = LINKS_BORDERS_COLORS[index % LINKS_BORDERS_COLORS.length];
          }
        });

      });
    }

    const filteredLinks = getHoldingsFilteredByPage();
    includeColorsToLinks();

    const formatedLinks = formatLinks(filteredLinks);

    const replaceToday = () => {
      formatedLinks.forEach((linkData: any) => {
        if (linkData.endEffectiveDate === 'today') {
          linkData.endEffectiveDate = todayYyyyMmDd;
          linkData.noFinalDate = true;
        }
      });
    }

    replaceToday();

    show.forEach((_, index) => {
      formatedLinks.forEach((linkData: any) => {
        if (linkData.holdingPaginedIndex === index) {
          cellsCoord.current[linkData.holdingPaginedIndex][linkData.attributeIndex].drawLinks(linkData);
        }
      })
    })
  }

  return processLinks;
}

export default useLinks;
