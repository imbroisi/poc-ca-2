import { useMainTableContext } from '../../context/MainTableContext';
import RowMonthAsGroup from '../RowMonthAsGroup';
import RowYear from '../RowYear';

const RowHeaderGroup = () => {
  const { model } = useMainTableContext();

  return (
    <>
      {model === 'year-month' && <RowYear />}
      {model === 'month-day' && <RowMonthAsGroup />}
    </>
  );
}

export default RowHeaderGroup;
