import React from 'react';
import './card.css';
import crossrefLogo from '../../images/crossrefLogo.png';
import doajLogo from '../../images/doajLogo.png';
import microsoftLogo from '../../images/microsoftLogo.png';
import useScript from '../../hooks/useScript';


export default function AcademicCard({content}){
  useScript('https://badge.dimensions.ai/badge.js');

  return (
    <div className="card">

      {/* Info general de un contenido */}
      <div className="card--content">
        <h1 className="card--title">{content.title}</h1>
        <p><a href={content.URL}>Click aquí para ir al recurso</a></p>

        {content.authors ? <p>
          <em>Authors: {content.authors.map((author,index) => 
          (author.name ? 
            <span key={index}> {author.name}. </span> :
          author.family ?
            <span key={index}> {author.family} {author.given}. </span> :
          author.AuN ?
            <span key={index}> {author.AuN} . </span> : null
          ))}</em> 
        </p> : null 
        }
        {content.abstract ? <div className='card--abstract'><h1>ABSTRACT</h1> 
        <em><p className="card--abstract--text">
            {content.abstract.replace(/(<([^>]+)>)/ig, '')}
          </p></em>
        </div> : null
        } 
      </div>
      {/* Carta de metricas de Crossref */}
      <div className="card--crossref">
        <a href="https://www.crossref.org/">
          <img className="card--crossref--image"
            src={crossrefLogo}
            alt='crossref_image'
          />
        </a>
        {content.crossref.error ? <div className="card--doaj--text--warning">
          No hallado en Crossref 
        </div>: 
        (content.identifier.type === "DOI") ?
        <div className="card--crossref--text">
          Referencias académicas en {content.crossref["reference-count"]} artículos 
          <p>Información provista por Crossref</p>
        </div> 
        :(content.identifier.type === "ISSN") ?
        <div className="card--crossref--text">
          <div className="card--crossref--info">
            {content.crossref.counts["current-dois"]} artículos con DOI en este jornal
          </div>
          <div className="card--crossref-breakdowns">
            <div className="card--microsoft--fos--title">DOIs por año</div>
            {content.crossref.breakdowns["dois-by-issued-year"].sort((a,b) => a[0] - b[0]).map((yearbydoi,index) => 
              <div className="card--crossref--year--badge" key={index}>
                {yearbydoi[0]} - {yearbydoi[1]} DOIs
              </div>   
            )}
          </div>
          <div className="card--crossref--info">
            {(content.crossref.coverage["award-numbers-current"] * 100).toFixed(1)}% de los artículos en este jornal tienen algún award
          </div>
          <div className="card--crossref--info">
            {(content.crossref.coverage["orcids-current"] * 100).toFixed(1)}% de los artículos tienen un <a href='https://orcid.org/'>ORCID</a>
          </div>
          <p>Información provista por Crossref</p>
        </div> 
        : null     
        }
      </div>

      {/* Carta de metricas de DOAJ */}
      <div className="card--doaj">
        <a href="https://doaj.org/">
          <img className="card--doaj--image"
            src={doajLogo}
            alt='doaj_image'
          />
        </a>
        {content.doaj === 0 ? 
        <div className="card--doaj--text--warning">
          No incluido en DOAJ
        </div> 
        : (content.identifier.type === 'DOI') ? 
        [
        <div className="card--doaj--text--success" key={content.doaj}>
          Indexado por DOAJ
        </div>,
          (content.doaj.admin ? 
            content.doaj.admin.seal ?
            <a href='https://doaj.org/apply/seal/' key={content.doaj.id}>
              
              <span className='card--doaj--seal'>☑ DOAJ Seal</span>
            </a>
             : null 
          : null
        )]
        : (content.identifier.type === 'ISSN') ?
        <div className="card--doaj--issn--success" key={content.doaj}>
          <div className="card--doaj--issn--index">
            Indexado por DOAJ
          </div> 
          {content.doaj.bibjson.apc["has_apc"] === true ? 
          <div className="card--doaj--issn--info">
            El costo más alto por publicar en este jornal es: 
            <span className="card--doaj--issn--cost"> {content.doaj.bibjson.apc.max[0].price} {content.doaj.bibjson.apc.max[0].currency}</span>
          </div> 
          :
          <div className="card--doaj--issn--info">
            No hay costo por publicar en este jornal
          </div> 
          }
          <div className="card--doaj--issn--info">
            <div className="card--doaj--issn--license--title"><a href="https://creativecommons.org/licenses/">Licencias</a> que utiliza este jornal:</div> 
            {content.doaj.bibjson.license.map((license,index) => 
              <div className="card--doaj--issn--license" key={index}>{license.type}</div>  
            )}
          </div> 
          {content.doaj.admin ? 
            content.doaj.admin.seal ?
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

      {/* Carta de metricas de microsoft */}
      <div className="card--microsoft">
        <a href="https://academic.microsoft.com/home">
          <img className="card--microsoft--image"
            src={microsoftLogo}
            alt='microsoft_image'
          />
        </a>
        {content.microsoft ? 
        <div className="card--microsoft--text">
          <div className="card--microsoft--text--cc">
            Citas actuales {content.microsoft.CC} 
          </div>
          <div className="card--microsoft--text--ecc">
            Citas estimadas {content.microsoft.ECC} 
          </div>
          <br/>
          <div className="card--microsoft--fos">
            <div className="card--microsoft--fos--title">Campos de Estudio</div>
            {content.microsoft.F.map((field,index) => 
              <div className="card--microsoft--fos--badge" key={index}>{field.DFN}</div>   
            )}
          </div>
        </div> 
        : content.identifier.type === "DOI" ?
        <div className="card--doaj--text--warning">
          No hallado en Bing! 
        </div>
        : content.identifier.type === "ISSN" ?
        <div className="card--doaj--text--warning">
          Busqueda por ISSN no soportada
        </div>
        : null
        }
        
      </div>

      {/* Métricas de Dimensions  */}
      <div className="card--dimensions">
        <span className="__dimensions_badge_embed__" data-doi={content.identifier.value.toUpperCase()}></span>
      </div>
      
    </div>
  )
}