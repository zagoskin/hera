import React from 'react';
import crossrefLogo from '../../images/crossrefLogo.png';
import ccBy from '../../images/cc-by.png';
import ccByNc from '../../images/cc-by-nc.png';
import ccByNcNd from '../../images/cc-by-nc-nd.png';
import ccByNcSa from '../../images/cc-by-nc-sa.png';
import ccByNd from '../../images/cc-by-nd.png';
import ccBySa from '../../images/cc-by-sa.png';

export const renderLicenseByURL = (index,licenseURL,containerClass,imageClass) => {
  switch(licenseURL) {
    case 'https://creativecommons.org/licenses/by/4.0/':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  <img className={imageClass} src={ccBy} alt="cc-by" />
                </a>
              </div>;
    case 'https://creativecommons.org/licenses/by-nd/4.0/':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-nd/4.0/">
                  <img className={imageClass}  src={ccByNd} alt="cc-by-nd" />
                </a>
              </div>;
    case 'https://creativecommons.org/licenses/by-nc/4.0/':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-nc/4.0/">
                  <img className={imageClass}  src={ccByNc} alt="cc-by-nc" />
                </a>
              </div> ;
    case 'https://creativecommons.org/licenses/by-sa/4.0/':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                  <img className={imageClass}  src={ccBySa} alt="cc-by-sa" />
                </a>
              </div>;
    case 'https://creativecommons.org/licenses/by-nc-nd/4.0/':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                  <img className={imageClass}  src={ccByNcNd} alt="cc-by-nc-nd" />
                </a>
              </div>;
    case 'CC BY-NC-SA':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                  <img className={imageClass}  src={ccByNcSa} alt="cc-by-nc-nd" />
                </a>
              </div>;
    default:
      return null;
  }
}

export default function CrossrefCard({identifier, content}){

  return (
    <div className="card--crossref" style={identifier.type === "DOI" ? 
      { width: "48%",
        marginRight: "1%" } 
        : {width: "100%"}
      } >
      <div className="card--image--container" style={identifier.type === "ISSN" ? {width: "20%" } : null}>
      <a href={ content.error ? `https://www.crossref.org/` 
        : `https://search.crossref.org/?from_ui=yes&q=${identifier.value}`}>
        <img className="card--crossref--image"
          src={crossrefLogo}
          alt='crossref_image'
          style={identifier.type === "DOI" ? {width: "100%" } : null}
        />
      </a>
      </div>
      <div className="card--data--container">
      {content.error ? <div className="card--doaj--text--warning">
        No hallado en Crossref 
      </div>: 
      (identifier.type === "DOI") ?
      <div className="card--crossref--text">
        <div className="card--crossref--info">
          Número de citas {content["is-referenced-by-count"]}
        </div> 
      </div>
      :(identifier.type === "ISSN") ?
      <div className="card--crossref--text">
        <div className="card--crossref--info">
          {content.counts["current-dois"]} artículos publicados en esta revista
        </div>
        <div className="card--crossref--info">
          {(content.coverage["award-numbers-current"] * 100).toFixed(1)}% de los artículos en esta revista tienen algún award
        </div>
        <div className="card--crossref--info">
          {(content.coverage["orcids-current"] * 100).toFixed(1)}% de los autores de la revista tienen un <a href='https://orcid.org/'>ORCID</a>
        </div>
        <div className="card--crossref-breakdowns">
          <div className="card--microsoft--fos--title">Artículos por año</div>
          {content.breakdowns["dois-by-issued-year"].sort((a,b) => a[0] - b[0]).map((yearbydoi,index) => 
            <div className="card--crossref--year--badge" key={index}>
              {yearbydoi[0]} - {yearbydoi[1]} artículos
            </div>   
          )}
        </div>
        <p>Información provista por Crossref</p>
      </div> 
      : null     
      }
      </div>
    </div>
  )
}