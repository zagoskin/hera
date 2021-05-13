import { useEffect } from 'react';

const useScript = (url) => {
  useEffect(() => {
    let script = document.createElement('script');
    script.setAttribute('id', 'myScript');
    script.src = 'https://badge.dimensions.ai/badge.js';
    script.async = true;
    
    document.getElementsByTagName('body')[0].appendChild(script);

    script.onload = () => {
      window.__dimensions_embed.addBadges();
    }
    return () => {
      let myScript = document.getElementById('myScript');
      myScript.remove();
    }
  }, [url]);
};

export default useScript;
