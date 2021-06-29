import React, { useState, useEffect } from 'react';
import './search.css';
import history from '../../history';

import AcademicCard from '../AcademicCard/index';

import Loader from 'react-loader-spinner';
import { validDOI, validISSN } from '../../helpers/regex';
import { getDataByQuery } from '../../api-front/dataBuilder';

export default function Search(){
  //states- input query, movies
  const [query, setQuery] = useState('');
  const [content, setContent] = useState(undefined);
  const [criteria, setCriteria] = useState('');
  const [loading, setLoading] = useState(false);
  const [formatError, setFormatError] = useState(false);

  useEffect(() => {
    history.push('/');
  }, [])

  const searchPapers = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await getDataByQuery(query,criteria);
    
    console.log('Todos los resultados:');
    console.log(res);
    
    setFormatError(false);
    setLoading(false);
    setContent(res);
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
      { formatError? 
        <div className="formatError">
          <div className="formatErrorText">Se ingresaron datos de forma incorrecta (e.g.: {criteria === "DOI" ? '10.1234/texto542' : '1234-4321'})</div> 
          <div className="formatErrorCross" onClick={() => setFormatError(false)}>X</div>
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
          <AcademicCard content={content} key={content.identifier.value}/>
      </div>
      : null
      }
    </>
  )
}