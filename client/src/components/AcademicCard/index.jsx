import React from 'react';
import './card.css';
import crossrefLogo from '../../images/crossrefLogo.png';
import doajLogo from '../../images/doajLogo.png';

export default function AcademicCard({content}){
  return (
    <div className="card">
      <div className="card--crossref">
        <img className="card--crossref--image"
          src={crossrefLogo}
          alt='crossref_image'
        />
        <div className="card--crossref--text">
          Referencias académicas en {content.crossref["reference-count"]} artículos
          <p>Información provista por Crossref</p>
        </div>
      </div>

      <div className="card--doaj">
        <img className="card--doaj--image"
          src={doajLogo}
          alt='doaj_image'
        />
        {content.doaj.total === 0 ? 
        <div className="card--doaj--text--warning">
          No incluido en DOAJ
        </div> :
        <div className="card--doaj--text--success">
          Indexado por DOAJ
        </div>}
        {content.doaj.results[0].admin.seal ? 
          <a href='https://doaj.org/apply/seal/'>
            
            <span className='card--doaj--seal'>☑ DOAJ Seal</span>
          </a>
        : null
        }
           
      </div>
      <div className="card--content">
        <h1 className="card--title">{content.crossref.title}</h1>
        <p><a href={content.crossref.URL}>Click aquí para ir al artículo</a></p>
        {content.crossref.author ? <p>
          <em>Authors: {content.crossref.author.map((author,index) => (author.name? <span key={index}> {author.name} </span> :
            <span key={index}> 
               {author.family} {author.given}. 
            </span>         
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