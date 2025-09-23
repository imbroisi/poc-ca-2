import { MenuItem, OutlinedInput, Pagination, Select, SelectChangeEvent } from '@mui/material';
import { FOOTER_HEIGHT, HOLDINGS_PER_PAGE_DEFAULT, HOLDINGS_PER_PAGE_OPTIONS, MAIN_BORDER_COLOR } from '../../config';
import './Footer.css';
import { useLinksDataContext } from '../../context/LinksDataProvider';

export interface FooterProps {

}

const Footer = () => {
  const { totalHoldings, setPageToShow, holdingsPerPage, setHoldingsPerPage, pageToShow } = useLinksDataContext();

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPageToShow(value);
  }

  const handleChangeHoldingsPerPage = (event: SelectChangeEvent) => {
    setHoldingsPerPage(+(event.target.value));
  };

  const showPagination = totalHoldings > 0;

  return (
    <div className="holdings-history-footer" style={{ height: FOOTER_HEIGHT, borderColor: MAIN_BORDER_COLOR, backgroundColor: 'white' }}>
      <div>
        {/* TODO: EDIT BUTTON */}
      </div>
      <div className="holdings-history-footer-pagination" style={{ borderColor: MAIN_BORDER_COLOR, visibility: showPagination ? 'visible' : 'hidden' }}>
        <div className="holdings-history-footer-total-holdings">Total holdings:
          <span className="holdings-history-footer-total-holdings-span"> {totalHoldings}</span>
        </div>
        <div className='holdings-history-footer-holdings-per-page'>
          Holdings per page:
        </div>
        <div>
          <Select
            displayEmpty
            labelId="holdings-history-select-disabled-label"
            id="holdings-history-demo-simple-select-disabled"
            value={holdingsPerPage.toString()}
            label="Holdings per page"
            onChange={handleChangeHoldingsPerPage}
            size="small"
            input={<OutlinedInput />}
            sx={{ width: 80, fontSize: '15px' }}
          >
            {HOLDINGS_PER_PAGE_OPTIONS.map((option) => (
              <MenuItem key={option} sx={{ fontSize: '15px' }} value={option}>{option}</MenuItem>
            ))}
            {/* TODO: will we show this option? */}
            {/* <MenuItem sx={{ fontSize: '15px' }} value={Infinity}>ALL</MenuItem> */}
          </Select>

        </div>
        <div
          className="holdings-history-footer-pagination-select"
          style={{ borderColor: MAIN_BORDER_COLOR }}
        >
          <Pagination
            key={`pagination-${pageToShow}-${holdingsPerPage}`}
            page={pageToShow}
            onChange={handlePaginationChange}
            count={Math.ceil(totalHoldings / holdingsPerPage)}
            size="small"
          />
        </div>
      </div>
    </div>
  );
}

export default Footer
