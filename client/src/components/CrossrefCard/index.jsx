import React from 'react';
import crossrefLogo from '../../images/crossrefLogo.png';


export default function CrossrefCard({identifier, content}){

  return (
    <div className="card--crossref">
      <a href="https://www.crossref.org/">
        <img className="card--crossref--image"
          src={crossrefLogo}
          alt='crossref_image'
        />
      </a>
      {content.error ? <div className="card--doaj--text--warning">
        No hallado en Crossref 
      </div>: 
      (identifier.type === "DOI") ?
      <div className="card--crossref--text">
        Referencias académicas en {content["reference-count"]} artículos 
        <p>Información provista por Crossref</p>
      </div> 
      :(identifier.type === "ISSN") ?
      <div className="card--crossref--text">
        <div className="card--crossref--info">
          {content.counts["current-dois"]} artículos con DOI en este jornal
        </div>
        <div className="card--crossref-breakdowns">
          <div className="card--microsoft--fos--title">DOIs por año</div>
          {content.breakdowns["dois-by-issued-year"].sort((a,b) => a[0] - b[0]).map((yearbydoi,index) => 
            <div className="card--crossref--year--badge" key={index}>
              {yearbydoi[0]} - {yearbydoi[1]} DOIs
            </div>   
          )}
        </div>
        <div className="card--crossref--info">
          {(content.coverage["award-numbers-current"] * 100).toFixed(1)}% de los artículos en este jornal tienen algún award
        </div>
        <div className="card--crossref--info">
          {(content.coverage["orcids-current"] * 100).toFixed(1)}% de los artículos tienen un <a href='https://orcid.org/'>ORCID</a>
        </div>
        <p>Información provista por Crossref</p>
      </div> 
      : null     
      }
    </div>
  )
}