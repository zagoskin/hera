import React from 'react';
import './card.css';
import crossrefLogo from '../../images/crossrefLogo.png';
import doajLogo from '../../images/doajLogo.png';
import microsoftLogo from '../../images/microsoftLogo.png';

export default function AcademicCard({content}){
  return (
    <div className="card">
      <div className="card--crossref">
        <img className="card--crossref--image"
          src={crossrefLogo}
          alt='crossref_image'
        />
        {content.crossref.error ? <div className="card--doaj--text--warning">
          No hallado en Crossref 
        </div>: <div className="card--crossref--text">
          Referencias académicas en {content.crossref["reference-count"]} artículos
          <p>Información provista por Crossref</p>
        </div> }
        
      </div>

      <div className="card--doaj">
        <img className="card--doaj--image"
          src={doajLogo}
          alt='doaj_image'
        />
        {content.doaj === 0 ? 
        <div className="card--doaj--text--warning">
          No incluido en DOAJ
        </div> : [
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
        }
      </div>

      <div className="card--microsoft">
        <img className="card--microsoft--image"
          src={microsoftLogo}
          alt='microsoft_image'
        />
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
        </div> : 
        <div className="card--doaj--text--warning">
          No hallado en Bing! 
        </div>
        }
        
      </div>

      <div className="card--content">
        <h1 className="card--title">{content.title}</h1>
        <p><a href={content.URL}>Click aquí para ir al artículo</a></p>
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
    </div>
  )
}