import React from 'react';
import styles from './ReferenceDataHeader.module.scss';
import { MAIN_BORDER_COLOR } from '../../config';
import ColumnHeading from '../ColumnHeading';


interface ReferenceDataHeaderProps {
  columnHeadings: {
    heading: string;
    enabled: boolean;
  }[];
}

const ReferenceDataHeader = ({ columnHeadings }: ReferenceDataHeaderProps) => {

  return (
    <>
      <div className={styles.referenceDataHeaderContainer} style={{ borderBottom: `1px solid ${MAIN_BORDER_COLOR}`}}
      />
          {/* Header row */}
          <div className={styles.referenceDataRow} style={{ borderBottom: `1px solid ${MAIN_BORDER_COLOR}`}}>
            {columnHeadings?.map(({ heading, enabled }, index) => (
              <ColumnHeading
                key={`${heading}-$${index}`}
                heading={heading}
                enabled={enabled}
                isLast={index ===  columnHeadings?.length - 1}
              />
            ))}
          </div>
    </>
  )
}

export default ReferenceDataHeader;
