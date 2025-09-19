import { MenuItem, OutlinedInput, Pagination, Select, SelectChangeEvent } from '@mui/material';
import { FOOTER_HEIGHT, HOLDINGS_PER_PAGE_DEFAULT, MAIN_BORDER_COLOR } from '../../config';
import './Footer.css';
import { useLinksDataContext } from '../../context/LinksDataProvider';
import { useState } from 'react';

export interface FooterProps {

}

const Footer = () => {
  const { totalHoldings, setPageToShow } = useLinksDataContext();
  const [holdingsPerPage, setHoldingsPerPage] = useState(HOLDINGS_PER_PAGE_DEFAULT);

  console.log("12 ==>> totalHoldings", totalHoldings);

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    console.log("13 ==>> value", value);
    setPageToShow(value);
  }

  const handleChange = (event: SelectChangeEvent) => {
    setHoldingsPerPage(+(event.target.value));
  };

  console.log("14 ==>> holdingsPerPage", holdingsPerPage);

  return (
    <div className="holdings-history-footer" style={{ height: FOOTER_HEIGHT, borderColor: MAIN_BORDER_COLOR }}>
      <div>
        {/* EDIT BUTTON */}
      </div>
      <div className="holdings-history-footer-pagination" style={{ borderColor: MAIN_BORDER_COLOR }}>
        <div style={{ fontSize: '15px', marginBottom: '4px' }}>Holdings per page:</div>
        <div style={{ position: 'relative', marginLeft: '8px' }}>
          <Select
            displayEmpty
            labelId="demo-simple-select-disabled-label"
            id="demo-simple-select-disabled"
            value={holdingsPerPage.toString()}
            label="Holdings per page"
            onChange={handleChange}
            size="small"
            input={<OutlinedInput />}
            sx={{ width: 80, fontSize: '15px' }}
          >
            {/* <MenuItem value="">
              <em>{holdingsPerPage}</em>
            </MenuItem> */}
            <MenuItem sx={{ fontSize: '15px' }} value="5">{' 5 '}</MenuItem>
            <MenuItem sx={{ fontSize: '15px' }} value="10">10</MenuItem>
            <MenuItem sx={{ fontSize: '15px' }} value="20">20</MenuItem>
            <MenuItem sx={{ fontSize: '15px' }} value={200}>200</MenuItem>
          </Select>

        </div>
        <div style={{ border: `1px solid ${MAIN_BORDER_COLOR}`, padding: '6px', borderRadius: '4px', marginLeft: '40px' }}>
          <Pagination onChange={handlePaginationChange} count={Math.ceil(totalHoldings / holdingsPerPage)} size="small" />
        </div>
      </div>
    </div>
  );
}

export default Footer
