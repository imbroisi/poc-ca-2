import { HEADER_HEIGHT, MAIN_BORDER_COLOR } from '../../config';
import './Header.css';

const Header = () => {
  return (
    <div className="holdings-history-header"
      style={{
        height: HEADER_HEIGHT,
        borderColor: MAIN_BORDER_COLOR
      }}>
      Holdings
    </div>
  );
}

export default Header;
