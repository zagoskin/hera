import React from 'react';
import doajLogo from '../../images/doajLogo.png';
import ccBy from '../../images/cc-by.png';
import ccByNc from '../../images/cc-by-nc.png';
import ccByNcNd from '../../images/cc-by-nc-nd.png';
import ccByNcSa from '../../images/cc-by-nc-sa.png';
import ccByNd from '../../images/cc-by-nd.png';
import ccBySa from '../../images/cc-by-sa.png';

export const renderLicense = (index,licenseType,containerClass,imageClass) => {
  switch(licenseType) {
    case 'CC BY':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  <img className={imageClass} src={ccBy} alt="cc-by" />
                </a>
              </div>;
    case 'CC BY-ND':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-nd/4.0/">
                  <img className={imageClass} src={ccByNd} alt="cc-by-nd" />
                </a>
              </div>;
    case 'CC BY-NC':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-nc/4.0/">
                  <img className={imageClass} src={ccByNc} alt="cc-by-nc" />
                </a>
              </div> ;
    case 'CC BY-SA':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                  <img className={imageClass} src={ccBySa} alt="cc-by-sa" />
                </a>
              </div>;
    case 'CC BY-NC-ND':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                  <img className={imageClass} src={ccByNcNd} alt="cc-by-nc-nd" />
                </a>
              </div>;
    case 'CC BY-NC-SA':
      return  <div className={containerClass} key={index}>
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                  <img className={imageClass} src={ccByNcSa} alt="cc-by-nc-nd" />
                </a>
              </div>;
    default:
      return null;
  }
}

export default function DOAJCard({identifier, content}){

  return (
    <div className="card--doaj" style={identifier.type === "DOI" ? 
    { width: "48%",
      marginLeft: "3%" } 
      : {width: "100%"}
    }>
      <div className="card--image--container" style={identifier.type === "ISSN" ? {width: "20%" } : null}>
        <a href={ content === null ? `https://doaj.org/` 
          : identifier.type === 'ISSN' ? `https://doaj.org/toc/${identifier.value}` 
          : `https://doaj.org/article/${content.id}`}>
          <img className="card--doaj--image"
            src={doajLogo}
            alt='doaj_image'
            style={identifier.type === "DOI" ? {width: "100%" } : null}
          />
        </a>
      </div>
      <div className="card--data--container" style={identifier.type === "ISSN" ? {width: "80%" } : null}>
      {content === null ? 
      <div className="card--doaj--text--warning">
        No hallado en DOAJ
      </div> 
      : (identifier.type === 'DOI') ? 
      [
      <div className="card--doaj--text--success" key={content}>
        Indexado por DOAJ
      </div>,
        (content.admin ? 
          content.admin.seal ?      
          <div className="card--doaj--seal--container" key={`seal${content.id}`}>    
            <a href='https://doaj.org/apply/seal/' key={content.id}>
              <span className='card--doaj--seal'>☑ DOAJ Seal</span>
            </a>
          </div>
            : null 
        : null
      )]
      : (identifier.type === 'ISSN') ?
      <div className="card--doaj--issn--success" key={content}>
        <div className="card--doaj--issn--index">
          Indexado por DOAJ
        </div> 
        {content.bibjson.apc["has_apc"] === true ? 
        <div className="card--doaj--issn--info">
          El costo más alto por publicar en esta revista es: 
          <span className="card--doaj--issn--cost"> {content.bibjson.apc.max[0].price} {content.bibjson.apc.max[0].currency}</span>
        </div> 
        :
        <div className="card--doaj--issn--info">
          No hay costo por publicar en esta revista
        </div> 
        }
        <div className="card--doaj--issn--info">
          <div className="card--doaj--issn--license--title"><a href="https://creativecommons.org/licenses/">Licencias</a> que utiliza este jornal:</div> 
          {content.bibjson.license.map((license,index) => 
            renderLicense(index,license.type,"card--doaj--issn--license","card--doaj--issn--license--image")
          )}
        </div> 
        {content.admin ? 
          content.admin.seal ?
          <div className="card--doaj--seal--container"> 
            <a href='https://doaj.org/apply/seal/' style={{marginRight: "20%"}}>  
              <span className='card--doaj--seal' >☑ DOAJ Seal</span>
            </a>
          </div>
            : null 
        : null
        }
      </div>       
      : null
      }
      </div>
    </div>
  )

}