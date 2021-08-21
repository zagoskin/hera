import React from 'react';
import crossrefLogo from '../../images/crossrefLogo.png';


export default function CrossrefCard({identifier, content}){

  return (
    <div className="card--crossref">
      <a href={ content.error ? `https://www.crossref.org/` 
        : `https://search.crossref.org/?from_ui=yes&q=${identifier.value}`}>
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
        Número de referencias académicas {content["is-referenced-by-count"]}
        <p>Información provista por Crossref</p>
      </div> 
      :(identifier.type === "ISSN") ?
      <div className="card--crossref--text">
        <div className="card--crossref--info">
          {content.counts["current-dois"]} artículos publicados en esta revista
        </div>
        <div className="card--crossref-breakdowns">
          <div className="card--microsoft--fos--title">Artículos por año</div>
          {content.breakdowns["dois-by-issued-year"].sort((a,b) => a[0] - b[0]).map((yearbydoi,index) => 
            <div className="card--crossref--year--badge" key={index}>
              {yearbydoi[0]} - {yearbydoi[1]} artículos
            </div>   
          )}
        </div>
        <div className="card--crossref--info">
          {(content.coverage["award-numbers-current"] * 100).toFixed(1)}% de los artículos en esta revista tienen algún award
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