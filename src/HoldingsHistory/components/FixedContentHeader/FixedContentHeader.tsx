import React from 'react';

const FixedContentHeader = () => {
  return (
    <div className="fixed-column-header">
        {/* Row # Empty */}
        <div 
          style={{
            height: '30px',
            width: '100%',
            borderBottom: '1px solid #ccc',
          }}
        >

        </div>
        <div 
          style={{
            height: '40px',
            width: '100%',
            borderBottom: '1px solid #ccc',
          }}
        >
          
        </div>
        <div 
          style={{
            height: '30px',
            width: '100%'
          }}
        >

        </div>
        {/* <button onClick={() => setShow(!show)}>Toggle</button> */}
    </div>
  );
};

export default FixedContentHeader;
