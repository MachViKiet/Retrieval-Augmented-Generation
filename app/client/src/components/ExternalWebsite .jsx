import React, { useEffect, useState } from 'react';

const domain = import.meta.env.VITE_SERVER

const ExternalWebsite = ({ url = null, name = null, type = null }) => {
  const [externalWebsite, setExternalWebsite] = useState(null)
  useEffect(() => {
    // if(url && !url.startsWith(domain)) {
    //   url = `${domain}/proxy?url=${url}`
    //   url = `${domain}/proxy?url=${domain}/name=${}`
    //   // https://172.29.64.142:8017/documents?name=
    // }
    // setExternalWebsite(url)
    console.log(type)
    if(type && type == "Upload") {
      setExternalWebsite(`${domain}/documents?name=${name}`)

    } else {
      console.log('hihihihihi')
      setExternalWebsite(`${domain}/proxy?url=${url}`)
    }
  }, [url])

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe 
      view = 'FitH'
        src= {externalWebsite}
        title="External Website" 
        style={{
        width: '100%',
        height: '100%',
        border: 'none',
        aspectRatio: '4 / 3'
        }}
      />
    </div>
  );
};

export default ExternalWebsite;
