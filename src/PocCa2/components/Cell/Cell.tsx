import { useEffect, useMemo, useRef, useState } from 'react';
import CellUi from './CellUi';
import './Cell.css';
import { useCellManager } from '../../context/CellManagerContext';
import LinkBox from '../LinkBox';
import { MAIN_TABLE } from '../../config';

const { CELL_MONTH_WIDTH_PX_SLICES } = MAIN_TABLE;
export interface CellProps {
  rowIndex: number | string;
  columnIndex: number;
  content?: string;
  colSpaned?: number;
  month?: number;
  borderVisible?: boolean;
}

const Cell = ({ content = '', rowIndex, columnIndex, borderVisible = false, colSpaned = 1 }: CellProps) => {
  const { registerCallbacks, onClick } = useCellManager();
  const [blockPlacement, setBlockPlacement] = useState<any>(null);
  const [rerenderParams, setRerenderParams] = useState({
    color: '#444444',
    // borderVisible: true,
  });
  // const lastMonth = useRef(-1);

  const cellId = useMemo(() => `${rowIndex}-${columnIndex}`, [columnIndex, rowIndex]);

  const onFireCell = (obj: any) => {
    setRerenderParams({
      ...rerenderParams,
      ...obj,
    });
  }

  const onFireBlock = (start: string, end?: string) => {
    if (blockPlacement || !start) {
      setBlockPlacement(null);
      return;
    }
    console.log("33) ===>> end", end);
    setBlockPlacement({ blockStart: start, blockEnd: end || '' });
  }

  useEffect(() => {
    const callbacks = {
      onFireCell,
      onFireBlock,
    };

    registerCallbacks(cellId, callbacks);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleCellClick = () => {

    onClick(cellId, 'cell');
  }

  const handleBlockClick = () => {

    onClick(cellId, 'block');
  }

  // console.log('blockPlacement', blockPlacement);
  // console.log('callId', cellId)

  // const month = daysArray[columnIndex][1];

  // let borderVisible = colSpaned > 1;
  // if (!borderVisible && month !== lastMonth.current) {
  //   console.log("110) ===>> month lastMonth.current", month, lastMonth.current);
  //   lastMonth.current = month;
  //   borderVisible = true;
  // }

  // console.log("111) ===>> month", month);

  return (
    <div className="cell-container">
      {blockPlacement && (
        <LinkBox
          startCell={blockPlacement.blockStart}
          endCell={blockPlacement.blockEnd}
          onClick={handleBlockClick}
        />
      )}
      <CellUi
        content={content}
        onClick={handleCellClick}
        colSpaned={colSpaned}
        borderVisible={borderVisible}
        {...rerenderParams}
      />
    </div>
  );
}

export default Cell;
