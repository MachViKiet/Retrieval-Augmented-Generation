import React from 'react';

const ExternalWebsite = ({ url = null }) => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe 
        src= {url}
        title="External Website" 
        style={{
        width: '100%',
        height: '100%',
        border: 'none'
        }}
      />
    </div>
  );
};

export default ExternalWebsite;
