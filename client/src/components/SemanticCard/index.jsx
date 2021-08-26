import React from 'react';
import semanticLogo from '../../images/semanticLogo.png';


export default function SemanticCard({identifier, content}){

  return (
    <div className="card--semantic">
      <div className="card--image--container">
      <a href={content.error ? `https://www.semanticscholar.org/?utm_source=api` 
        : `https://www.semanticscholar.org/paper/${content.paperId}?utm_source=api`}>
        <img className="card--crossref--image"
          src={semanticLogo}
          alt='semantic_image'
        />
      </a>
      </div>
      <div className="card--data--container">
      {content.error ?
      <div className="card--doaj--text--warning">
        No hallado en Semantic 
      </div>
      : 
      <div className="card--crossref--text">
        
        <div className="card--semantic--info">
          {content.numCitedBy} citas en otros artículos
        </div>
        <div className="card--semantic--info">
          {content.citationVelocity} citas nuevas en los últimos tres años
        </div>
        <div className="card--semantic--info">
          {content.influentialCitationCount} citas fueron influyentes en otros trabajos
        </div>
        
        <a style={{width: "60%", textShadow: "1px 1px 2px black", color: "yellow", fontSize: "1.6rem", textDecoration: "underline", paddingBottom: "1rem"}} href={`${content.url}?utm_source=api`}>Click para ir al recurso en en Semantic Scholar</a>
      </div>  
      }
      </div>
    </div>
  )
}