import './TodayLine.css';
import { TODAY_LINE_COLOR } from '../../config';

export interface TodayLineProps {
  left: number;
  height: number;
}

const TodayLine = ({ left, height}: TodayLineProps) => {
  return (
    <div
    style={{
      position: 'absolute',
      top: 0,// `${verticalLine.startV}px`,
      left,
      width: 2,
      // height: `${verticalLine.endV - verticalLine.startV}px`,
      height, //: CELL_HEIGHT_PX + 1,
      backgroundColor: TODAY_LINE_COLOR,
      pointerEvents: 'none',
      zIndex: 1000,
    }}
  />
  );
}

export default TodayLine;
