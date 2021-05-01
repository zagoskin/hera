import React, { useState } from 'react';
import './search.css';
import { getContentsCrossref, getContentsDoaj, getContentsMicrosoft } from '../../api-front/search';
import AcademicCard from '../AcademicCard/index';

export default function Search(){

  //states- input query, movies
  const [query, setQuery] = useState('');
  const [contents, setContents] = useState([]);

  const searchPapers = async (e) => {
    e.preventDefault();

    const crossrefData = await getContentsCrossref(query); 
    var doajData = null;
    var microsoftData = null;

    //cuando haya busqueda por DOI esto siempre lo hago independientemente si crossref lo tiene o no
    if (crossrefData.DOI){
      doajData = await getContentsDoaj(crossrefData.DOI);
      microsoftData = await getContentsMicrosoft(crossrefData.DOI);
    }

    var res = [{
      crossref: crossrefData,
      doaj: doajData,
      microsoft: microsoftData,
      abstract: crossrefData.abstract,
      DOI: crossrefData.DOI
    }]
    
    console.log('Todos los resultados:');
    console.log(res);
    // res[0] = {
    //   ...res[0], 
    //   doaj: doajData[0]
    // };

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
          <AcademicCard content={content} key={content.DOI}/>
        ))}
      </div>
      : null
        }
    </>
  )
}