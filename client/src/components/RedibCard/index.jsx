import React from 'react';
import redibLogo from '../../images/redibLogo.png';
import '../TinyPanel/tinycard.css';

export default function RedibCard({ISSN,content}){

  return (
    <div className="card--redib">
      <div className="card--image--container">
        <a href={content.error ? `https://redib.org/Search/Results?type=ISN&lookfor=${ISSN}` 
          : content.redibURL } >
        {/* <a href={content.redib.redibURL}> */}
          <img className="card--scimago--image"
            src={redibLogo}
            alt='redib'
          />
        </a>
      </div>
      <div className="card--data--container">
      {content.error ?
          <div className="card--doaj--text--warning">
            No hallado en Redib
          </div>
       
        : 
        <div className="card--scimago--info--panel">
          {content.widget ? 
          <div id="embedGraph" className="card--scimago--info redib" >
            <a href={content.widget.anchorHref}>
              <img border="0" width="200px" height="200px" src={content.widget.imgSrc} alt="redib_rank_widget"  />
            </a>     
          </div>
          : null
          }
          {content.indicadores.length > 0 ?
          <div className="card--scimago--info redib">
            <div style={{marginTop: "1.5rem"}} className="card--tiny--info--data">Indicadores calidad editorial <br /><br /></div>
            {content.indicadores.map(indicador => 
            <div key={indicador} style={{fontFamily: 'Roboto'}} className="card--tiny--info--indicator">
              {indicador}
            </div>
            )}    
          </div>
          : null
          }
          {content.acredInter.length > 0 ?
          <div className="card--scimago--info redib">
            <div style={{marginTop: "1.5rem"}} className="card--tiny--info--data">Acreditaciones internacionales <br /><br /></div>
            {content.acredInter.map(acreditacion => 
            <div key={acreditacion} style={{fontFamily: 'Roboto'}} className="card--tiny--info--indicator">
              {acreditacion}
            </div>
            )}    
          </div>
          : 
          <div className="card--scimago--info redib">
            <div style={{marginTop: "1.5rem"}} className="card--tiny--info--data">Acreditaciones internacionales <br /><br /></div>
            <div style={{fontWeight: "normal"}} className="card--tiny--info--data">Sin acreditaciones internacionales </div>   
          </div>
          }
          {content.acredNac.length > 0 ?
          <div className="card--scimago--info redib">
            <div style={{marginTop: "1.5rem"}} className="card--tiny--info--data">Acreditaciones nacionales <br /><br /></div>
            {content.acredNac.map(acreditacion => 
            <div key={acreditacion} style={{fontFamily: 'Roboto'}} className="card--tiny--info--indicator">
              {acreditacion}
            </div>
            )}    
          </div>
          : 
          <div className="card--scimago--info redib">
            <div style={{marginTop: "1.5rem"}} className="card--tiny--info--data">Acreditaciones nacionales <br /><br /></div>
            <div style={{fontWeight: "normal"}} className="card--tiny--info--data">Sin acreditaciones nacionales </div>   
          </div>
          }
        </div>
      }
      </div>

    </div>
  )
}
