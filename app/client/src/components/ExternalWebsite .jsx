import React, { useEffect, useState } from 'react';

const domain = import.meta.env.VITE_SERVER

const ExternalWebsite = ({ url = null }) => {
  const [externalWebsite, setExternalWebsite] = useState(null)
  useEffect(() => {
    if(!url.startsWith(domain)){

    }
    setExternalWebsite(url)
  }, [url])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe 
        src= {externalWebsite}
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
