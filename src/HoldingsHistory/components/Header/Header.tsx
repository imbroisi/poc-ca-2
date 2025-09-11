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
        {Array.from({ length: numberOfYears }).map((_, index) => (
          <th
            key={index}
            className="header-cell"
            style={{ height: CELL_HEIGHT_PX, borderColor: CELL_BORDER_COLOR }}
          />
        ))}
      </tr>
    </thead>
  );
};

export default Header;
