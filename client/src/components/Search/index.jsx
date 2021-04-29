import React, { useState } from 'react';
import './search.css';
import { getContentsCrossref, getContentsDoaj } from '../../api-front/search';
import AcademicCard from '../AcademicCard/index';

export default function Search(){

  //states- input query, movies
  const [query, setQuery] = useState('');
  const [contents, setContents] = useState([]);

  const searchPapers = async (e) => {
    e.preventDefault();
    
    const crossrefData = await getContentsCrossref(query); 
    var res = [{
      crossref: crossrefData[0],
      abstract: crossrefData[0].abstract
    }]

    var doajData = null;
    if (crossrefData[0].DOI){
      doajData = await getContentsDoaj(crossrefData[0].DOI);
    }
    
    res[0] = {
      ...res[0], 
      doaj: doajData[0]
    };

    console.log(res);
    // let parser = new DOMParser();
    // for (let i=0; i < res.length; i++){
    //   if (res[i].abstract){
    //     res[i] = {
    //       ...res[i],
    //       abstract: parser.parseFromString(res[i].abstract, 'text/html').body,
    //     };
    //   }  
    // }
    // console.log(res);
    setContents(res);
  }

  return (
    <>
      <form className="searchForm" onSubmit={searchPapers}>
        <label className="searchLabel" htmlFor="query">Nombre de artículo, paper, revista
        </label>
          <input className="searchInput" type="text" name="query"
            placeholder="algun nombre o DOI"
            value={query} onChange={(e) => setQuery(e.target.value)}
          />
        <button className="searchBtn" type="submit">Buscar</button>
      </form>
      {contents ? 
      <div className="card-list">
        {/* contents.filter(content => content.algunValor tipo citas o algo > 0).map a esto  */}
        {contents.map(content => ( content.error ? null :
          <AcademicCard content={content} key={content.crossref.DOI}/>
        ))}
      </div>
      : null
        }
    </>
  )
}