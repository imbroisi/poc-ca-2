import { useEffect, useMemo, useState } from 'react';
import CellUi from './CellUi';
import './Cell.css';
import { useCellManager } from '../../context/CellManagerContext';
import LinkBox from '../LinkBox';

export interface CellProps {
  rowIndex: number;
  columnIndex: number;
}

const Cell = ({ rowIndex, columnIndex }: CellProps) => {
  const { registerCallbacks, onClick } = useCellManager();
  const [blockPlacement, setBlockPlacement] = useState<any>(null);
  const [rerenderParams, setRerenderParams] = useState({
    color: 'red',
    background: 'white',

    borderColor: '#ddd',
    borderVisible: true,
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

  console.log('blockPlacement', blockPlacement);

  return (
    <div style={{ position: 'relative' }}>
      {blockPlacement && (
        <LinkBox
          startCellString={blockPlacement.blockStart}
          endCellString={blockPlacement.blockEnd}
          cellWidthPx={32}
          onClick={handleBlockClick}
        />
      )}
      <CellUi onClick={handleCellClick} {...rerenderParams} />
    </div>
  );
}

export default Cell;
