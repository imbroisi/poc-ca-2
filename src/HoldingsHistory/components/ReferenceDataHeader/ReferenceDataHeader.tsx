import React from 'react';
import './ReferenceDataHeader.css';
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
      <div className="reference-data-header-container" style={{ borderBottom: `1px solid ${MAIN_BORDER_COLOR}`}}
      />
          {/* Header row placeholder to align with date header */}
          <div style={{ 
            height: '40px',
            backgroundColor: 'white',
            position: 'sticky',
            top: '30px',
            zIndex: 98,
            borderBottom: `1px solid ${MAIN_BORDER_COLOR}`,
            boxSizing: 'border-box',
            width: '100%',
            maxWidth: 300,
            background: 'white',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            fontSize: 12,
            fontWeight: 600,
            justifyContent: 'space-between' }}>
            
            {columnHeadings?.map(({ heading, enabled }, index) => (
              <ColumnHeading
                key={`${heading}-${index}`}
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
