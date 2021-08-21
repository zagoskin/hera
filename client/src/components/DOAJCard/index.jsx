import React from 'react';
import doajLogo from '../../images/doajLogo.png';
import ccBy from '../../images/cc-by.png';
import ccByNc from '../../images/cc-by-nc.png';
import ccByNcNd from '../../images/cc-by-nc-nd.png';
import ccByNcSa from '../../images/cc-by-nc-sa.png';
import ccByNd from '../../images/cc-by-nd.png';
import ccBySa from '../../images/cc-by-sa.png';

export default function DOAJCard({identifier, content}){

  return (
    <div className="card--doaj">
      <a href={ content === 0 ? `https://doaj.org/` 
        : identifier.type === 'ISSN' ? `https://doaj.org/toc/${identifier.value}` 
        : `https://doaj.org/article/${content.id}`}>
        <img className="card--doaj--image"
          src={doajLogo}
          alt='doaj_image'
        />
      </a>
      {content === 0 ? 
      <div className="card--doaj--text--warning">
        No incluido en DOAJ
      </div> 
      : (identifier.type === 'DOI') ? 
      [
      <div className="card--doaj--text--success" key={content}>
        Indexado por DOAJ
      </div>,
        (content.admin ? 
          content.admin.seal ?
          <a href='https://doaj.org/apply/seal/' key={content.id}>
            
            <span className='card--doaj--seal'>☑ DOAJ Seal</span>
          </a>
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
            license.type === "CC BY" ?
              <div className="card--doaj--issn--license" key={index}>
                <a href="https://creativecommons.org/licenses/by/4.0/">
                  <img className="card--doaj--issn--license--image" src={ccBy} alt="cc-by" />
                </a>
              </div> 
            : license.type === "CC BY-ND" ?
              <div className="card--doaj--issn--license" key={index}>
                <a href="https://creativecommons.org/licenses/by-nd/4.0/">
                  <img className="card--doaj--issn--license--image" src={ccByNd} alt="cc-by-nd" />
                </a>
              </div>
            : license.type === "CC BY-NC" ?
              <div className="card--doaj--issn--license" key={index}>
                <a href="https://creativecommons.org/licenses/by-nc/4.0/">
                  <img className="card--doaj--issn--license--image" src={ccByNc} alt="cc-by-nc" />
                </a>
              </div> 
            : license.type === "CC BY-SA" ?
              <div className="card--doaj--issn--license" key={index}>
                <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                  <img className="card--doaj--issn--license--image" src={ccBySa} alt="cc-by-sa" />
                </a>
              </div>
            : license.type === "CC BY-NC-ND" ?
              <div className="card--doaj--issn--license" key={index}>
                <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                  <img className="card--doaj--issn--license--image" src={ccByNcNd} alt="cc-by-nc-nd" />
                </a>
              </div>
            : license.type === "CC BY-NC-SA" ?
              <div className="card--doaj--issn--license" key={index}>
                <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                  <img className="card--doaj--issn--license--image" src={ccByNcSa} alt="cc-by-nc-nd" />
                </a>
              </div>
            : null
          )}
        </div> 
        {content.admin ? 
          content.admin.seal ?
          <div className="card--doaj--issn--info--seal">
            <a href='https://doaj.org/apply/seal/'>  
              <span className='card--doaj--seal'>☑ DOAJ Seal</span>
            </a>
          </div>
            : null 
        : null
        }
      </div>       
      : null
      }
    </div>
  )

}