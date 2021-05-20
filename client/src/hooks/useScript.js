import { useEffect } from 'react';

export const useDimensions = (url) => {
  useEffect(() => {
    let script = document.createElement('script');
    script.setAttribute('id', 'myScript');
    script.src = url;
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

export const useAltmetric = (url) => {
  useEffect(() => {
    let script = document.createElement('script');
    script.setAttribute('id', 'altmetricScript');
    script.src = url;
    script.type = 'text/javascript';
    
    document.getElementsByTagName('body')[0].appendChild(script);

    return () => {
      let myScript = document.getElementById('altmetricScript');
      myScript.remove();
    }
  }, [url]);
}
