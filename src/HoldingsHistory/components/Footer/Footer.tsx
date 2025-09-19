import { Pagination } from '@mui/material';
import { FOOTER_HEIGHT, HOLDINGS_PER_PAGE, MAIN_BORDER_COLOR } from '../../config';
import './Footer.css';
import { useLinksDataContext } from '../../context/LinksDataProvider';

export interface FooterProps {

}

const Footer = () => {
  const { totalHoldings, setPageToShow } = useLinksDataContext();

  console.log("12 ==>> totalHoldings", totalHoldings);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("13 ==>> value", value);
  }

  return (
    <div className="holdings-history-footer" style={{ height: FOOTER_HEIGHT, borderColor: MAIN_BORDER_COLOR }}>
      <div>
        {/* EDIT BUTTON */}
      </div>
      <div className="holdings-history-footer-pagination" style={{ borderColor: MAIN_BORDER_COLOR }}>
        <Pagination onChange={handlePaginationChange} count={Math.ceil(totalHoldings / HOLDINGS_PER_PAGE)} size="small" />
      </div>
    </div>
  );
}

export default Footer
