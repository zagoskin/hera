import React from 'react';
import crossrefLogo from '../../images/crossrefLogo.png';
import doajLogo from '../../images/doajLogo.png';
import ccBy from '../../images/cc-by.png';
import ccByNc from '../../images/cc-by-nc.png';
import ccByNcNd from '../../images/cc-by-nc-nd.png';
import ccByNcSa from '../../images/cc-by-nc-sa.png';
import ccByNd from '../../images/cc-by-nd.png';
import ccBySa from '../../images/cc-by-sa.png';
import redCross from '../../images/redCross.png';
import microsoftLogo from '../../images/microsoftLogo.png';
import graphIncrease from '../../images/graphIncrease.png';
import graphDecrease from '../../images/graphDecrease.png';
import hotTopic from '../../images/hotTopic.png';
import chatLogo from '../../images/chatLogo.png';
import roleModel from '../../images/roleModel.png';
import thinking from '../../images/thinking.png';
// import greenCheck from '../../images/greenCheck.png';
import scopusLogo from '../../images/scopusLogo.png';
import openAccess from '../../images/openAccess.png';
import padlock from  '../../images/padlock.png';
import scimagoLogo from '../../images/scimagoLogo.png';

export default function TinyPanel({content, type, DOI}){

  return (
    <div className="card--tiny">

      {/* Tiny Crossref */}
      {content.crossref.error ? 
      <div className="card--tiny--info">
        <div className="card--tiny--info--data">
          <a href="https://www.crossref.org/"><img className="card--tiny--image" src={crossrefLogo} alt="crossref_logo" /></a>
          <br />
          Crossref
        </div>
        <div className="card--tiny--info--data">
          <img className="card--tiny--image" src={redCross} alt="not_found" />
        </div>  
      </div> 
      : type === "DOI" ?
      <div className="card--tiny--info">
        <div className="card--tiny--info--data">
          <a href="https://www.crossref.org/"><img className="card--tiny--image" src={crossrefLogo} alt="crossref_logo" /></a>
          <br />
          Crossref
        </div>
        <div className="card--tiny--info--data">
          {content.crossref["is-referenced-by-count"]} menciones 
          <br />
          en Crossref
        </div>    
        {content.crossref.license ?
          content.crossref.license.map((license,index) =>
            license.URL === "https://creativecommons.org/licenses/by/4.0/" ?
            <div className="card--tiny--license" key={index}>
              <a href="https://creativecommons.org/licenses/by/4.0/">
                <img className="card--tiny--license--image" src={ccBy} alt="cc-by-nd" />
              </a>
            </div>
            :
            license.URL === "https://creativecommons.org/licenses/by-nd/4.0/" ?
            <div className="card--tiny--license" key={index}>
              <a href="https://creativecommons.org/licenses-nd/by/4.0/">
                <img className="card--tiny--license--image" src={ccByNd} alt="cc-by-nd" />
              </a>
            </div>
            :
            license.URL === "https://creativecommons.org/licenses/by-nc/4.0/" ?
            <div className="card--tiny--license" key={index}>
              <a href="https://creativecommons.org/licenses/by-nc/4.0/">
                <img className="card--tiny--license--image" src={ccByNc} alt="cc-by-nd" />
              </a>
            </div>
            :
            license.URL === "https://creativecommons.org/licenses/by-sa/4.0/" ?
            <div className="card--tiny--license" key={index}>
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                <img className="card--tiny--license--image" src={ccBySa} alt="cc-by-nd" />
              </a>
            </div>
            :
            license.URL === "https://creativecommons.org/licenses/by-nc-nd/4.0/" ?
            <div className="card--tiny--license" key={index}>
              <a href="https://creativecommons.org/licenses/by/4.0/">
                <img className="card--tiny--license--image" src={ccByNcNd} alt="cc-by-nd" />
              </a>
            </div>
            :
            license.URL === "https://creativecommons.org/licenses/by-nc-sa/4.0/" ?
            <div className="card--tiny--license" key={index}>
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                <img className="card--tiny--license--image" src={ccByNcSa} alt="cc-by-nd" />
              </a>
            </div>
            : null
          )
          : null 
        }
      </div>
      : type === "ISSN" ?
      <div className="card--tiny--info">
        <div className="card--tiny--info--data">
          <a href="https://www.crossref.org/"><img className="card--tiny--image" src={crossrefLogo} alt="crossref_logo" /></a>
          <br />
          Crossref
        </div>
        <div className="card--tiny--info--data">            
          {content.crossref.counts["current-dois"]} artículos se encuentran en este jornal
        </div> 
      </div>
      : null
      }

      {/* Tiny DOAJ */}
      {content.doaj === 0 ? 
      <div className="card--tiny--info">
        <div className="card--tiny--image--container">
          <a href="https://doaj.org/"><img className="card--tiny--image" src={doajLogo} alt="doaj_logo" /></a>
        </div>
        <div className="card--tiny--info--data">
          <img className="card--tiny--image" src={redCross} alt="not_found" />
        </div>  
      </div> 
      : type === "DOI" ? 
      <div className="card--tiny--info">
        <div className="card--tiny--image--container">
          <a href="https://doaj.org/"><img className="card--tiny--image" src={doajLogo} alt="doaj_logo" /></a>
        </div>
        <div className="card--tiny--info--data">
          Open Access
        </div>  
        {content.doaj.admin ? 
          content.doaj.admin.seal ?
          <div className="card--tiny--license">
            <a href='https://doaj.org/apply/seal/' key={content.id}>    
              <span className='card--tiny--seal'>☑ DOAJ Seal</span>
            </a>
          </div>
            : null 
        : null
        }
      </div> 
      : type === "ISSN" ?
      <div className="card--tiny--info">
        <div className="card--tiny--image--container">
          <a href="https://doaj.org/"><img className="card--tiny--image" src={doajLogo} alt="doaj_logo" /></a>
        </div>
        {content.doaj.bibjson.apc["has_apc"] === true ? 
        <div className="card--tiny--info--data">
          Costos adicionales por publicar
        </div> 
        :
        <div className="card--tiny--info--data">
          Publicar en este jornal es gratis
        </div> 
        }
        {content.doaj.bibjson.license.map((license,index) => 
          license.type === "CC BY" ?
            <div className="card--tiny--license" key={'doaj' + index}>
              <a href="https://creativecommons.org/licenses/by/4.0/">
                <img className="card--tiny--license--image" src={ccBy} alt="cc-by" />
              </a>
            </div> 
          : license.type === "CC BY-ND" ?
            <div className="card--tiny--license" key={'doaj' + index}>
              <a href="https://creativecommons.org/licenses/by-nd/4.0/">
                <img className="card--tiny--license--image" src={ccByNd} alt="cc-by-nd" />
              </a>
            </div>
          : license.type === "CC BY-NC" ?
            <div className="card--tiny--license" key={'doaj' + index}>
              <a href="https://creativecommons.org/licenses/by-nc/4.0/">
                <img className="card--tiny--license--image" src={ccByNc} alt="cc-by-nc" />
              </a>
            </div> 
          : license.type === "CC BY-SA" ?
            <div className="card--tiny--license" key={'doaj' + index}>
              <a href="https://creativecommons.org/licenses/by-sa/4.0/">
                <img className="card--tiny--license--image" src={ccBySa} alt="cc-by-sa" />
              </a>
            </div>
          : license.type === "CC BY-NC-ND" ?
            <div className="card--tiny--license" key={'doaj' + index}>
              <a href="https://creativecommons.org/licenses/by-nc-nd/4.0/">
                <img className="card--tiny--license--image" src={ccByNcNd} alt="cc-by-nc-nd" />
              </a>
            </div>
          : license.type === "CC BY-NC-SA" ?
            <div className="card--tiny--license" key={'doaj' + index}>
              <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">
                <img className="card--tiny--license--image" src={ccByNcSa} alt="cc-by-nc-nd" />
              </a>
            </div>
          : null
          )}
          {content.doaj.admin ? 
          content.doaj.admin.seal ?
          <div className="card--tiny--license">
            <a href='https://doaj.org/apply/seal/' key={content.id}>    
              <span className='card--tiny--seal'>☑ DOAJ Seal</span>
            </a>
          </div>
            : null 
        : null
        }
      </div> 
      : null
      }

      {/* Tiny Microsoft */}
      {content.microsoft ? 
      <div className="card--tiny--info">
        <div className="card--tiny--image--container">
          <a href="https://academic.microsoft.com/home"><img className="card--tiny--image" src={microsoftLogo} alt="microsoft_logo" /></a>
        </div>
        <div className="card--tiny--info--data">
          Predicciones de citas:
        </div>
        {content.microsoft.CC === 0 ?
        <div className="card--tiny--info--data">
          No hay información de citas
        </div>
        :
        (content.microsoft.ECC / content.microsoft.CC) > 1 ?  
        <div className="card--tiny--info--data">
          <img className="card--tiny--image" src={graphIncrease} alt="increase_image" />
        </div>
        :
        <div className="card--tiny--info--data">
          <img className="card--tiny--image" src={graphDecrease} alt="decrease_image" />
        </div>
        }
        
      </div> 
      : type === "DOI" ?
      <div className="card--tiny--info">
        <div className="card--tiny--image--container">
          <a href="https://academic.microsoft.com/home"><img className="card--tiny--image" src={microsoftLogo} alt="microsoft_logo" /></a>
        </div>
        <div className="card--tiny--info--data">
          <img className="card--tiny--image" src={redCross} alt="not_found" />
        </div>  
      </div>
      : type === "ISSN" ?
      <div className="card--tiny--info">
        <div className="card--tiny--image--container">
          <a href="https://academic.microsoft.com/home"><img className="card--tiny--image" src={microsoftLogo} alt="microsoft_logo" /></a>
        </div>
        <div className="card--tiny--info--data">
          <img className="card--tiny--image" src={redCross} alt="not_found" />
          <br />
          Busqueda por ISSN no soportada
        </div>
      </div>
      : null
      }

      {/* Tiny Dimensions */}
      {type === "DOI" ?
      <div className="card--tiny--info">
        <span className="__dimensions_badge_embed__" data-doi={DOI}></span>
        
        {content.dimensions.field_citation_ratio > 1.0 ?
          <div className="card--tiny--info--data">
            Modelo a seguir
            <br />
            <img className="card--tiny--image bigger" src={roleModel} alt="role_model" />
          </div>
          :
          <div className="card--tiny--info--data">
            No muy citado relativo a sus pares
            <br />
            <img className="card--tiny--image bigger" src={thinking} alt="thinking" />
          </div>
        }
        <div className="card--tiny--info--data">
          Sourced by
          <br />
          <a href="https://www.dimensions.ai">Dimensions</a>
        </div>
      </div>
      : null
      }

      {/* Tiny Altmetric */}
      { type === "DOI" ?
      <div className="card--tiny--info">
        <div className="card--tiny--info--data">
          Altmetric
          <br />
          <div className="altmetric-embed" data-badge-type="medium-donut" data-doi={DOI} data-badge-popover="right"></div>
        </div>
        {content.altmetric.error ?
        <div className="card--tiny--info--data">
          <img className="card--tiny--image" src={redCross} alt="not_found" />
        </div>   
        : (content.altmetric.cited_by_posts_count ?
            content.altmetric.cited_by_posts_count > 100 ?
            <div className="card--tiny--info--data">
              Hot topic en redes sociales!
              <br />
              <img className="card--tiny--image hot" src={hotTopic} alt="hot_topic" />
            </div>   
            : 
            <div className="card--tiny--info--data">
              Se habla del tema
              <br />
              <img className="card--tiny--image bigger" src={chatLogo} alt="people_chat" />
            </div>   
          : null
          )
        }
        <div className="card--tiny--info--data">
          Sourced by
          <br />
          <a href="https://www.altmetric.com">Altmetric</a>
        </div>
      </div>
      : null
      }

      {/* Tiny Scopus */}
      { type === "ISSN" ? 
        content.scopus === null ?
        <div className="card--tiny--info">
          <div className="card--tiny--info--data">
            <a href="https://www.scopus.com/home.uri"><img className="card--tiny--image" src={scopusLogo} alt="scopus_logo" /></a>
          </div>
          <div className="card--tiny--info--data">
            <img className="card--tiny--image" src={redCross} alt="not_found" />
          </div> 
        </div>
        : 
        <div className="card--tiny--info">
          <div className="card--tiny--info--data">
            <a href="https://www.scopus.com/home.uri"><img className="card--tiny--image" src={scopusLogo} alt="scopus_logo" /></a>
          </div>
          <div className="card--tiny--info--data">
            CiteScore
            <br />
            <a href={content.scopus.entry[0].link[0]["@href"]}>{content.scopus.entry[0].citeScoreYearInfoList.citeScoreCurrentMetric} - {content.scopus.entry[0].citeScoreYearInfoList.citeScoreCurrentMetricYear}</a>
          </div>
          <div className="card--tiny--info--data">
            CiteScore Tracker
            <br />
            <a href={content.scopus.entry[0].link[0]["@href"]}>{content.scopus.entry[0].citeScoreYearInfoList.citeScoreTracker} - {content.scopus.entry[0].citeScoreYearInfoList.citeScoreTrackerYear}</a>
          </div>  
          {content.scopus.entry[0].openaccessArticle ?
          <div className="card--tiny--info--data">
            <img className="card--tiny--image" src={openAccess} alt="open_access" />
          </div> 
          : 
          <div className="card--tiny--info--data">
            No es de acceso abierto
            <img className="card--tiny--image" src={padlock} alt="licensed" />
          </div>  
          }
        </div>
      : null
      }

      {/* Tiny Scimago  */}
      { type === "ISSN" ?
        content.scimago.error ?
        <div className="card--tiny--info">
          <div className="card--tiny--info--data">
            <a href="https://www.scimagojr.com/"><img className="card--tiny--image" src={scimagoLogo} alt="scimago_logo" /></a>
            <br />
            Scimago Journal Rank
          </div>
          <div className="card--tiny--info--data">
            <img className="card--tiny--image" src={redCross} alt="not_found" />
          </div> 
        </div>
        : 
        <div className="card--tiny--info">
          <div className="card--tiny--info--data">
            <a href="https://www.scimagojr.com/"><img className="card--tiny--image" src={scimagoLogo} alt="scimago_logo" /></a>
            <br />
            Scimago Journal Rank
          </div>
          <div className="card--tiny--info--data">
            <div className="card--scimago--info--embed" dangerouslySetInnerHTML={{ __html: content.scimago.embedString }}></div>
          </div> 
        </div>
      : null
      }
    </div>
  )
}