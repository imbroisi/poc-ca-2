import { CELL_HEIGHT_PX } from '../../config';
import { useDateContext } from '../../context/DateContext';
import './Links.css';

export interface LinksProps {

}

interface Rectangle {
  id: string;
  portfolioIndex: number;
  attributeIndex: number;
  color?: string;
  firstDayDate?: string;
  lastDayDate: string;
}

const rectangles: Rectangle[] = [
  { id: '1', portfolioIndex: 0, attributeIndex: 0, color: 'blue', firstDayDate: '01/01/2023', lastDayDate: '12/31/2023' },
  { id: '2', portfolioIndex: 1, attributeIndex: 1, color: 'green', firstDayDate: '01/01/2024', lastDayDate: '03/20/2024' },
  { id: '2', portfolioIndex: 2, attributeIndex: 0, color: 'red', firstDayDate: '06/15/2023', lastDayDate: '08/30/2023' },
  { id: '3', portfolioIndex: 2, attributeIndex: 1, color: 'orange', firstDayDate: '2023-07-20', lastDayDate: '10/20/2023' },
];

const Links = (props: LinksProps) => {
  const { convertDateToPositionPx, totalAttributes } = useDateContext();

  return (
    <tr>
      <th>
        {rectangles.map((rect: Rectangle) => {
          const left = convertDateToPositionPx(rect.firstDayDate);
          const width = convertDateToPositionPx(rect.lastDayDate, 1) - left;
          const top = CELL_HEIGHT_PX + 2 + (CELL_HEIGHT_PX + 1) * ((1 + totalAttributes) * rect.portfolioIndex + rect.attributeIndex);

          return (
            <div
              key={rect.id}
              className="links-rectangle"
              style={{
                top,
                left,
                width,
                height: CELL_HEIGHT_PX - 2,
                backgroundColor: rect.color || 'blue',
              }}
            />
          )
        })}
      </th>
    </tr>
  );
}

export default Links;
