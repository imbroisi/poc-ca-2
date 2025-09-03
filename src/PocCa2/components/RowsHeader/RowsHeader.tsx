import { useMainTableContext } from '../../context/MainTableContext';
import RowDay from '../RowDay';
import RowMonth from '../RowMonth';
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
