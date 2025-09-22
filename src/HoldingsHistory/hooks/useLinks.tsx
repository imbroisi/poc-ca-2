/* istanbul ignore file */
// TODO: test this component

import { ATTRIBUTES, ATTRIBUTES_IDS, ATTRIBUTES_IDS_DISABLED, LINKS_BORDERS_COLORS, LINKS_BORDERS_COLORS_DISABLED, LINKS_COLORS, LINKS_COLORS_DISABLED } from '../config';
import { useDateContext } from '../context/DateContext';
import { LinksDataTypes, useLinksDataContext } from '../context/LinksDataProvider';

interface LinksDataTypesWithColor extends LinksDataTypes {
  color: string;
  borderColor: string;
  noFinalDate?: boolean;
}

const useLinks = ({ show, cellsCoord }: { show: boolean[] | null, cellsCoord: any }) => {
  const { getLinksDataCopy, getHoldingsFilteredByPage, pageToShow, holdingsPerPage } = useLinksDataContext();
  const { todayYyyyMmDd } = useDateContext();
  // const { deleteLink } = useLinksDataContext();
  // const messageOver = useMessageOverContext();
  // const linkToDelete = useRef<LinksDataTypesWithColor | null>(null);


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
        console.log("1001 ==>> sortedLinks", sortedLinks);
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


    // console.log("1000 ==>> filteredLinks", filteredLinks);
    const formatedLinks = formatLinks(filteredLinks);


    // console.log("1001 ==>> formatedLinks", formatedLinks);


    const replaceToday = () => {
      formatedLinks.forEach((linkData: any) => {
        if (linkData.endEffectiveDate === 'today') {
          linkData.endEffectiveDate = todayYyyyMmDd;
          linkData.noFinalDate = true;
        }
      });
    }

    // const includeColorsToLinks = () => {
    //   // const splitIntoGroups = (data: any[]) => {
    //   //   const groups = data.reduce((acc, linkData) => {
    //   //     const key = `${linkData.holdingIndex}-${linkData.localAttributeIndex}`;
    //   //     if (!acc[key]) acc[key] = [];
    //   //     acc[key].push(linkData as LinksDataTypesWithColor);
    //   //     return acc;
    //   //   }, {} as { [key: string]: LinksDataTypesWithColor[] });

    //   //   return Object.values(groups);
    //   // };

    //   // const sortedGroups = splitIntoGroups(formatedLinks).map((group: any) =>
    //   //   group.sort((a: any, b: any) => new Date(b.startEffectiveDate).getTime() - new Date((a).startEffectiveDate).getTime())
    //   // ).flat();

    //   // // console.log("1002 ==>> sortedGroups", sortedGroups);

    //   // sortedGroups.forEach((linkData: any, index: number) => {
    //   //   linkData.color = LINKS_COLORS[index % LINKS_COLORS.length];
    //   //   linkData.borderColor = LINKS_BORDERS_COLORS[index % LINKS_BORDERS_COLORS.length];
    //   // });
    // };

    replaceToday();


    console.log("1003 ==>> formatedLinks", formatedLinks);


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
      formatedLinks.forEach((linkData: any) => {
        if (linkData.holdingPaginedIndex === index) {
          console.log("2001 ==>> writing linkData", linkData);
          cellsCoord.current[linkData.holdingPaginedIndex][linkData.attributeIndex].drawLinks(linkData);
        }
      })
    })
  }

  // console.log("20002==>> cellsCoord", cellsCoord.current);

  return processLinks;
}

export default useLinks;
