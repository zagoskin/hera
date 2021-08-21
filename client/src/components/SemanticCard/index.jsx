import React from 'react';
import semanticLogo from '../../images/semanticLogo.png';


export default function SemanticCard({identifier, content}){

  return (
    <div className="card--semantic">
      <a href={content.error ? `https://www.semanticscholar.org/?utm_source=api` 
        : `https://www.semanticscholar.org/paper/${content.paperId}?utm_source=api`}>
        <img className="card--crossref--image"
          src={semanticLogo}
          alt='semantic_image'
        />
      </a>
      {content.error ?
      <div className="card--doaj--text--warning">
        No hallado en Semantic 
      </div>
      : 
      <div className="card--crossref--text">
        <a style={{width: "60%",color: "#2b2928", fontWeight: "normal", textDecoration: "underline"}} href={`${content.url}?utm_source=api`}>Ver en Semantic Scholar</a>
        <br />
        <br />
        <div className="card--semantic--info">
          {content.numCitedBy} citas en otros artículos
        </div>
        <div className="card--semantic--info">
          {content.citationVelocity} citas nuevas en los últimos tres años
        </div>
        <div className="card--semantic--info">
          {content.influentialCitationCount} citas fueron influyentes en otros trabajos
        </div>
        
      </div>  
      }
    </div>
  )
}