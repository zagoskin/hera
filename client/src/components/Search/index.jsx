import React, { useState, useEffect } from 'react';
import './search.css';
import history from '../../history';

import AcademicCard from '../AcademicCard/index';

import Loader from 'react-loader-spinner';
import { validDOI, validISSN } from '../../helpers/regex';
import { getDataByQuery } from '../../api-front/dataBuilder';
import heraLogo from '../../images/heraLogo.png';
// import instagramLogo from '../../images/insta.png';

export default function Search(){
  //states- input query, movies
  const [query, setQuery] = useState('');
  const [content, setContent] = useState(undefined);
  const [additionalContent, setAdditionalContent] = useState(undefined);
  const [criteria, setCriteria] = useState('');
  const [loading, setLoading] = useState(false);
  const [loadStage, setLoadStage] = useState(0);
  const [formatError, setFormatError] = useState(false);

  useEffect(() => {
    history.push('/');
  }, [])

  const searchPapers = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (criteria === "DOI"){
      setLoadStage(1);
    } else {
      setLoadStage(2);
    }
    setAdditionalContent(undefined);
    const res = await getDataByQuery(query,criteria);
    
    // console.log('Todos los resultados:');
    // console.log(res);
    
    setFormatError(false);
    
    setContent(res);

    if ((res.issn !== null) && (criteria === "DOI")){
      setLoadStage(2);
      const journalContent = await getDataByQuery(res.issn,"ISSN");
      setAdditionalContent(journalContent);
      setContent({ ...res, journalTitle: journalContent.title, publisher: journalContent.publisher });
    }
    setLoading(false);
    setLoadStage(0);
    history.push({
      pathname: '/search',
      search: `?type=${criteria}&value=${query}`
    })
  }

  const validateQuery = async (e) => {
    e.preventDefault();
    if (criteria === "DOI"){
      if (validDOI.test(query)){
        searchPapers(e);
      } else {
        setFormatError(true);
      }
    } else {
      if (criteria === "ISSN"){
        if (validISSN.test(query)){
          searchPapers(e);
        } else {
          setFormatError(true);
        }
      }
    }
  }

  return (
    <>
      <form className="searchForm" onSubmit={validateQuery}>   
        <div> 
          <div className="formImage">
            <img className="titleImg" src={heraLogo} alt="hera logo" />
          </div>  
          <div className="formContent">
            {criteria? 
            <label className="searchLabel" htmlFor="query">Ingrese {criteria} del contenido a analizar
            </label>
            :
            <label className="searchLabel" htmlFor="query">Seleccione DOI o ISSN
            </label>
            }
              <input id="query" className="searchInput" type="text" name="search-query"
                placeholder={criteria === "DOI" ? 'Ejemplo: 10.1000/xyz123' : criteria === "ISSN" ? 'Ejemplo: 2049-3630' : 'Seleccione DOI o ISSN'}
                value={query} onChange={(e) => setQuery(e.target.value)}
                disabled={((criteria !== "DOI") && (criteria !== "ISSN"))? true : false}/>
            <button className="searchBtn" type="submit" disabled={((criteria !== "DOI") && (criteria !== "ISSN"))? true : false}>Buscar</button>
            
            <div className="searchCriteria">
              <label htmlFor="doi-radio" className="searchRadioLabel">DOI
              <input  id="doi-radio" className="searchRadioBtn" type="radio" value="DOI" name="search-criteria-radio"  onChange={(e) => {setCriteria(e.target.value); setFormatError(false)}}/>
              </label>
              <label htmlFor="issn-radio" className="searchRadioLabel">ISSN
              <input id="issn-radio" className="searchRadioBtn" type="radio" value="ISSN" name="search-criteria-radio"  onChange={(e) => {setCriteria(e.target.value); setFormatError(false)}}/>
              </label>
            </div>
            </div>
          </div>
      </form>
      { formatError? 
        <div className="formatError">
          <div className="formatErrorText">Se ingresaron datos de forma incorrecta (e.g.: {criteria === "DOI" ? '10.1234/texto542' : '1234-4321'})</div> 
          <div className="formatErrorCross" onClick={() => setFormatError(false)}>X</div>
        </div>
        : null
      }
      {loadStage === 1 ?
      <div style={{width: "100%", textAlign: "center"}}>
        <h1>Buscando métricas del artículo</h1>
      </div>
      : loadStage === 2 ?
      <div style={{width: "100%", textAlign: "center"}}>
        <h1>Buscando métricas de la revista</h1>
      </div>
      : null
      }
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
          <AcademicCard content={content} additionalContent={additionalContent} key={content.identifier.value}/>
      </div>
      : null
      }

    </>
  )
}