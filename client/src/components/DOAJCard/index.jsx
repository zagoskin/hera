import React from 'react';
import doajLogo from '../../images/doajLogo.png';


export default function DOAJCard({identifier, content}){

  return (
    <div className="card--doaj">
      <a href="https://doaj.org/">
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
          El costo más alto por publicar en este jornal es: 
          <span className="card--doaj--issn--cost"> {content.bibjson.apc.max[0].price} {content.bibjson.apc.max[0].currency}</span>
        </div> 
        :
        <div className="card--doaj--issn--info">
          No hay costo por publicar en este jornal
        </div> 
        }
        <div className="card--doaj--issn--info">
          <div className="card--doaj--issn--license--title"><a href="https://creativecommons.org/licenses/">Licencias</a> que utiliza este jornal:</div> 
          {content.bibjson.license.map((license,index) => 
            <div className="card--doaj--issn--license" key={index}>{license.type}</div>  
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