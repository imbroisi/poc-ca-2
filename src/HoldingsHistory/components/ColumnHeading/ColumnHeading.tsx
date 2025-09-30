import React from 'react';
import styles from './ColumnHeading.module.scss';


interface ColumnHeadingProps {
  heading: string;
  enabled: boolean;
  isLast?: boolean;
}

const ColumnHeading = ({ heading, isLast = false , enabled }: ColumnHeadingProps) => {

  if (!enabled) {
    return null;
  }

  return (
    <>
      <div className={styles.columnHeadingContainer} style={{ paddingLeft: isLast ? 0 : 12, width: isLast ? 'unset' : '70%', paddingRight: isLast ? 12 : 10 }}>
        {heading}
      </div>
      {!isLast && (
        <div className={styles.columnSeparator} />
      )}
    </>
  )
}

export default ColumnHeading;
