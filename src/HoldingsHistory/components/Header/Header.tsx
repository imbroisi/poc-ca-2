import { CELL_BORDER_COLOR, CELL_HEIGHT_PX } from '../../config';
import { useDateContext } from '../../context/DateContext';
import YearsRow from '../YearsRow';
import './Header.css';

const Header = () => {
  const { numberOfYears } = useDateContext();

  return (
    <thead className="header">
      <tr>
        <th colSpan={numberOfYears} className="history-label">
          History
        </th>
      </tr>
      <tr>
        <YearsRow />
      </tr>
      <tr>
        {/* Empty row, same position as filters row */}
        <th
          colSpan={numberOfYears}
          className="header-cell"
          style={{ borderColor: CELL_BORDER_COLOR }}
        />
      </tr>
    </thead>
  );
};

export default Header;
