import { useEffect, useMemo, useState } from 'react';
import { numberToStringCoordinate } from '../../utils';
import CellUi from './CellUi';
import './Cell.css';
import { useCellManager } from '../../context/CellManager';
import LinkBox from '../LinkBox';

export interface CellProps {
  coordinates: {
    rowIndex: number;
    columnIndex: number;
  }
}

const Cell = ({ coordinates }: CellProps) => {
  const { registerCallbacks, onClick } = useCellManager();
  const [blockPlacement, setBlockPlacement] = useState<{ blockStart: string, blockEnd: string } | null>(null);
  const [rerenderParams, setRerenderParams] = useState({
    color: 'red',
    background: 'white',
    borderColor: '#ddd',
    borderVisible: true,
  });

  const cellId = useMemo(() =>
    `${numberToStringCoordinate(coordinates.rowIndex)}-${numberToStringCoordinate(coordinates.columnIndex)}`
    , [coordinates.columnIndex, coordinates.rowIndex]);

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
