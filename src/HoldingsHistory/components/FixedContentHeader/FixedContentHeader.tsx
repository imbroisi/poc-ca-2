import React from 'react';
import styles from './FixedContentHeader.module.scss';

const FixedContentHeader = () => {
  return (
    <div className={styles.fixedColumnHeader}>
        {/* Row # Empty */}
        <div className={`${styles.row} ${styles.firstRow}`}>
        </div>
        <div className={`${styles.row} ${styles.secondRow}`}>
        </div>
        <div className={`${styles.row} ${styles.thirdRow}`}>

        </div>
        {/* <button onClick={() => setShow(!show)}>Toggle</button> */}
    </div>
  );
};

export default FixedContentHeader;
