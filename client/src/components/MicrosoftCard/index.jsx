import React from 'react';
import microsoftLogo from '../../images/microsoftLogo.png';


export default function MicrosoftCard({identifier, content}){

  return (
    <div className="card--microsoft dDOI">
      <div className="card--image--container">
        <a href={content ? `https://academic.microsoft.com/paper/${content.Id}` 
          : `https://academic.microsoft.com/home` }>
          <img className="card--microsoft--image"
            src={microsoftLogo}
            alt='microsoft_image'
          />
        </a>
      </div>
      <div className="card--data--container">
        {content ? 
        <div className="card--microsoft--text">
          <div className="card--microsoft--text--cc">
            Citas actuales: {content.CC} 
          </div>
          <div className="card--microsoft--text--cc">
            Citas que se estima recibir el próximo año: {content.ECC} 
          </div>
          <br/>
          <div className="card--microsoft--fos">
            <div className="card--microsoft--fos--title">Campos de Estudio</div>
            {content.F.map((field,index) => 
              <div className="card--microsoft--fos--badge" key={index}>{field.DFN}</div>   
            )}
          </div>
        </div> 
        : identifier.type === "DOI" ?
        <div className="card--doaj--text--warning">
          No hallado en Bing! 
        </div>
        : null
        }
      </div>
    </div>
  )
}
