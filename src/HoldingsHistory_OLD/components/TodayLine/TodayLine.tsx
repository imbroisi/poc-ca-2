import './TodayLine.css';
import { ATTRIBUTE_ITEM_HEIGHT, TODAY_LINE_COLOR } from '../../config';

export interface TodayLineProps {
  left: number;
  rowsToRender: number;
}

const TodayLine = ({ left, rowsToRender }: TodayLineProps) => {
  const height = ATTRIBUTE_ITEM_HEIGHT * (rowsToRender + 1) - 4;
  return (
    <tr>
      <th>
        <div
          className="today-line"
          style={{
            left,
            height,
            '--today-line-color': TODAY_LINE_COLOR,
          } as React.CSSProperties}
        >
          <div className="triangle-down" />
          <div className="triangle-up" />
        </div>
      </th>
    </tr>
  );
}

export default TodayLine;
