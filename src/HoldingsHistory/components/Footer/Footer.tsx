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
  console.log("98 ================>> holdingsPerPage", holdingsPerPage);

  return (
    <div className="holdings-history-footer" style={{ height: FOOTER_HEIGHT, borderColor: MAIN_BORDER_COLOR }}>
      <div>
        {/* EDIT BUTTON */}
      </div>
      <div className="holdings-history-footer-pagination" style={{ borderColor: MAIN_BORDER_COLOR, visibility: showPagination ? 'visible' : 'hidden' }}>
        <div style={{ fontSize: '15px', marginBottom: '4px' }}>Total holdings: <span style={{ fontWeight: 'bold' }} >{totalHoldings}</span></div>
        
        
        <div style={{ fontSize: '15px', marginBottom: '4px', marginLeft: '32px' }}>Holdings per page:</div>
        <div style={{ position: 'relative', marginLeft: '8px' }}>
          <Select
            displayEmpty
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
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
            <MenuItem sx={{ fontSize: '15px' }} value={Infinity}>ALL</MenuItem>
          </Select>

        </div>
        <div style={{ border: `1px solid ${MAIN_BORDER_COLOR}`, padding: '6px', borderRadius: '4px', marginLeft: '40px' }}>
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
