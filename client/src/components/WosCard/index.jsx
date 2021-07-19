import React from 'react';
import wosLogo from '../../images/wosLogo.png';
import '../TinyPanel/tinycard.css';

export default function WosCard({ISSN, content}){

  return (
    <div className="card--wos">
      <div className="card--scimago--logo">
        <a href={`https://mjl.clarivate.com/search-results?issn=${ISSN}&hide_exact_match_fl=true`}>
          <img className="card--scimago--image big"
            src={wosLogo}
            alt='wos'
          />
        </a>
      </div>
      {content.error ?
        <div className="card--scopus--text--warning--container">
          <div className="card--scimago--text--warning">
            No encontrado en Web of Science
          </div>
        </div>
        : 
        content.totalRecords === 0 ?
        <div className="card--scopus--text--warning--container">
          <div className="card--scimago--text--warning">
            No encontrado en Web of Science
          </div>
        </div>
        :
        <div className="card--scimago--info--panel">
          <div style={{width: '90%'}}className="card--doaj--issn--index">
            Indexado por Web of Science
          </div> 
          <div className="card--scimago--info redib">
            <div style={{fontWeight: "normal", width: '100%'}} className="card--tiny--info--data">EDITOR<br /><br /></div>
            <div style={{fontSize: "1.75rem",width: '100%'}} className="card--tiny--info--data">{content.journalProfiles[0].journalProfile.publisherName}</div>          
          </div>  
          <div className="card--scimago--info redib">
            <div style={{fontWeight: "normal", width: '100%'}} className="card--tiny--info--data">IDIOMAS<br /><br /></div>
              {content.journalProfiles[0].journalProfile.publicationLanguages.map(language => 
              <div key={language} style={{fontFamily: 'Roboto', backgroundColor: '#004aff', color: 'white'}} className="card--tiny--info--indicator">
                {language}
              </div>
              )}       
          </div>          
          <div className="card--scimago--info redib">
            <div style={{fontWeight: "normal", padding: "1rem"}} className="card--tiny--info--data">PAÍS<br /><br /></div>
            <div style={{padding: "1rem"}} className="card--tiny--info--data">{content.journalProfiles[0].journalProfile.country}</div>      
          </div>    
          { content.journalProfiles[0].journalProfile.categories.length > 0 ?
          <div className="card--scimago--info redib">
            <div style={{fontWeight: "normal", padding: "1rem"}} className="card--tiny--info--data">CATEGORÍAS<br /><br /></div>
            {content.journalProfiles[0].journalProfile.categories.map(category => 
            <div key={category} style={{fontFamily: 'Roboto', width:'100%', padding: '0.5rem',backgroundColor: '#004aff', color: 'white'}} className="card--tiny--info--indicator">
              {category.productDescription}
            </div>
            )}    
          </div>  
          : null
          }
        </div>
      }
    </div>
  )
}