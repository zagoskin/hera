import { getContentsCrossref, getContentsDoaj, getContentsMicrosoft, getContentsScopus, getContentsDimensions, getContentsAltmetric, getContentsScimago, getContentsSemantic, getContentsRedib, getContentsWos } from './searcher'
import { getURLCrossref, getURLDoaj, getURLMicrosoft, getURLScopus, getURLDimensions, getURLAltmetric, setURLsByDOI, setURLsByISSN, getURLScimago, getURLSemantic, getURLRedib, getURLWos } from './urlBuilder';

export const getDataByQuery = async (query, criteria) => {

  let microsoftData;
  let scopusData;
  let dimensionsData;
  let altmetricData;
  let scimagoData;
  let semanticData;
  let redibData;
  let wosData;
  
  if (criteria === "DOI") {
    setURLsByDOI(query);
    microsoftData = await getContentsMicrosoft(getURLMicrosoft());
    dimensionsData = await getContentsDimensions(getURLDimensions());
    altmetricData = await getContentsAltmetric(getURLAltmetric());
    semanticData = await getContentsSemantic(getURLSemantic());
  } else {
    if (criteria === "ISSN") {
      setURLsByISSN(query);
      scopusData = await getContentsScopus(getURLScopus());
      redibData = await getContentsRedib(getURLRedib());
      wosData = await getContentsWos(getURLWos(),query);
    }
  }
  const crossrefData = await getContentsCrossref(getURLCrossref());
  const doajData = await getContentsDoaj(getURLDoaj());

  let res = {
    crossref: crossrefData,
    doaj: doajData.total === 0 ? null : doajData.results[0],
    microsoft: microsoftData ? microsoftData.error ? new Array(0) : microsoftData.entities.length > 0 ? microsoftData.entities[0] : null : null,
    scopus: scopusData ?? null,
    dimensions: dimensionsData ? dimensionsData.error ? null : dimensionsData : null,
    altmetric: altmetricData,
    semantic: semanticData,
    redib: redibData,
    wos: wosData,
    abstract:
      crossrefData.abstract ?
        !(Array.isArray(crossrefData.abstract)) ?
          crossrefData.abstract
          : semanticData ? semanticData.abstract
          : (doajData.total > 0) ?
            doajData.results[0].bibjson.abstract
            : semanticData ? semanticData.abstract            
              : ''
        : semanticData ? semanticData.abstract
        : (doajData.total > 0) ?
          doajData.results[0].bibjson.abstract
          : semanticData ? semanticData.abstract            
            : '',
    title: crossrefData.title ? crossrefData.subtitle && crossrefData.subtitle.length > 0 ? `${crossrefData.title}: ${crossrefData.subtitle}`: crossrefData.title 
          : doajData.total > 0 ? doajData.results[0].bibjson.title 
          : microsoftData && microsoftData.entities.length > 0 ? microsoftData.entities[0].DN 
          : redibData && redibData.journalTitle ? redibData.journalTitle : "",
    URL: criteria === 'DOI' ? `https://dx.doi.org/${query}` : doajData.total > 0 ? doajData.results[0].bibjson.ref.journal : `https://portal.issn.org/resource/ISSN/${query}`,
    authors: crossrefData.author ? crossrefData.author : doajData.total > 0 ? doajData.results[0].bibjson.author : microsoftData ? microsoftData.entities.length > 0 ? microsoftData.entities[0].AA : undefined : undefined,
    issn: crossrefData.ISSN ? crossrefData.ISSN[0] : doajData.total > 0 ? doajData.results[0].bibjson.journal ? doajData.results[0].bibjson.journal.issns[0] : null : null,
    identifier: {
      type: criteria,
      value: query
    },
    type: criteria === "ISSN" ? "journal" :
          crossrefData.type ? crossrefData.type.split('-').join(' ') 
          :  microsoftData.entities.length > 0 ? 
              microsoftData.entities[0].BT === 'a' ? `journal article`
            : microsoftData.entities[0].BT === 'b' ? `book`
            : microsoftData.entities[0].BT === 'c' ? `book chapter`
            : microsoftData.entities[0].BT === 'p' ? `bonference paper`
            : '' : '',
    publisher: criteria === "DOI" ? undefined      
          : doajData.total > 0 ? doajData.results[0].bibjson.publisher.name
          : scopusData ? scopusData["dc:publisher"]
          : crossrefData.publisher ? crossrefData.publisher
          : undefined,
    yearPublished: crossrefData.issued ? crossrefData.issued["date-parts"][0][0] : null
  }
 
  if (criteria === "ISSN") {
    scimagoData = await getContentsScimago(getURLScimago(), res.title);
    if (res.publisher === undefined){
      res = { ...res, publisher: scimagoData.publisher}
    }
  }
  
  res = { ...res, scimago: scimagoData }
  

  return res;
}