import { useMainTableContext } from '../../context/MainTableContext';
import RowDay from '../RowDay';
import RowHeaderGroup from '../RowHeaderGroup';
import RowMonth from '../RowMonth';
import RowMonthAsSubGroup from '../RowMonthAsSubGroup';
import RowYear from '../RowYear';

const RowsHeader = () => {
  const { model } = useMainTableContext();

  return (
    <>
      {model === 'year-month' && <RowYear />}
      <RowMonth />
      {model === 'month-day' && <RowDay />}
    </>
  );
}

export default RowsHeader;
