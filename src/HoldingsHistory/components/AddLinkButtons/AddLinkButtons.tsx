import { useLinksDataContext } from '../../context/LinksDataProvider';
import './AddLinkButtons.css';
import { useDateContext } from '../../context/DateContext';

const AddLinkButtons = () => {
  const { totalAttributes, rowsToRender, cellTopPx } = useLinksDataContext();
  const { todayPositionPx, convertDateToPositionPx } = useDateContext();
  const { getLinksDataCopy } = useLinksDataContext();

  const linksDataCopy = getLinksDataCopy();

  const handleAddLink = (indexRow: number, indexColumn: number) => {
    console.log("handleAddLink =", indexRow, indexColumn);
  }

  return (
    <tr>
      <th>
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
      </th>
    </tr>
  );
}

export default AddLinkButtons;