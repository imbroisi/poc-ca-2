import React from 'react';
import './ColumnHeading.css';


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
      <div className='column-heading-container' style={{ paddingLeft: isLast ? 0 : 12, width: isLast ? 'unset' : '70%', paddingRight: isLast ? 12 : 10 }}>
        {heading}
      </div>
      {!isLast && (
        <div className='column-separator' />
      )}
    </>
  )
}

export default ColumnHeading;
