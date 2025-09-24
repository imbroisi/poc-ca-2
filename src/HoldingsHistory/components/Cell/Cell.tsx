import { memo, useEffect, useRef, useState } from 'react';
import styles from './Cell.module.scss';
import { ATTRIBUTE_ITEM_HEIGHT, MAIN_BORDER_COLOR, NUMBER_OF_YEARS, TOTAL_ATTRIBUTES, YEAR_CELL_WIDTH_PX } from '../../config';
import { useDateContext } from '../../context/DateContext';
import { useAttributeSelection } from '../../context/AttributeSelecionContext';
import { useLinksDataContext } from '../../context/LinksDataProvider';

export interface CellProps {
  showMe: boolean;
  label: string;
  holdingIdex: number;
  colIndex?: number;
  setCellCoord?: (holdingIdex: number, attributeIndex: number, drawLinks: any) => void;
}

const Cell = memo(({ showMe, label, holdingIdex, colIndex, setCellCoord }: CellProps) => {
  const [linkDataBulk, setLinkData] = useState<any[]>([]);
  const { convertDateToPositionPx } = useDateContext();
  const { checkedAttributes } = useAttributeSelection();
  const { pageToShow } = useLinksDataContext();
  const lastCheckedAttributes = useRef<boolean[]>([]);

  const transition = lastCheckedAttributes.current !== checkedAttributes
    ? 'none'
    : 'height 0.3s ease-in-out, opacity 0.3s ease-in-out'

  useEffect(() => {
    lastCheckedAttributes.current = checkedAttributes;
  }, [checkedAttributes]);

  // Clear links when page changes
  useEffect(() => {
    setLinkData([]);
  }, [pageToShow]);


  const drawLinks = (data: any) => {
    setLinkData((prev: any) => [...prev, data]);
  }

  const totalAttributesToRender = checkedAttributes.filter((attribute) => attribute).length;

  return (
    <div
      data-testid="cell"
      className={styles.tableCell}
      style={{
        height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT * (totalAttributesToRender + 1) + 1}px` : '0px',
        transition,
      }}>

      {/* Vertical lines for Years separation in attributes area */}
      {Array.from({ length: NUMBER_OF_YEARS }).map((_, yearIndex) => {
        return (
          <div
            data-testid="year-separator"
            key={yearIndex}
            style={{
              position: 'absolute',
              left: `${yearIndex * YEAR_CELL_WIDTH_PX - 1}px`,
              borderLeft: `1px solid ${MAIN_BORDER_COLOR}`,
              height: showMe && totalAttributesToRender > 0 ? `${ATTRIBUTE_ITEM_HEIGHT * (totalAttributesToRender + 1)}px` : '0px',
            }}>
          </div>
        );
      })}

      <div
        className={styles.tableCellAttributeContainer}
        style={{
          borderColor: MAIN_BORDER_COLOR,
          height: totalAttributesToRender > 0 ? '28px' : '0px',
        }} />

      {Array.from({ length: TOTAL_ATTRIBUTES }).map((_, attributeIndex) => {
        if (!checkedAttributes[attributeIndex]) return null;

        setCellCoord?.(holdingIdex, attributeIndex, drawLinks);

        return (
          <div
            key={attributeIndex}
            className={styles.tableCellAttribute}
            style={{
              height: showMe ? `${ATTRIBUTE_ITEM_HEIGHT}px` : 0,
            }}>

            {linkDataBulk.map((linkData, index) => (
              <div key={`${linkData?.holdingIndex}-${linkData?.attributeIndex}-${linkData?.startEffectiveDate}-${index}`}>
                {linkData?.attributeIndex === attributeIndex && (
                  <div
                    className={styles.tableCellLink}
                    style={{
                      right: convertDateToPositionPx(linkData?.endEffectiveDate) - 1,
                      height: ATTRIBUTE_ITEM_HEIGHT - 6,
                      width: convertDateToPositionPx(linkData?.startEffectiveDate) - convertDateToPositionPx(linkData?.endEffectiveDate),
                      backgroundColor: linkData?.color,
                      border: `1px solid ${linkData?.borderColor}`,
                    }}>
                    <span className={styles.tableCellLinkLabel}>
                      {linkData?.label || ''}
                    </span>
                  </div>
                )}
              </div>
            )
            )}
          </div>
        )
      })}
    </div>
  );
});

export default Cell;
