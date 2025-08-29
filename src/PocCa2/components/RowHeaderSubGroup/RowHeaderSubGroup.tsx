import { useMainTableContext } from '../../context/MainTableContext';
import Columns from '../Columns';
import RowDay from '../RowDay';
import RowMonthAsSubGroup from '../RowMonthAsSubGroup';

const RowHeaderSubGroup = () => {
  const { model } = useMainTableContext();

  return (
    <>
      {/* {model === 'year-month' && <RowMonthAsSubGroup />}
      {model === 'month-day' && <RowDay columns={Columns} />} */}
    </>
  );
}

export default RowHeaderSubGroup;
