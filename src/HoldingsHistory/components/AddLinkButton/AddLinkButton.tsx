import { useLinksDataContext } from '../../context/LinksDataProvider';
import './AddLinkButton.css';
import { useDateContext } from '../../context/DateContext';
import { CELL_HEIGHT_PX } from '../../config';

export interface AddLinkButtonProps {

}

const AddLinkButton = (props: AddLinkButtonProps) => {
  const { totalAttributes, rowsToRender, cellTopPx } = useLinksDataContext();
  const { todayPositionPx, convertDateToPositionPx } = useDateContext();
  const { getLinksDataCopy } = useLinksDataContext();

  const linksDataCopy = getLinksDataCopy();

  const handleAddLink = (indexRow: number, indexColumn: number) => {
    console.log("handleAddLink =", indexRow, indexColumn);
  }

  return (
    <>
      {Array.from({ length: rowsToRender / (totalAttributes + 1) }).map((_, indexRow) => (
        Array.from({ length: totalAttributes }).map((_, indexColumn) => {
          let newer = todayPositionPx;

          linksDataCopy.forEach((linkData) => {
            if (linkData.portfolioIndex !== indexRow || linkData.attributeIndex !== indexColumn) return;

            const thisPositionPx = convertDateToPositionPx(linkData.firstDayDate);
            if (thisPositionPx < newer) {
              newer = thisPositionPx;
            }
          });

          return (
            <div
              key={indexRow + indexColumn}
              className="add-link-button"
              role="button"
              onClick={() => handleAddLink(indexRow, indexColumn)}
              style={{
                top: cellTopPx(indexRow, indexColumn),
                left: newer - 20,
              }}>
              +
            </div>
          )
        }
        )))}
    </>
  );
}

export default AddLinkButton;