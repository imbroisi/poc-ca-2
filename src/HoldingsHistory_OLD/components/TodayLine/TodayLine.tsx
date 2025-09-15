import './TodayLine.css';
import { CELL_HEIGHT_PX, TODAY_LINE_COLOR } from '../../config';

export interface TodayLineProps {
  left: number;
  rowsToRender: number;
}

const TodayLine = ({ left, rowsToRender }: TodayLineProps) => {
  const height = CELL_HEIGHT_PX * (rowsToRender + 1) - 4;
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
