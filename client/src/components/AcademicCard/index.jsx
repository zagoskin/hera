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

export default function AcademicCard({content}){

  const [showMore, setShowMore] = useState(false);

  const handleShowMore = () => {
    setShowMore(!showMore);
  }
  
  useEffect(() => {
    setShowMore(false);
  }, [])

  return (
    <div className="card">

      {/* Info general de un contenido */}
      {content.title ?
        <div className="card--content">
          <h1 className="card--title">{content.title}</h1>
          <p><a href={content.URL}>Click aquí para ir al recurso</a></p>
          {content.authors ? <p>
            <em>Authors: {content.authors.map((author,index) => 
            (author.name ? 
              <span key={index}> {author.name}. </span> :
            author.family ?
              <span key={index}> {author.family} {author.given}. </span> :
            author.AuN ?
              <span key={index}> {author.AuN} . </span> : null
            ))}</em> 
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

      <Collapse isOpened={!showMore} theme={{collapse: 'ReactCollapse--collapse'}}>
        <TinyPanel content={content} type={content.identifier.type} DOI={content.identifier.value} key={'tinypanel' + content.identifier.value}></TinyPanel>
      </Collapse>

      {showMore === false ?
        <button className="card--collapse--btn" onClick={handleShowMore}>Ver más</button>
        :
        <button className="card--collapse--btn" onClick={handleShowMore}>Ver menos</button>
      }
      <Collapse isOpened={showMore} theme={{collapse: 'ReactCollapse--collapse'}}>
        <CrossrefCard identifier={content.identifier} content={content.crossref} key={'crossref' + content.identifier.value}></CrossrefCard>
        <DOAJCard identifier={content.identifier} content={content.doaj} key={'doaj' + content.identifier.value}></DOAJCard>
        <MicrosoftCard identifier={content.identifier} content={content.microsoft} key={'microsoft' + content.identifier.value}></MicrosoftCard>
        { content.identifier.type === "DOI" ?
        <DimensionsBadge DOI={content.identifier.value} content={content.dimensions} key={'dimensions' + content.identifier.value} />
        : null      
        }

        { content.identifier.type === "DOI" ?
        <AltmetricBadge DOI={content.identifier.value} content={content.altmetric} key={'altmetric' + content.identifier.value}/>
        : null      
        }

        { content.identifier.type === "ISSN" ?
        <ScopusGraph data={content.scopus} key={'scopus' + content.identifier.value} />
        : null      
        }

        { content.identifier.type === "ISSN" ?
        <ScimagoCard content={content.scimago} key={'scimago' + content.identifier.value} />
        : null  
        }
      </Collapse>
    </div>
  )
}