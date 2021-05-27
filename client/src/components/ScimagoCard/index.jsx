import React from 'react';
import scimagoLogo from '../../images/scimagoLogo.png';


export default function ScimagoCard({content}){

  return (
    <div className="card--scimago">
      <div className="card--scimago--logo">
        <a href="https://www.scimagojr.com/">
          <img className="card--scimago--image"
            src={scimagoLogo}
            alt='scimago'
          />
        </a>
      </div>
      {content.error ?
        <div className="card--scopus--text--warning--container">
          <div className="card--scimago--text--warning">
            No encontrado en Scimagojr
          </div>
        </div>
        : 
        <div className="card--scimago--info--panel">
          <div id="embedGraph" className="card--scimago--info" >
            <div className="card--scimago--info--embed" dangerouslySetInnerHTML={{ __html: content.embedString }}>
            </div>        
          </div>
          <div className="card--scimago--info">
            <div className="card--scimago--info--title">H-INDEX</div>
            <div className="card--scimago--info--data">{content.hIndex}</div>      
          </div>
          <div className="card--scimago--info">
            <div className="card--scimago--info--title">COBERTURA</div>
            <div className="card--scimago--info--data">{content.coverage}</div>      
          </div>
          <div className="card--scimago--info">
            <div className="card--scimago--info--title">PAÍS</div>
            <div className="card--scimago--info--data">{content.country}</div>      
          </div>
        </div>
      }


    </div>
  )
}
