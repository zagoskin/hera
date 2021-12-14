import React from 'react';
import wosLogo from '../../images/wosLogo.png';
import '../TinyPanel/tinycard.css';

export default function WosCard({ISSN, content}){

  const renderFrequencySwitch = (frequencyChar) => {
    switch(frequencyChar) {
      case 'A': 
        return 'Anual';
      case 'R':
        return 'Artículo por artículo';
      case 'B':
        return 'Bimestral';
      case 'C':
        return 'Publicación continua';
      case 'F':
        return 'Quincenal';
      case 'I':
        return 'Irregular';
      case 'M':
        return 'Mensual';
      case 'Q':
        return 'Trimestral';
      case 'H':
        return 'Cada 6 meses';
      case 'S':
        return 'Dos veces al mes';
      case 'T':
        return 'Tres veces al año';
      case 'W':
        return 'Semanal';
      default:
        return '';
    }

  }

  return (
    <div className="card--wos">
      <div className="card--image--container">
        <a href={`https://mjl.clarivate.com/search-results?issn=${ISSN}&hide_exact_match_fl=true`}>
          <img className="card--scimago--image big"
            src={wosLogo}
            alt='wos'
          />
        </a>
      </div>
      <div className="card--data--container">
      {content.error ?
          <div className="card--doaj--text--warning">
            No hallado en Web of Science
          </div>
        : 
        content.totalRecords === 0 ?
          <div className="card--doaj--text--warning">
            No hallado en Web of Science
          </div>
        :
        <div className="card--scimago--info--panel">
          {/* <div style={{width: '100%'}} className="card--doaj--issn--index">
            Indexado por Web of Science
          </div>  */}
          <div style={{flex: '1 auto', width: '30%'}} className="card--scimago--info redib">
            <div style={{fontWeight: "normal", width: '100%'}} className="card--tiny--info--data">EDITOR<br /><br /></div>
            <div style={{fontSize: "1.75rem",width: '100%'}} className="card--tiny--info--data">{content.journalProfiles[0].journalProfile.publisherName}</div>          
          </div>  
          
          {content.journalProfiles[0].journalProfile.publicationLanguages ?
          <div style={{flex: '1 auto', width: '30%'}} className="card--scimago--info redib">
            <div style={{fontWeight: "normal", width: '100%'}} className="card--tiny--info--data">IDIOMAS<br /><br /></div>  
            {content.journalProfiles[0].journalProfile.publicationLanguages.map((language, index) => 
            <div key={`${language} ${index}`} style={{fontFamily: 'Roboto', backgroundColor: '#004aff', color: 'white'}} className="card--tiny--info--indicator">
              {language}
            </div>                
            )}
          </div>      
          : null 
          }    

          {content.journalProfiles[0].journalProfile.country ?
          <div style={{flex: '1 auto', width: '30%'}} className="card--scimago--info redib">
            <div style={{fontWeight: "normal", padding: "1rem"}} className="card--tiny--info--data">PAÍS<br /><br /></div>
            <div style={{padding: "1rem"}} className="card--tiny--info--data">{content.journalProfiles[0].journalProfile.country}</div>      
          </div>    
          : null
          }

          {content.journalProfiles[0].journalProfile.publicationFrequency ?
          <div style={{flex: '1 auto', width: '30%'}} className="card--scimago--info redib">
            <div style={{fontWeight: "normal", padding: "1rem"}} className="card--tiny--info--data">PERIODICIDAD<br /><br /></div>
            <div style={{padding: "1rem"}} className="card--tiny--info--data">
              {renderFrequencySwitch(content.journalProfiles[0].journalProfile.publicationFrequency)}              
            </div>      
          </div>    
          : null
          }

          { content.journalProfiles[0].journalProfile.categories.length > 0 ?
          <div style={{flex: '1 auto', width: '60%', flexWrap: 'wrap', alignItems: 'stretch'}} className="card--scimago--info redib">
            <div style={{fontWeight: "normal", padding: "1rem"}} className="card--tiny--info--data">PRODUCTOS<br /><br /></div>
            {content.journalProfiles[0].journalProfile.products.map((category, index) => 
            <div key={`${category} ${index}`} style={{fontFamily: 'Roboto', width:'30%', padding: '0.5rem',backgroundColor: '#004aff', color: 'white'}} className="card--tiny--info--indicator">
              {category.description}
            </div>
            )}    
          </div>  
          : null
          }
        </div>
      }
      </div>
    </div>
  )
}