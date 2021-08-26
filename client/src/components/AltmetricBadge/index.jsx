import React, { useState, useEffect } from 'react';
//import { Helmet } from 'react-helmet';
import { useAltmetric } from '../../hooks/useScript';
import altmetricLogo from '../../images/altmetricLogo.png';
import fbLogo from '../../images/fbLogo.png';
import twtLogo from '../../images/twtLogo.png';
import redditLogo from '../../images/redditLogo.png';
import gplusLogo from '../../images/gplusLogo.png';

export default function AltmetricBadge({DOI, content}){
  const [doi, setDoi] = useState('');
  useAltmetric('https://d1bxh8uas1mnw7.cloudfront.net/assets/embed.js');
  useEffect(() => {
    setDoi(DOI);
  }, [DOI]);

  return (
    <div className="card--altmetric">
      <div className="card--dimensions--badge">
        <div className="altmetric-embed" data-badge-type="medium-donut" data-doi={doi} data-badge-popover="right"></div>
      </div>
      <div className="card--altmetric--info">
      {content.error ?
        <div className="card--badge--text--warning">
          No hallado en Altmetric
        </div>
      :
      <>          
      {content.cited_by_posts_count ?
        <div className="card--altmetric--text">
          Este artículo fue mencionado en aproximadamente <b>{content.cited_by_posts_count}</b> posts en la red.
        </div>
        : 
        null
      }
      <div className="card--altmetric--text">
        <b>Citado en:</b>       
      </div>
      <br />
      <div className="card--altmetric--logos">
        {content.cited_by_fbwalls_count ?
          <div className="card--altmetric--logo--container">
            <img className="card--altmetric--logo"
              src={fbLogo}
              alt='facebook_logo'
            />
          </div>
          : null
        }
        {content.cited_by_tweeters_count ?
          <div className="card--altmetric--logo--container">
            <img className="card--altmetric--logo"
              src={twtLogo}
              alt='twitter_logo'
            />
          </div>
          : null
        }
        {content.cited_by_rdts_count ?
          <div className="card--altmetric--logo--container">
            <img className="card--altmetric--logo"
              src={redditLogo}
              alt='reddit_logo'
            />
          </div>
          : null
        }
        {content.cited_by_gplus_count ?
          <div className="card--altmetric--logo--container">
            <img className="card--altmetric--logo"
              src={gplusLogo}
              alt='gplus_logo'
            />
          </div>
          : null
        }
      </div>
      </>
      }
      </div>
      <div className="card--dimensions--image--container">
        <img className="card--dimensions--image"
          src={altmetricLogo}
          alt='microsoft_image'
          />
      </div>
    </div>
  )

}