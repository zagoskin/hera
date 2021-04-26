import React from 'react';
import './card.css';
import crossrefLogo from '../../images/crossrefLogo.png'

export default function AcademicCard({content}){
  console.log('En Academic Card');
  console.log(content);
  return (
    <div className="card">
      <div className="card--scoreCrossref">
        <img className="card--score--image"
          src={crossrefLogo}
          alt='academic_image'
        />
        <div className="card--score--text">
          Referencias académicas en {content.crossref["reference-count"]} artículos
          <p>Información provista por Crossref</p>
        </div>
      </div>
      <div className="card--metrics">
        <br/>
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
        {content.crossref.abstract ? <p className="card--desc">
            ABSTRACT: {content.crossref.abstract.replace(/(<([^>]+)>)/ig, '')}
          </p> : null
        } 
      </div>
    </div>
  )
}