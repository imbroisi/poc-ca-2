import { Pagination } from '@mui/material';
import { FOOTER_HEIGHT, MAIN_BORDER_COLOR } from '../../config';
import './Footer.css';

export interface FooterProps {

}

const Footer = () => {
  return (
    <div className="holdings-history-footer" style={{ height: FOOTER_HEIGHT, borderColor: MAIN_BORDER_COLOR }}>
      <div>
        EDIT 
      </div>
      <div style={{ marginRight: '20px', border: '1px solid #ccc', padding: '4px', borderRadius: '4px' }}>
        <Pagination count={10} size="small" />
      </div>
    </div>
  );
}

export default Footer
