import React, { useState, useEffect } from 'react';
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
      {content ? 
        <>
          {content.field_citation_ratio ?
          <>
            {content.field_citation_ratio > 1.0 ?
              <div className="card--dimensions--text">
                Es <b>muy</b> citado en relación a otros del mismo campo con similar antigüedad 
              </div>
              :
              <div className="card--dimensions--text">
                No es muy citado en relación a otros del mismo campo con similar antigüedad 
              </div>
            }
          </>
          :
          <div className="card--dimensions--text">
            Sin información estadística sobre citas de artículos con similar antigüedad
          </div>
          }
          { content.relative_citation_ratio ?
          <>
            {content.relative_citation_ratio > 1.0 ?
              <div className="card--dimensions--text">
                Es <b>muy</b> citado en relación a otros del mismo campo 
              </div>
              :
              <div className="card--dimensions--text">
                No es muy citado en relación a otros del mismo campo
              </div>
            }
          </>
          :
          <div className="card--dimensions--text">
            Sin información estadística sobre citas de artículos del mismo campo
          </div>
          }
        </>
        :
        <div className="card--badge--text--warning">
          No hallado en Dimensions
        </div>
      }
      </div>
      <div className="card--dimensions--image--container">
        <img className="card--dimensions--image"
          src={dimensionsLogo}
          alt='microsoft_image'
          />
      </div>
      <div className="card--dimensions--disclaimer">
      Data sourced from Dimensions, by Digital Science (<a href="https://www.dimensions.ai">https://www.dimensions.ai</a>).
      </div>
    </div>
  )

}