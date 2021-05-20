import React, { useState, useEffect } from 'react';
//import { Helmet } from 'react-helmet';
import { useDimensions } from '../../hooks/useScript';
import dimensionsLogo from '../../images/dimensionsLogo.png';


export default function DimensionsBadge({DOI, content}){
  const [doi, setDoi] = useState('');
  useDimensions('https://badge.dimensions.ai/badge.js');
  useEffect(() => {
    setDoi(DOI);
  }, [DOI]);

  return (
    <div className="card--dimensions">
      <div className="card--dimensions--badge">
        <span className="__dimensions_badge_embed__" data-doi={doi}></span>
      </div>
      <div className="card--dimensions--info">
        {content.field_citation_ratio > 1.0 ?
          <div className="card--dimensions--text">
            Es <b>muy</b> citado en relación a otros del mismo campo con similar antigüedad 
          </div>
          :
          <div className="card--dimensions--text">
            No es muy citado en relación a otros del mismo campo con similar antigüedad 
          </div>
        }
        {content.relative_citation_ratio > 1.0 ?
          <div className="card--dimensions--text">
            Es <b>muy</b> citado en relación a otros del mismo campo 
          </div>
          :
          <div className="card--dimensions--text">
            No es muy citado en relación a otros del mismo campo
          </div>
        }
        {/* <br />
        <div className="card--dimensions--text">
          <b>{`<-- Coloque el mouse encima!`}</b>
        </div> */}
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