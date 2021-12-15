import React from 'react';
import scimagoLogo from '../../images/scimagoLogo.png';
import poweredByScopus from '../../images/PoweredbyScopus.png'

export default function ScimagoCard({ISSN, content}){

  return (
    <div className="card--scimago">
      <div className="card--image--container">
        <a href={content.error ? `https://www.scimagojr.com/journalsearch.php?q=${ISSN}` 
          : content.journalURL }>
          <img className="card--scimago--image"
            src={scimagoLogo}
            alt='scimago'
          />
        </a>
      </div>
      <div className="card--data--container">
      {content.error ?
          <div className="card--doaj--text--warning">
            No hallado en Scimagojr
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
          <div style={{padding: "20px"}}className="card--scopus--disclaimer--text">SCImago Journal Rank (SJR) is a measure of scientific 
              influence of scholarly journals that accounts for both 
              the number of citations received by a journal and the importance or 
              prestige of the journals where such citations come from.
              <br />
              <br />
          <img className="card--scopus--powered"
                src={poweredByScopus}
                alt='powered_by_scopus'
              />  
          </div>
        </div>
      }
      </div>

    </div>
  )
}
