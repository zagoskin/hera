import React, { useState } from 'react';
import './search.css';
import { getContentsCrossref, getContentsDoaj, getContentsMicrosoft, getContentsScopus, getContentsDimensions, getContentsAltmetric, getContentsScimago } from '../../api-front/search';
import AcademicCard from '../AcademicCard/index';
import { getURLCrossref, getURLDoaj, getURLMicrosoft, getURLScopus, getURLDimensions, getURLAltmetric, setURLsByDOI, setURLsByISSN, getURLScimago } from '../../api-front/url';
import Loader from 'react-loader-spinner';

export default function Search(){
  //states- input query, movies
  const [query, setQuery] = useState('');
  const [content, setContent] = useState(undefined);
  const [criteria, setCriteria] = useState('');
  const [loading, setLoading] = useState(false);

  const searchPapers = async (e) => {
    e.preventDefault();
    setLoading(true);
    let microsoftData = [];
    let scopusData;
    let dimensionsData;
    let altmetricData;
    let scimagoData;
    if (criteria === "DOI"){
      setURLsByDOI(query);
      microsoftData = await getContentsMicrosoft(getURLMicrosoft());
      dimensionsData = await getContentsDimensions(getURLDimensions());
      altmetricData = await getContentsAltmetric(getURLAltmetric());
    }else {
      if (criteria === "ISSN"){
        setURLsByISSN(query);
        scopusData = await getContentsScopus(getURLScopus());
      }
    }
    const crossrefData = await getContentsCrossref(getURLCrossref()); 
    const doajData = await getContentsDoaj(getURLDoaj());

    let res = {
      crossref: crossrefData,
      doaj: doajData.total === 0 ? 0 : doajData.results[0],
      microsoft: microsoftData.length > 0 ? microsoftData[0] : null,
      scopus: scopusData ?? null,
      dimensions: dimensionsData,
      altmetric: altmetricData,
      abstract: 
        crossrefData.abstract ? 
          !(Array.isArray(crossrefData.abstract)) ? 
            crossrefData.abstract 
          : (doajData.total > 0) ? 
            doajData.results[0].bibjson.abstract 
          : microsoftData.length > 0 ? 
            microsoftData[0].AW 
          : '' 
        : '',
      title: crossrefData.title ? crossrefData.title : doajData.total > 0 ? doajData.results[0].bibjson.title : microsoftData.length > 0 ? microsoftData[0].DN : '',
      URL: criteria === 'DOI' ? `https://dx.doi.org/${query}` : doajData.total > 0 ? doajData.results[0].bibjson.ref.journal : `https://portal.issn.org/resource/ISSN/${query}`,
      authors: crossrefData.author ? crossrefData.author : doajData.total > 0 ? doajData.results[0].bibjson.author : microsoftData.length > 0 ? microsoftData[0].AA : undefined,
      identifier: {
        type: criteria,
        value: query
      },
    }

    if (criteria === "ISSN"){
      scimagoData = await getContentsScimago(getURLScimago(),res.title);
    }

    res = {...res, scimago: scimagoData}
    
    console.log('Todos los resultados:');
    console.log(res);
    // res[0] = {
    //   ...res[0], 
    //   doaj: doajData[0]
    // };

    setLoading(false);
    setContent(res);
  }

  return (
    <>
      <form className="searchForm" onSubmit={searchPapers}>
        {criteria? 
        <label className="searchLabel" htmlFor="query">Ingrese {criteria} del contenido a analizar
        </label>
        :
        <label className="searchLabel" htmlFor="query">Seleccione DOI o ISSN
        </label>
        }
          <input className="searchInput" type="text" name="query"
            placeholder={criteria === "DOI" ? 'e.g.: 10.1000/xyz123' : criteria === "ISSN" ? 'e.g.: 2049-3630' : 'Seleccione criteria primero'}
            value={query} onChange={(e) => setQuery(e.target.value)}
            disabled={((criteria !== "DOI") && (criteria !== "ISSN"))? true : false}/>
        <button className="searchBtn" type="submit" disabled={((criteria !== "DOI") && (criteria !== "ISSN"))? true : false}>Buscar</button>
        <div className="searchCriteria">
          <label className="searchRadioLabel">DOI
          <input  className="searchRadioBtn" type="radio" value="DOI" checked={criteria === "DOI"} onChange={(e) => setCriteria(e.target.value)}/>
          </label>
          <label className="searchRadioLabel">ISSN
          <input className="searchRadioBtn" type="radio" value="ISSN" checked={criteria === "ISSN"} onChange={(e) => setCriteria(e.target.value)}/>
          </label>
        </div>
      </form>
      {loading  ?
      <div
        style={{
          width: "100%",
          height: "100",
          display: "flex",
          justifyContent: "center",
          alignItems: "center"
        }}
      >
        <Loader type="BallTriangle" color="#ba2c25" height="100" width="100"/>
      </div>
      : null
      }
      {content ? 
      <div className="card-list">
        {/* contents.filter(content => content.algunValor tipo citas o algo > 0).map a esto  */}
          <AcademicCard content={content} key={content.identifier.value}/>
      </div>
      : null
      }
    </>
  )
}