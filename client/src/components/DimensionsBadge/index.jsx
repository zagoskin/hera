import React, { useState, useEffect } from 'react';
//import { Helmet } from 'react-helmet';
import useScript from '../../hooks/useScript';
import dimensionsLogo from '../../images/dimensionsLogo.png';


export default function DimensionsBadge({DOI}){
  const [doi, setDoi] = useState('');
  useScript('https://badge.dimensions.ai/badge.js');
  useEffect(() => {
    console.log('Montando');
    setDoi(DOI);
  }, [DOI]);

  return (
    <div className="card--dimensions">
      <div className="card--dimensions--badge">
        <span className="__dimensions_badge_embed__" data-doi={doi}></span>
      </div>
      <div className="card--dimensions--text">
        Haga clic en la medalla para ver detalles sobre significado de las métricas
      </div>
      <div className="card--dimensions--image--container">
        <img className="card--dimensions--image"
          src={dimensionsLogo}
          alt='microsoft_image'
          />
      </div>
      <div className="card--dimensions--disclaimer">
      Data sourced from Dimensions, an inter-linked research information system provided by Digital Science (<a href="https://www.dimensions.ai">https://www.dimensions.ai</a>).
      </div>
    </div>
  )

}