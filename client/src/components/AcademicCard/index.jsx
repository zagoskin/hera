import React, { useState, useEffect } from 'react';
import './card.css';
import DimensionsBadge from '../DimensionsBadge';
import ScopusGraph from '../ScopusGraph'
import AltmetricBadge from '../AltmetricBadge';
import CrossrefCard from '../CrossrefCard';
import DOAJCard from '../DOAJCard';
import MicrosoftCard from '../MicrosoftCard';
import { Collapse } from 'react-collapse';
import ScimagoCard from '../ScimagoCard';
import TinyPanel from '../TinyPanel';
import SemanticCard from '../SemanticCard';
import RedibCard from '../RedibCard';
import WosCard from '../WosCard';

export default function AcademicCard({content,additionalContent}){

  const [showMore, setShowMore] = useState(false);
  const [authors, setAuthors] = useState('');
  const handleShowMore = () => {
    setShowMore(!showMore);
  }
  
  useEffect(() => {
    setShowMore(false);
    if (content.authors){
      const normalizedAuthorsArr = content.authors.map(author => 
        author.name ? `${author.name}`
        : author.family ? `${author.family} ${author.given}`
        : author.AuN ? `${author.AuN}` 
        : null
        )
      const joinedAuthors = Array.from(normalizedAuthorsArr).join(", ");
      setAuthors(joinedAuthors);
      //console.log(joinedAuthors);
    }
  }, [content.authors])

  return (
    <div className="card">

      {/* Info general de un contenido */}
      {content.title ?
        <div className="card--content">
          <h1 className="card--title">{content.title}</h1>
          <h1><u>Tipo de recurso</u>: {content.type.charAt(0).toUpperCase()+content.type.slice(1)}</h1>
          <p><a href={content.URL}>Click aquí para ir al recurso</a></p>
          {content.authors ? <p>
            <em>Autores: {authors}.</em> 
          </p> : null 
          }
          
          {content.journalTitle ? <p>
            <b>Título de la revista:</b><em> {content.journalTitle}</em>
          </p> : null          
          }
          {content.publisher ? <p>
            <b>Editorial:</b><em> {content.publisher}</em>
          </p> : null
          }
          {content.abstract ? <div className='card--abstract'><h1>ABSTRACT</h1> 
          <em><p className="card--abstract--text">
              {content.abstract.replace(/(<([^>]+)>)/ig, '')}
            </p></em>
          </div> : null
          } 
        </div>
        : 
        <div className="card--content">
          <h1 className="card--title">Resultados no encontrados para su búsqueda</h1>
        </div>
      }

      <Collapse isOpened={!showMore} theme={{collapse: 'ReactCollapse--collapse'}} key={'collapse1'}>
        <TinyPanel content={content} type={content.identifier.type} identifier={content.identifier.value} key={'tinypanel' + content.identifier.value}></TinyPanel>
        {additionalContent ?
        <>
        <br />
        <h1 className="card--title">Datos de la revista: {additionalContent.title}</h1>
        <br />
        <br />
        <TinyPanel content={additionalContent} type={additionalContent.identifier.type} identifier={additionalContent.identifier.value} key={'tinypanel' + additionalContent.identifier.value}></TinyPanel>
        </>
        : null
        }
      </Collapse>

      {showMore === false ?
        <button className="card--collapse--btn" onClick={handleShowMore}>Ver más</button>
        :
        <button className="card--collapse--btn" onClick={handleShowMore}>Ver menos</button>
      }
      <Collapse isOpened={showMore} theme={{collapse: 'ReactCollapse--collapse'}} key={'collapse2'}>
      <div className="card--panel">
        <CrossrefCard identifier={content.identifier} content={content.crossref} key={'crossref' + content.identifier.value}/>
        <DOAJCard identifier={content.identifier} content={content.doaj} key={'doaj' + content.identifier.value}/>
        { content.identifier.type === "DOI" ?
        <SemanticCard DOI={content.identifier.value} identifier={content.identifier} content={content.semantic} key={'semantic' + content.identifier.value} />
        : null
        }
        { content.identifier.type === "DOI" ?
        <>
        <MicrosoftCard identifier={content.identifier} content={content.microsoft} key={'microsoft' + content.identifier.value}/>
        <DimensionsBadge DOI={content.identifier.value} content={content.dimensions} key={'dimensions' + content.identifier.value} />
        <AltmetricBadge DOI={content.identifier.value} content={content.altmetric} key={'altmetric' + content.identifier.value}/>
        </>
        : null 
        }
        { content.identifier.type === "ISSN" ?
        <>
        <RedibCard ISSN={content.identifier.value} content={content.redib} key={'redib' + content.identifier.value} />
        <WosCard ISSN={content.identifier.value} content={content.wos} key={'wos' + content.identifier.value}/>
        <ScopusGraph data={content.scopus} key={'scopus' + content.identifier.value} />
        <ScimagoCard content={content.scimago} key={'scimago' + content.identifier.value} />
        </>
        : null
        }

        {additionalContent ?
        <>
        <br />
        <br />
        <h1 className="card--title">Datos de la revista: {additionalContent.title}</h1>
        <br />
        <br />
        <CrossrefCard identifier={additionalContent.identifier} content={additionalContent.crossref} key={'crossref' + additionalContent.identifier.value}/>
        <DOAJCard identifier={additionalContent.identifier} content={additionalContent.doaj} key={'doaj' + additionalContent.identifier.value}/>
        <RedibCard ISSN={additionalContent.identifier.value} content={additionalContent.redib} key={'redib' + additionalContent.identifier.value} />
        <WosCard ISSN={additionalContent.identifier.value} content={additionalContent.wos} key={'wos' + additionalContent.identifier.value}/>
        <ScopusGraph data={additionalContent.scopus} key={'scopus' + additionalContent.identifier.value} />
        <ScimagoCard content={additionalContent.scimago} key={'scimago' + additionalContent.identifier.value} />
        
        </>
        : null
        } 
      </div>
      </Collapse>
    </div>
  )
}