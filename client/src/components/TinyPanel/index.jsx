import React, { useEffect } from 'react';
import './tinycard.css';
import { renderLicense } from '../DOAJCard';
import { renderLicenseByURL } from '../CrossrefCard';
import crossrefLogo from '../../images/crossrefLogo.png';
import doajLogo from '../../images/doajLogo.png';
import redCross from '../../images/redCross.png';
import microsoftLogo from '../../images/microsoftLogo.png';
import graphIncrease from '../../images/graphIncrease.png';
import graphDecrease from '../../images/graphDecrease.png';
import hotTopic from '../../images/hotTopic.png';
import chatLogo from '../../images/chatLogo.png';
import roleModel from '../../images/roleModel.png';
import thinking from '../../images/thinking.png';
import scopusLogo from '../../images/scopusLogo.png';
import scimagoLogo from '../../images/scimagoLogo.png';
import semanticLogo from '../../images/semanticLogo.png';
import redibLogo from '../../images/redibLogo.png';
import wosLogo from '../../images/wosLogo.png';
import 'typeface-roboto';

export default function TinyPanel({content, type, identifier}){

  useEffect(() => {
    const scimagoWidget = document.getElementById("scimagoWidget");
    if (scimagoWidget){
      const widgetImg = scimagoWidget.querySelector("img");
      widgetImg.setAttribute("width", "125px");
      //console.log(joinedAuthors);
    }
  }, [content.scimago])

  return (
    <div className="card--tiny">

      {/* Tiny Crossref */}
      {content.crossref.error ? 
      <div className="card--tiny--info">
        <div className="card--tiny--info--data logoArea">
          <a href="https://www.crossref.org/">
            <img className="card--tiny--image transparent" src={crossrefLogo} alt="crossref_crossed" /></a>        
        </div>
        <div className="card--tiny--info--data">
          Recurso no encontrado
        </div> 
      </div> 
      : type === "DOI" ?
      <div className="card--tiny--info">
        <div className="card--tiny--info--data logoArea">
          <a href={`https://search.crossref.org/?from_ui=yes&q=${identifier}`}>
            <img className="card--tiny--image " src={crossrefLogo} alt="crossref_logo" /></a>
        </div>
        <div className="card--tiny--info--data">
          {content.crossref["is-referenced-by-count"]} citas 
        </div>    
        {content.crossref.license ?
          content.crossref.license.map((license,index) =>
            renderLicenseByURL(index,license.URL,"card--tiny--license","card--tiny--license--image")
          )
          : null 
        }
      </div>
      : type === "ISSN" ?
      <div className="card--tiny--info">
        <div className="card--tiny--info--data logoArea">
          <a href={`https://search.crossref.org/?q=${identifier}&from_ui=yes&type-name=Journal+Issue`}>
            <img className="card--tiny--image " src={crossrefLogo} alt="crossref_logo" /></a>
        </div>
        <div className="card--tiny--info--data">            
          {content.crossref.counts["current-dois"]} artículos publicados
        </div> 
      </div>
      : null
      }

      {/* Tiny DOAJ */}
      {content.doaj === null ? 
      <div className="card--tiny--info">
        <div className="card--tiny--image--container logoArea">
          <a href="https://doaj.org/">
            <img className="card--tiny--image transparent" src={doajLogo} alt="doaj_logo" /></a>
        </div>
        <div className="card--tiny--info--data">
          Recurso no encontrado
        </div>  
      </div> 
      : type === "DOI" ? 
      <div className="card--tiny--info">
        <div className="card--tiny--image--container logoArea">
          <a href={`https://doaj.org/article/${content.doaj.id}`}>
            <img className="card--tiny--image " src={doajLogo} alt="doaj_logo" /></a>
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
        <div className="card--tiny--image--container logoArea">
          <a href={`https://doaj.org/toc/${identifier}`}>
            <img className="card--tiny--image " src={doajLogo} alt="doaj_logo" /></a>
        </div>
        {content.doaj.bibjson.license.map((license,index) => 
          renderLicense(index,license.type,"card--tiny--license doaj","card--tiny--license--image")
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

      {/* Tiny Redib  */}
      { type === "ISSN" ?
        content.redib.error ?
        <div className="card--tiny--info">
          <div className="card--tiny--info--data padded logoArea">
            <a href={`https://redib.org/Search/Results?type=ISN&lookfor=${identifier}`}>
              <img className="card--tiny--image transparent" src={redibLogo} alt="redib_crossed" /></a>
          </div> 
          <div className="card--tiny--info--data">
            Recurso no encontrado
          </div> 
        </div>
        : 
        content.redib.widget ? 
        <div className="card--tiny--info">
          <div className="card--tiny--info--data logoArea">
            <a href={content.redib.widget.anchorHref}>
              <img border="0" width="125px" height="125px" src={content.redib.widget.imgSrc} alt="redib_rank_widget"  />
            </a>
          </div>
        </div>
        :
        <div  className="card--tiny--info">
          <div className="card--tiny--info--data logoArea">
            <a href={content.redib.redibURL}><img className="card--tiny--image big" src={redibLogo} alt="redib_logo" /></a>
            
          </div>
          
          <div style={{fontFamily: 'Roboto', padding: "1.5rem"}} className="card--tiny--info--data">Indicadores de calidad editorial</div>
          {content.redib.indicadores.map(indicador => 
          <div key={indicador} style={{fontFamily: 'Roboto'}} className="card--tiny--info--indicator">
            {indicador}
          </div>
          )}
        </div>
      : null
      }

      {/* Tiny Microsoft */}
      {content.microsoft ? 
      <div className="card--tiny--info">
        <div className="card--tiny--image--container logoArea">
          <a href={`https://academic.microsoft.com/paper/${content.microsoft.Id}`}><img className="card--tiny--image" src={microsoftLogo} alt="microsoft_logo" /></a>
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
        <div className="card--tiny--image--container logoArea">
          <a href="https://academic.microsoft.com/home"><img className="card--tiny--image transparent" src={microsoftLogo} alt="microsoft_logo" /></a>
        </div> 
        <div className="card--tiny--info--data">
          Recurso no encontrado
        </div> 
      </div>
      : null
      }

      {/* Tiny Semantic */}
      {type === "DOI" ? 
        content.semantic.error ? 
        <div className="card--tiny--info">
          <div className="card--tiny--image--container logoArea">
            <a href="https://www.semanticscholar.org/?utm_source=api"><img className="card--tiny--image transparent" src={semanticLogo} alt="semantic_crossed" /></a>        
          </div>
          <div className="card--tiny--info--data">
            Recurso no encontrado
          </div> 
        </div>   
        :   
        <div className="card--tiny--info">
          <div className="card--tiny--image--container logoArea">
            <a href={`https://www.semanticscholar.org/paper/${content.semantic.paperId}?utm_source=api`}>
              <img className="card--tiny--image" src={semanticLogo} alt="semantic_logo" /></a>        
          </div>
          {content.semantic.influentialCitationCount ?
            content.semantic.influentialCitationCount > 0 ?
            <div style={{marginBottom: "5.5rem"}} className="card--tiny--info--data">
              {content.semantic.numCitedBy} citas
              <br />
              <a href={content.semantic.url}>{content.semantic.influentialCitationCount} citas influyentes</a>
            </div>
            : <div style={{marginBottom: "5.5rem"}} className="card--tiny--info--data">
                {content.semantic.numCitedBy} citas
              </div>
          : <div style={{marginBottom: "5.5rem"}} className="card--tiny--info--data">
              {content.semantic.numCitedBy} citas
            </div>
          }
        </div>  
        
      : null
      }

      {/* Tiny Dimensions */}
      {type === "DOI" ?
      <div className="card--tiny--info">
        <div><span className="__dimensions_badge_embed__" data-doi={identifier}></span></div>
        
        {content.dimensions ?
        <>
          {content.dimensions.field_citation_ratio ?
            content.dimensions.field_citation_ratio > 1.0 ?
            <div className="card--tiny--info--data">
              Modelo a seguir
              <br />
              <a href="https://www.dimensions.ai"><img className="card--tiny--image " src={roleModel} alt="role_model" /></a>
            </div>
            :
            <div className="card--tiny--info--data">
              No muy citado relativo a sus pares
              <br />
              <a href="https://www.dimensions.ai"><img className="card--tiny--image " src={thinking} alt="thinking" /></a>
            </div>
            :
            <div className="card--tiny--info--data">
              Sin información de tendencias
              <br />
              <a href="https://www.dimensions.ai"><img className="card--tiny--image " src={thinking} alt="thinking" /></a>
            </div>
          }
        </>
        :
        <div className="card--tiny--info--data">
          Recurso no encontrado
          <br />
          <a href="https://www.dimensions.ai"><img className="card--tiny--image " src={thinking} alt="thinking" /></a>
        </div>
        }
      </div>
      : null
      }

      {/* Tiny Altmetric */}
      { type === "DOI" ?
      <div className="card--tiny--info">
        <div className="card--tiny--info--data" style={{padding: "0.5rem"}}>
          <div className="altmetric-embed" data-badge-type="medium-donut" data-doi={identifier} data-badge-popover="right"></div>
        </div>
        {content.altmetric.error ?
        <div className="card--tiny--info--data">
          Recurso no encontrado
          <br />
          <img className="card--tiny--image small" src={redCross} alt="not_found" />
        </div>   
        : (content.altmetric.cited_by_posts_count ?
            content.altmetric.cited_by_posts_count > 100 ?
            <div className="card--tiny--info--data">
              Hot topic en redes sociales!
              <br />
              <a href="https://www.altmetric.com"><img className="card--tiny--image small" src={hotTopic} alt="hot_topic" /></a>
            </div>   
            : 
            <div className="card--tiny--info--data">
              Se habla del tema
              <br /> 
              <a href="https://www.altmetric.com"><img className="card--tiny--image" src={chatLogo} alt="people_chat" /></a>      
            </div>
          : null
          )
        }
      </div>
      : null
      }

      {/* Tiny Wos  */}
      { type === "ISSN" ?
        content.wos.error ?
        <div className="card--tiny--info">
          <div className="card--tiny--info--data logoArea">
            <a href={`https://mjl.clarivate.com/search-results?issn=${identifier}&hide_exact_match_fl=true`}>
              <img className="card--tiny--image big transparent" src={wosLogo} alt="wos_logo" /></a>
          </div> 
          <div className="card--tiny--info--data">
            Recurso no encontrado
          </div> 
        </div>
        : 
        content.wos.totalRecords === 0 ?
        <div className="card--tiny--info">
          <div className="card--tiny--info--data logoArea">
            <a href={`https://mjl.clarivate.com/search-results?issn=${identifier}&hide_exact_match_fl=true`}><img className="card--tiny--image big transparent" src={wosLogo} alt="wos_logo" /></a>
          </div> 
          <div className="card--tiny--info--data">
            Recurso no encontrado
          </div> 
        </div>
        :
        <div className="card--tiny--info">
          <div className="card--tiny--info--data logoArea">
            <a href={`https://mjl.clarivate.com/search-results?issn=${identifier}&hide_exact_match_fl=true`}><img className="card--tiny--image big" src={wosLogo} alt="wos_logo" /></a>
          </div> 
          <div className="card--tiny--info--data">
            Indexado por Web of Science
          </div> 
        </div>
      : null
      }

      {/* Tiny Scopus */}
      { type === "ISSN" ? 
        content.scopus === null ?
        <div className="card--tiny--info">
          <div className="card--tiny--info--data logoArea">
            <a href="https://www.scopus.com/home.uri"><img className="card--tiny--image transparent" src={scopusLogo} alt="view on Scopus" /></a>
          </div>
          <div className="card--tiny--info--data">
            Recurso no encontrado
          </div> 
        </div>
        : 
        <div className="card--tiny--info">
          <div className="card--tiny--info--data logoArea">
            <a href={content.scopus.entry[0].link[0]['@href']}><img className="card--tiny--image" src={scopusLogo} alt="view on Scopus" /></a>
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
        </div>
      : null
      }

      {/* Tiny Scimago  */}
      { type === "ISSN" ?
        content.scimago.error ?
        <div className="card--tiny--info">
          <div className="card--tiny--info--data padded logoArea">
            <a href="https://www.scimagojr.com/"><img className="card--tiny--image transparent" src={scimagoLogo} alt="scimago_logo" /></a>
          </div> 
          <div className="card--tiny--info--data">
            Recurso no encontrado
          </div> 
        </div>
        : 
        <div className="card--tiny--info">
          <div className="card--tiny--info--data logoArea">
            <a href={content.scimago.journalURL}><img className="card--scimago--image" src={scimagoLogo} alt='scimago_logo'/></a>
          </div>
          <div className="card--tiny--info--data">
            <div className="card--scimago--info--embed" id="scimagoWidget" dangerouslySetInnerHTML={{ __html: content.scimago.embedString }}></div>
          </div> 
        </div>
      : null
      }
    </div>
  )
}