import { useEffect, useMemo, useState } from 'react';
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
}

const Cell = ({ content = '', rowIndex, columnIndex, colSpaned = 1 }: CellProps) => {
  const { registerCallbacks, onClick } = useCellManager();
  const [blockPlacement, setBlockPlacement] = useState<any>(null);
  const [rerenderParams, setRerenderParams] = useState({
    color: '#444444',
    // borderVisible: true,
  });

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

  // return null
  const borderVisible = colSpaned > 1 || columnIndex % CELL_MONTH_WIDTH_PX_SLICES === 0;

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
