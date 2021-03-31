import React from 'react';
import './card.css';

export default function AcademicCard({content}){

  return (
    <div className="card">
      <div className="card--score">
        <img className="card--score--image"
          src='https://pbs.twimg.com/profile_images/1202973071604367366/72Ft7ljG.jpg'
          alt='academic_image'
        />
        <h3 className="card--score--text">Crossref score: {content.score.toFixed(2)}</h3>
      </div>
      <div className="card--metrics">
        <br/>
      </div>
      <div className="card--content">
        <h1 className="card--title">{content.title}</h1>
        {content.author ? <p>
          <em>Authors: {content.author.map((author,index) => (author.name? <span key={index}> {author.name} </span> :
            <span key={index}> 
               {author.family} {author.given}. 
            </span>         
          ))}</em> 
        </p> : null 
        }
        {content.abstract ? <p className="card--desc">
            ABSTRACT: {content.abstract.replace(/(<([^>]+)>)/ig, '')}
          </p> : null
        } 
      </div>
    </div>
  )
}