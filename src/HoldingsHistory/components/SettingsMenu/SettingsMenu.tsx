import { MAIN_BORDER_COLOR } from '../../config';
import FilterAttributes from '../FilterAttributes';
import filterByImage from '../../mock/filter-by.png';
import excludeLiquidated from '../../mock/exclude-liquidated.png';
import './SettingsMenu.css';

export interface SettingsMenuProps {

}

const SettingsMenu = (props: SettingsMenuProps) => {
  return (
    <div
      style={{
        width: '248px',
        minWidth: '248px',
        maxWidth: '248px',
        height: '100%',
        backgroundColor: 'white',
        border: `1px solid ${MAIN_BORDER_COLOR}`,
        marginRight: '14px',
        boxSizing: 'border-box',
        flexShrink: 0,
        fontSize: '11px',
      }}
    >
      <div style={{
        height: '42px', width: '100%',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        paddingLeft: '6px',
        backgroundColor: 'white',
      }}>
        Settings
      </div>

      <div style={{
        height: '31px', width: '100%', backgroundColor: '#f9f9f9',
        borderTop: '1px solid #e0e0e0', borderBottom: '1px solid #e0e0e0',
        boxSizing: 'border-box',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'left',
        paddingLeft: '16px',
        fontSize: '12px',
        fontWeight: 600,
        textTransform: 'uppercase',
      }}>
        Filters
      </div>

        <div>
          <img src={filterByImage} alt="Filter by" />
        </div>

      <FilterAttributes />
      <div>
          <img src={excludeLiquidated} alt="Filter by" />
        </div>
    </div>
  );
}

export default SettingsMenu;
