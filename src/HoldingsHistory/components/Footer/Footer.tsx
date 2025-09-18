import { FOOTER_HEIGHT } from '../../config';
import './Footer.css';

export interface FooterProps {

}

const Footer = (props: FooterProps) => {
  return (
    <div className="holdings-history-footer" style={{ height: FOOTER_HEIGHT }}>
      <div>
        EDIT 
      </div>
      <div>
        PAGINATION
      </div>
    </div>
  );
}

export default Footer
